import React from "react"
import TestRenderer from "react-test-renderer"
import { BusbudReturn } from "utilities/factory"
import { testAttr } from "utilities/test"
import { Amenities } from "../widgets/amenities"
import { Terms } from "../widgets/terms"
import { Uncompressed, Compressed } from ".."
import { transformToCompressedResponse } from "utilities/transform"

const customResponse = {
	originCity: BusbudReturn.cities[0].name,
	origin: BusbudReturn.locations[0].name,
	destinationCity: BusbudReturn.cities[0].name,
	destination: BusbudReturn.locations[0].name,
	departureTime: BusbudReturn.departures[0].departure_time,
	arrivalTime: BusbudReturn.departures[0].arrival_time,
	currency: BusbudReturn.departures[0].prices.currency,
	operatorInfo: BusbudReturn.operators[0],
	tripDuration: "",
	formattedPrice: "69",
	amenities: BusbudReturn.departures[0].amenities,
	terms: BusbudReturn.departures[0].terms
}

global["localStorage"].setItem(
	"cachedResponse",
	JSON.stringify({
		cities: BusbudReturn.cities,
		origin_city_id: BusbudReturn.origin_city_id,
		destination_city_id: BusbudReturn.destination_city_id
	})
)

const mountUncompressed = (overrideProps?: any) => {
	return TestRenderer.create(
		<Uncompressed
			departures={[
				...BusbudReturn.departures.map(d => ({
					...d,
					...customResponse
				}))
			]}
			{...overrideProps}
		/>
	)
}

const mountCompressed = (overrideProps?: any) => {
	return TestRenderer.create(
		<Compressed
			compressedResponse={transformToCompressedResponse({
				...BusbudReturn,
				departures: BusbudReturn.departures.map(d => ({
					...d,
					...customResponse
				}))
			})}
			{...overrideProps}
		/>
	)
}

describe("Cards", () => {
	describe("Uncompressed", () => {
		it("should load the uncompressed card", async () => {
			const wrapper = mountUncompressed()
			expect(
				wrapper.root.findByProps({ id: "uncompressedCard" })
			).toBeTruthy()
		})
		it("should display list of card", async () => {
			const wrapper = mountUncompressed()
			expect(
				wrapper.root.findAllByProps(testAttr("image"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("travel-locations"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("travel-times"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("price"))[0]
			).toBeTruthy()
		})
		it("should display details when `Details` link is click", () => {
			const wrapper = mountUncompressed()
			const detailsBtn = wrapper.root.findAllByProps(testAttr())
			expect(detailsBtn.length).toBeGreaterThan(0)
			detailsBtn[0].props.onClick()
			expect(
				wrapper.root.findAllByProps(testAttr("details"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("amenities"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("terms"))[0]
			).toBeTruthy()
		})
	})
	describe("Compressed", () => {
		it("should load the compressed card", async () => {
			const wrapper = mountCompressed()
			expect(
				wrapper.root.findByProps({ id: "compressedCard" })
			).toBeTruthy()
		})
		it("should display compressed list of cards", async () => {
			const wrapper = mountCompressed()
			expect(
				wrapper.root.findAllByProps(testAttr("image"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("prices"))[0]
			).toBeTruthy()
		})
		it("should display details when `Details` link is click", async () => {
			const wrapper = mountCompressed()
			const details = wrapper.root.findAllByProps(testAttr("btn-details"))
			details[0].props.onClick()
			const viewMore = wrapper.root.findAllByProps(testAttr("view-more"))
			viewMore[0].props.onClick()
			expect(
				wrapper.root.findAllByProps(testAttr("details"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("travel-time"))[0]
			).toBeTruthy()
			expect(
				wrapper.root.findAllByProps(testAttr("view-more-content"))[0]
			).toBeTruthy()
			expect(wrapper.root.findAllByType(Amenities)[0]).toBeTruthy()
			expect(wrapper.root.findAllByType(Terms)[0]).toBeTruthy()
		})
	})
})
