import React, { Component } from "react"
import classnames from "classnames"
import _ from "lodash"
import style from "./card.module.scss"
import { Dots } from "common/icons-svg/dots"
import { BusIcon } from "common/icons-svg/bus"
import { CaretIcon } from "common/icons-svg/caret"
import { Amenities } from "./widgets/amenities"
import { Terms } from "./widgets/terms"
import moment from "moment"
import { Trips } from "utilities/transform"
import Skeleton from "react-loading-skeleton"
import { testAttr } from "utilities/test"
import { Translations } from "utilities/translations"

interface Props {
	departures: Trips[]
}
interface State {
	idToShow: string
}

export class Uncompressed extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			idToShow: ""
		}
	}

	public render() {
		const { departures } = this.props

		if (typeof departures === "undefined" || departures.length === 0) {
			return <CardLoading />
		}

		return (
			<div id="uncompressedCard">
				{departures.map((departureObj, index) => (
					<div
						key={index}
						className={classnames("card shadow-sm", style["card"])}
					>
						<div className="card-body">
							<CardDestination departure={departureObj} />
							<CardFooter
								departure={departureObj}
								onClickDetails={() =>
									this.onClickDetails(departureObj.id)
								}
								expandedCaret={
									departureObj.id === this.state.idToShow
								}
							/>
						</div>
						{!!this.state.idToShow &&
							this.state.idToShow === departureObj.id && (
								<CardDetails departure={departureObj} />
							)}
					</div>
				))}
			</div>
		)
	}

	private onClickDetails = (id: string) => {
		this.setState({
			idToShow: this.state.idToShow !== id ? id : ""
		})
	}
}

const CardLoading = () => {
	const skeletonDisplay = _.range(1, 6)
	return (
		<div>
			{skeletonDisplay.map(s => (
				<div key={s} style={{ marginBottom: "20px" }}>
					<Skeleton key={s} height={174} />
				</div>
			))}
		</div>
	)
}

const CardDestination = ({ departure }) => {
	return (
		<div
			className={classnames(
				"d-flex row justify-content-between",
				style["travel-details"]
			)}
		>
			<CardTravel departure={departure} />
			<CardPrice departure={departure} />
		</div>
	)
}

const CardTravel = ({ departure }) => {
	const {
		departureTime,
		arrivalTime,
		originCity,
		origin,
		destinationCity,
		destination,
		class: tripClass
	} = departure
	return (
		<div className="col-md-10">
			<span className={classnames("badge badge-warning d-md-none")}>
				{tripClass}
			</span>
			<div
				{...testAttr("travel-locations")}
				className={classnames(style["card-text"])}
			>
				<span className={classnames(style.time)}>
					{moment(departureTime).format("h:mm a")}
				</span>
				{originCity} &ndash; {origin}
			</div>
			<div className={style.dots}>
				<Dots />
			</div>
			<div
				{...testAttr("travel-times")}
				className={classnames(style["card-text"])}
			>
				<span className={classnames(style.time)}>
					{moment(arrivalTime).format("h:mm a")}
				</span>{" "}
				{destinationCity} &ndash; {destination}
			</div>
		</div>
	)
}

const CardPrice = ({ departure }) => {
	const { formattedPrice } = departure
	if (!!formattedPrice) {
		return (
			<div
				{...testAttr("price")}
				className={classnames("text-right d-md-block", style.price)}
			>
				{`$${formattedPrice}`}
			</div>
		)
	}
	return null
}

const CardFooter = ({ departure, onClickDetails, expandedCaret }) => {
	const { operatorInfo, tripDuration, class: tripClass } = departure
	const expandedButtonClass = expandedCaret ? style["btn-active"] : ""
	return (
		<div
			className={classnames(
				"d-flex align-items-center",
				style["card-footer"]
			)}
		>
			<div
				{...testAttr("image")}
				title={operatorInfo.name}
				className={classnames("rounded-circle", style["company-logo"])}
				style={{
					backgroundImage: `url(${operatorInfo.logo_url})`
				}}
			></div>
			<span
				className={classnames(
					"badge badge-warning",
					style["trip-class"]
				)}
			>
				{tripClass}
			</span>
			<div className={style.duration}>
				<BusIcon />
				<span>{tripDuration}</span>
			</div>
			<button
				{...testAttr()}
				onClick={onClickDetails}
				className={classnames(
					"btn ml-auto",
					style["btn-details"],
					expandedButtonClass
				)}
			>
				{Translations.linkDetails}{" "}
				<CaretIcon expanded={expandedCaret} />
			</button>
		</div>
	)
}

const CardDetails = ({ departure }) => {
	const { amenities, terms } = departure
	return (
		<div
			{...testAttr("details")}
			className={classnames("row", style["detail"])}
		>
			<Amenities amenities={amenities} />
			<Terms terms={terms} />
		</div>
	)
}
