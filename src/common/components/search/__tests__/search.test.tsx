import React from "react"
import TestRenderer from "react-test-renderer"
import { testAttr } from "utilities/test"
import { Search } from ".."

const mount = () => {
	return TestRenderer.create(<Search onSearch={() => jest.fn()} />)
}

describe("Search", () => {
	it("should display the search form", () => {
		const wrapper = mount()
		const search = wrapper.root
		const searchBtn = search.findByProps(testAttr("search-btn"))
		expect(search.findByProps(testAttr("search-form"))).toBeTruthy()
		expect(search.findByProps(testAttr("search-origin-input"))).toBeTruthy()
		expect(
			search.findByProps(testAttr("search-destination-input"))
		).toBeTruthy()
		expect(searchBtn).toBeTruthy()
		expect(searchBtn.findByType("button")).toBeTruthy()
	})
})
