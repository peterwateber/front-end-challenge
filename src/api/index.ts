import axios from "axios"
import { BusbudResponse } from "utilities/types/busbud"

const host = process.env.REACT_APP_BUSBUD_HOST_URL
const Accept = process.env.REACT_APP_BUSBUD_HEADERS_ACCEPT

const apiUrl = (origin, destination, date) => {
	return `${host}/x-departures/${origin}/${destination}/${date}`
}

const pollUrl = (origin, destination, date) => {
	// return `${host}/x-departures/${origin}/${destination}/${date}`
	return `${host}/x-departures/${origin}/${destination}/${date}/poll`
}

export interface RequestParams {
	origin: string
	destination: string
	date: string
	isPoll: boolean
	params?: {
		index: string
	}
}

export const fetch = async ({
	origin,
	destination,
	date,
	isPoll,
	params
}: RequestParams) => {
	const url = isPoll
		? pollUrl(origin, destination, date)
		: apiUrl(origin, destination, date)
	const departures = await axios.get(url, {
		headers: {
			Accept,
			"X-Busbud-Token": process.env.REACT_APP_BUSBUD_API_TOKEN
		},
		params
	})
	const response: BusbudResponse = departures.data
	if (!isPoll) {
		const cachedResponse = {
			cities: response.cities,
			locations: response.locations,
			origin_city_id: response.origin_city_id,
			destination_city_id: response.destination_city_id
		}
		window.localStorage.setItem(
			"cachedResponse",
			JSON.stringify(cachedResponse)
		)
	}
	return response
}

export const _testExports = {
	fetch
}
