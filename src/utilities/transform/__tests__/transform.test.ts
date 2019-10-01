import { BusbudReturn } from "utilities/factory"
import {
	transformBusbudResponseToTrips,
	transformToCompressedResponse
} from "utilities/transform"

export class LocalStorageMock {
	private store
	constructor() {
		this.store = {}
	}

	clear() {
		this.store = {}
	}

	getItem(key) {
		return this.store[key] || null
	}

	setItem(key, value) {
		this.store[key] = value.toString()
	}

	removeItem(key) {
		delete this.store[key]
	}
}

global["localStorage"] = new LocalStorageMock()

describe("Transform", () => {
	beforeAll(() => {
		global["localStorage"].setItem(
			"cachedResponse",
			JSON.stringify({
				cities: BusbudReturn.cities,
				origin_city_id: BusbudReturn.origin_city_id,
				destination_city_id: BusbudReturn.destination_city_id,
				locations: BusbudReturn.locations
			})
		)
	})

	afterAll(() => {
		jest.resetAllMocks()
	})
	it("should transform Busbud response to transformBusbudResponseToResult", () => {
		const response = transformBusbudResponseToTrips(BusbudReturn)
		expect(response).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					origin: BusbudReturn.locations[0].name,
					originCity: BusbudReturn.cities[0].name,
					destination: BusbudReturn.locations[0].name,
					destinationCity: BusbudReturn.cities[0].name,
					departureTime: BusbudReturn.departures[0].departure_time,
					arrivalTime: BusbudReturn.departures[0].arrival_time,
					currency: BusbudReturn.departures[0].prices.currency,
					operatorInfo: BusbudReturn.operators[0]
				})
			])
		)
	})
	it("should transform Busbud response to transformToCompressedResponse", () => {
		const response = transformToCompressedResponse(BusbudReturn)
		expect(response).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					departures: transformBusbudResponseToTrips(BusbudReturn),
					operatorInfo: BusbudReturn.operators[0],
					totalTripsAvailable: 2
				})
			])
		)
	})
})
