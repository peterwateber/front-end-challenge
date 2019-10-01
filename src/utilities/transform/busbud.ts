import { Operator, BusbudResponse } from "utilities/types"

import * as _ from "lodash"
import moment from "moment"

export interface Trips {
	[key: string]: any
	// Custom types
	originCity: string
	destinationCity: string
	origin: string
	destination: string
	departureTime: string
	arrivalTime: string
	currency: string
	tripDuration: string
	formattedPrice: string
	operatorInfo: object
}

export interface CompressedTrips {
	departures: Trips[]
	operatorInfo: Operator
	totalTripsAvailable: number
}

const getOperator = (operatorId: string, operators: Operator[]): Operator => {
	return _.find(operators, o => {
		return operatorId === o.id
	})
}

const getCity = (cityId, cities) => {
	return _.find(cities, c => {
		return cityId === c.id
	})
}

const getLocation = (locationId, locations) => {
	return _.find(locations, l => {
		return locationId === l.id
	})
}

export const transformBusbudResponseToTrips = ({
	operators,
	departures
}: BusbudResponse): Trips[] => {
	if (typeof departures === "undefined" || departures.length === 0) return []
	return _.map(departures, d => {
		const operatorInfo = getOperator(d.operator_id, operators)
		const cachedResponse = JSON.parse(
			window.localStorage.cachedResponse || "{}"
		)
		const origin_city_id = cachedResponse.origin_city_id
		const destination_city_id = cachedResponse.destination_city_id
		// Origin - Destination
		const origin =
			getLocation(d.origin_location_id, cachedResponse.locations) || {}
		const originCity = getCity(origin_city_id, cachedResponse.cities).name
		const destination =
			getLocation(d.destination_location_id, cachedResponse.locations) ||
			{}
		const destinationCity = getCity(
			destination_city_id,
			cachedResponse.cities
		).name
		// Time
		const arrivalTime = d.arrival_time
		const departureTime = d.departure_time
		// Duration
		const duration = moment.duration(
			Math.abs(moment(departureTime).diff(moment(arrivalTime))),
			"milliseconds"
		)
		const hours = Math.floor(duration.asHours())
		const mins = Math.floor(duration.asMinutes()) - hours * 60
		// Price
		const price = (d.prices.total / 100).toFixed()
		return {
			...d,
			originCity,
			destinationCity,
			origin: origin["name"],
			destination: destination["name"],
			departureTime,
			arrivalTime,
			currency: d.prices.currency,
			tripDuration: `${hours}h ${mins}m`,
			formattedPrice: price,
			operatorInfo
		}
	})
}

export const transformToCompressedResponse = ({
	operators,
	departures
}: BusbudResponse): CompressedTrips[] => {
	if (typeof departures === "undefined" || departures.length === 0) return []
	return _.chain(transformBusbudResponseToTrips({ operators, departures }))
		.groupBy("operator_id")
		.map((departures, operatorId) => {
			const operatorInfo = getOperator(operatorId, operators)
			return {
				departures: _.chain(departures)
					.sortBy(d => new Date(d.departureTime))
					.sortBy(d => new Date(d.arrivalTime))
					.value(),
				operatorInfo,
				totalTripsAvailable: departures.length
			}
		})
		.value()
}
