// import { Departures } from "utilities/transform"
import axios from "axios"
import { BusbudReturn } from "utilities/factory"
import { fetch, RequestParams } from "api"

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
	it("should call api", async () => {
		let mock = jest.spyOn(axios, "get")
		mock.mockResolvedValue(
			Promise.resolve({
				data: BusbudReturn
			})
		)
		const busbudRequest: RequestParams = {
			origin: "dr5reg",
			destination: "f25dvk",
			date: "2020-08-02",
			isPoll: false
		}
		const apiFetch = await fetch(busbudRequest)
		expect(apiFetch.departures.length).toBe(BusbudReturn.departures.length)
	})
})
