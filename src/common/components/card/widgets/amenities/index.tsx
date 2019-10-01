import React from "react"
import style from "./amenities.module.scss"
import classnames from "classnames"
import { AcIcon } from "common/icons-svg/ac"
import { WifiIcon } from "common/icons-svg/wifi"
import { SeatIcon } from "common/icons-svg/seat"
import { ToiletIcon } from "common/icons-svg/toilet"
import { TVWifiIcon } from "common/icons-svg/entertainment"
import { OutletIcon } from "common/icons-svg/outlet"
import { testAttr } from "utilities/test"
import { Translations } from "utilities/translations"

interface Props {
	amenities?: any
}

export const Amenities = (props: Props) => {
	const { amenities } = props
	let list: any = []

	if (!amenities) {
		return null
	}

	if (amenities.ac) {
		list.push(
			<li key="ac">
				<div className={style["icon-holder"]}>
					<AcIcon />
				</div>
				Air conditioning
			</li>
		)
	}
	if (amenities.wifi || amenities.tv) {
		if (amenities.wifi && amenities.tv) {
			list.push(
				<li key="we">
					<div className={style["icon-holder"]}>
						<TVWifiIcon />
					</div>
					WiFi + Entertainment
				</li>
			)
		} else if (amenities.wifi) {
			list.push(
				<li key="w">
					<div className={style["icon-holder"]}>
						<WifiIcon />
					</div>
					WiFi
				</li>
			)
		} else if (amenities.tv) {
			list.push(<li key="tv">Entertainment</li>)
		}
	}
	if (amenities.average_seat) {
		list.push(
			<li key="check">
				<div className={style["icon-holder"]}>
					<SeatIcon />
				</div>
				Average Seat
			</li>
		)
	}
	if (amenities.toilet) {
		list.push(
			<li key="toilet">
				<div className={style["icon-holder"]}>
					<ToiletIcon />
				</div>
				Toilet
			</li>
		)
	}
	if (amenities.food) {
		list.push(<li key="food">Food</li>)
	}
	if (amenities.power_outlets) {
		list.push(
			<li key="power_outlets">
				<div className={style["icon-holder"]}>
					<OutletIcon />
				</div>
				Power Outlets
			</li>
		)
	}
	return (
		<div className="col-md-6" {...testAttr("amenities")}>
			<div className={style.content}>
				<div className="text-md mb-3">
					{Translations.labelAmenities}
				</div>
				<ul
					className={classnames(
						"list-unstyled",
						style["amenities-list"]
					)}
				>
					{list}
				</ul>
			</div>
		</div>
	)
}
