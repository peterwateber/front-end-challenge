import React, { Component } from "react"
import classnames from "classnames"
import style from "./card.module.scss"
import _ from "lodash"
import { CaretIcon } from "common/icons-svg/caret"
import Skeleton from "react-loading-skeleton"
import { Amenities } from "./widgets/amenities"
import { Terms } from "./widgets/terms"
import moment from "moment"
import { CompressedTrips } from "utilities/transform"
import { BusIcon } from "common/icons-svg/bus"
import { testAttr } from "utilities/test"
import { Translations } from "utilities/translations"

interface Props {
	compressedResponse: CompressedTrips[]
}
interface State {
	departureIdToShow: string
	viewMoreToShow: string
}

export class Compressed extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			departureIdToShow: "",
			viewMoreToShow: ""
		}
	}
	public render() {
		const { compressedResponse } = this.props

		if (compressedResponse.length === 0) {
			return <CardLoading />
		}

		return (
			<div id="compressedCard">
				{compressedResponse.map((obj, index) => {
					if (
						typeof obj.departures === "undefined" ||
						obj.departures.length === 0
					) {
						return (
							<div key={index}>
								<CardLoading />
							</div>
						)
					}
					return (
						<div
							key={index}
							className={classnames(
								"card shadow-sm",
								style["card"],
								style["compressed-card"]
							)}
						>
							<div className="card-body">
								<CardTravel
									{...obj}
									expandedCaret={
										this.state.departureIdToShow ===
										obj.operatorInfo.id
									}
									handleDetailsClick={this.toggleCardDetails}
								/>
							</div>
							{this.state.departureIdToShow ===
								obj.operatorInfo.id && (
								<div>
									<CardDetails
										departures={obj.departures}
										handleViewMore={this.handleViewMore}
										viewMoreToShow={
											this.state.viewMoreToShow
										}
									/>
								</div>
							)}
						</div>
					)
				})}
			</div>
		)
	}

	private toggleCardDetails = (operatorId: string) => {
		this.setState({
			viewMoreToShow: "",
			departureIdToShow:
				this.state.departureIdToShow === operatorId ? "" : operatorId
		})
	}

	private handleViewMore = departureId => {
		this.setState({
			viewMoreToShow:
				this.state.viewMoreToShow === departureId ? "" : departureId
		})
	}
}

const CardLoading = () => {
	const skeletonDisplay = _.range(1, 3)
	return (
		<div>
			{skeletonDisplay.map(s => (
				<div key={s} style={{ marginBottom: "20px" }}>
					<Skeleton key={s} height={92} />
				</div>
			))}
		</div>
	)
}

const CardTravel = ({
	departures,
	expandedCaret,
	handleDetailsClick,
	operatorInfo,
	totalTripsAvailable
}) => {
	const lowestPrice = _.minBy(departures, d => d.formattedPrice) || {}
	const highestPrice = _.maxBy(departures, d => d.formattedPrice) || {}

	return (
		<div
			className={classnames(
				"d-flex align-items-center",
				style["travel-details"]
			)}
		>
			<div
				{...testAttr("image")}
				className={classnames("rounded-circle", style["company-logo"])}
				style={{
					backgroundImage: `url(${operatorInfo.logo_url})`
				}}
			></div>
			<div className={style["card-text"]}>
				<div
					{...testAttr("prices")}
					className={classnames("d-md-block", style["tickets-from"])}
				>
					{Translations.labelTickets} {operatorInfo.display_name}
				</div>
				{!!lowestPrice.formattedPrice && !!highestPrice.formattedPrice && (
					<div
						className={classnames(
							"badge badge-success",
							style["total-flights"]
						)}
					>
						{`$${lowestPrice.formattedPrice}`} &ndash;{" "}
						{`$${highestPrice.formattedPrice}`}
					</div>
				)}
			</div>
			<div
				className={classnames(
					"text-right d-block ml-auto ",
					style.price
				)}
			>
				{!!totalTripsAvailable && totalTripsAvailable}{" "}
				{Translations.labelTrips}
				<button
					{...testAttr("btn-details")}
					className={classnames("btn ml-auto", style["btn-details"])}
					onClick={() => handleDetailsClick(operatorInfo.id)}
				>
					{Translations.linkViewMore}{" "}
					<CaretIcon expanded={expandedCaret} />
				</button>
			</div>
		</div>
	)
}

const CardDetails = ({ departures, viewMoreToShow, handleViewMore }) => {
	return (
		<div
			{...testAttr("details")}
			className={classnames("row", style["detail"])}
		>
			{departures.map((departureObj, index) => (
				<CardTravelTime
					key={index}
					departure={departureObj}
					handleViewMore={handleViewMore}
					viewMoreToShow={viewMoreToShow}
				/>
			))}
		</div>
	)
}

const CardTravelTime = ({ departure, viewMoreToShow, handleViewMore }) => {
	const {
		tripDuration,
		originCity,
		origin,
		destinationCity,
		destination,
		class: tripClass
	} = departure
	return (
		<div className="col-md-12">
			<div className={classnames("row", style["detail-header"])}>
				<div className="col-md-4">
					<div className={style["schedule"]}>
						<div className={classnames("d-md-none text-center")}>
							<span className="badge badge-warning">
								{tripClass}
							</span>{" "}
							&ndash;{" "}
							<span className="badge badge-success">{`$${departure.formattedPrice}`}</span>
						</div>
						<h5 {...testAttr("travel-time")}>
							{moment(departure.departureTime).format("hh:mm a")}{" "}
							&ndash;{" "}
							{moment(departure.arrivalTime).format("hh:mm a")}
						</h5>
					</div>
				</div>
				<div className="col-md-4 text-center">
					<button
						{...testAttr("view-more")}
						className={classnames("btn", style["btn-details"])}
						onClick={() => handleViewMore(departure.id)}
					>
						{Translations.linkViewMore}{" "}
						<CaretIcon expanded={viewMoreToShow === departure.id} />
					</button>
				</div>
				<div className="col-md-4">
					<div className={classnames("d-md-block", style.price)}>
						{`$${departure.formattedPrice}`}{" "}
						<span
							className={classnames(
								"badge badge-warning",
								style["trip-class"]
							)}
						>
							{tripClass}
						</span>
						{viewMoreToShow !== departure.id && (
							<div className={style.duration}>
								{Translations.labelDuration}{" "}
								<span>{tripDuration}</span>
							</div>
						)}
					</div>
				</div>
			</div>
			{viewMoreToShow === departure.id && (
				<div {...testAttr("view-more-content")} className="row">
					<div className="col-md-12 text-center">
						{origin}, {originCity} &ndash; {destination},{" "}
						{destinationCity}
					</div>
					<div className="col-md-12 text-center">
						<div className={style.duration}>
							<BusIcon />
							<span>{tripDuration}</span>
						</div>
					</div>
					<Amenities amenities={departure.amenities} />
					<Terms terms={departure.terms} />
				</div>
			)}
		</div>
	)
}
