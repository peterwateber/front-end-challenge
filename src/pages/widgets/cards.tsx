import React, { Component } from "react"
import { Uncompressed } from "../../common/components/card/uncompressed"
import { Compressed } from "../../common/components/card/compressed"
import {
	transformToCompressedResponse,
	transformBusbudResponseToTrips
} from "utilities/transform"
import { BusbudResponse } from "utilities/types"

interface Props {
	compressed: boolean
	busbudResponse: BusbudResponse
}
interface State {}

export class Cards extends Component<Props, State> {
	public render() {
		const { busbudResponse } = this.props
		const compressedResponse = transformToCompressedResponse(busbudResponse)
		const departures = transformBusbudResponseToTrips(busbudResponse)
		// console.log(`[Debug] Trips`, departures)
		// console.log(`[Debug] Compressed Trips`, compressedResponse)
		return this.props.compressed ? (
			<Compressed compressedResponse={compressedResponse} />
		) : (
			<Uncompressed departures={departures} />
		)
	}
}
