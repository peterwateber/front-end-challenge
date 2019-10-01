import React from "react"
import App from ".."
import TestRenderer from "react-test-renderer"
import { BusbudReturn } from "utilities/factory"
import { LocalStorageMock } from "utilities/transform/__tests__/transform.test"
import axios from "axios"
import { Search } from "common/components/search"
import { Cards } from "pages/widgets/cards"
import { testAttr } from "utilities/test"

const mount = () => {
	return TestRenderer.create(<App />)
}

describe("Home", () => {
	let mock
	beforeEach(() => {
		global["console"]["log"] = jest.fn()
		global["localStorage"] = new LocalStorageMock()
		jest.useFakeTimers()
		mock = jest.spyOn(axios, "get")
		mock.mockResolvedValue(
			Promise.resolve({
				data: BusbudReturn
			})
		)
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should load the page", async () => {
		const wrapper = mount()
		expect(wrapper).toBeTruthy()
	})
	it("should set page language", async () => {
		const wrapper = mount()
		wrapper.root.findByProps(testAttr("switch-language-en")).props.onClick()
		expect(wrapper.getInstance().state.currentLanguage).toBe("en")
		wrapper.root.findByProps(testAttr("switch-language-fr")).props.onClick()
		expect(wrapper.getInstance().state.currentLanguage).toBe("fr")
	})
	it("should display search all cards uncompressed", () => {
		const wrapper = mount()
		expect(() => wrapper.root.findByType(Search)).toBeTruthy()
		expect(() => wrapper.root.findByType(Cards)).toBeTruthy()
	})
	it("should trigger search when search button is pressed", () => {
		const wrapper = mount()
		wrapper.root.findByType(Search).props.onSearch()
		expect(axios.get).toHaveBeenCalled()
		expect(() => wrapper.root.findByType(Cards)).toBeTruthy()
	})
	it("should trigger search when all filter button is pressed", () => {
		const wrapper = mount()
		wrapper.root.findByProps(testAttr("filter-all")).props.onClick()
		expect(axios.get).toHaveBeenCalled()
	})
	it("should trigger search when compressed filter button is pressed", () => {
		const wrapper = mount()
		wrapper.root.findByProps(testAttr("filter-compressed")).props.onClick()
		expect(axios.get).toHaveBeenCalled()
	})
	it("should display error alert", async () => {
		const flushPromises = () => new Promise(setImmediate)
		mock.mockResolvedValue(
			Promise.reject({
				data: {}
			})
		)
		const wrapper = mount()
		await flushPromises()
		expect(wrapper.root.findByProps({ id: "errorAlert" })).toBeTruthy()
	})
})
