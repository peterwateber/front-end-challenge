import React from "react"
import classnames from "classnames"
import style from "./terms.module.scss"
import { NoneIcon } from "common/icons-svg/none"
import { LuggageIcon } from "common/icons-svg/luggage"
import { testAttr } from "utilities/test"
import { Translations } from "utilities/translations"

interface Props {
	terms?: any
}

export const Terms = (props: Props) => {
	const { terms } = props
	let list: any = []

	if (!terms.refund) {
		list.push(
			<li key="refund">
				<div className={style["icon-holder"]}>
					<NoneIcon />
				</div>
				No Refund
			</li>
		)
	}
	if (terms.nb_carry_on) {
		list.push(
			<li key="carry-on">
				<div className={style["icon-holder"]}>
					<LuggageIcon />
				</div>
				{terms.nb_carry_on} carry-on bag
			</li>
		)
	}
	if (terms.kg_by_bag) {
		list.push(
			<li key="check">
				<div className={style["icon-holder"]}>
					<LuggageIcon />
				</div>
				Max {terms.kg_by_bag}kg per bag
			</li>
		)
	}
	if (terms.extra_bag_cost) {
		const extra_bag_cost =
			parseFloat(terms.extra_bag_cost) > 0
				? (parseFloat(terms.extra_bag_cost) / 100).toFixed(2)
				: terms.extra_bag_cost
		list.push(
			<li key="xtra">
				<div className={style["icon-holder"]}>
					<LuggageIcon />
				</div>
				Extra bag cost ${extra_bag_cost}
			</li>
		)
	}
	return (
		<div className="col-md-6" {...testAttr("terms")}>
			<div className={style.content}>
				<div className="text-md mb-3">{Translations.labelTerms}</div>
				<ul
					className={classnames("list-unstyled", style["terms-list"])}
				>
					{list}
				</ul>
			</div>
		</div>
	)
}
