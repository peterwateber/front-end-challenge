import React, { Component } from "react"
import classnames from "classnames"
import style from "./search.module.scss"
import { testAttr } from "utilities/test"
import { Translations } from "utilities/translations"

interface Props {
	onSearch: () => void
}

interface State {}

export class Search extends Component<Props, State> {
	public render() {
		return (
			<div className="col-lg-10 col-md-12 offset-lg-1">
				<form
					{...testAttr("search-form")}
					className={style["form-search"]}
				>
					<div
						className={classnames(
							"row",
							style["search"],
							"rounded-pill"
						)}
					>
						<div
							{...testAttr("search-origin-input")}
							className={classnames(
								"col-md-4",
								style["search-col"]
							)}
						>
							<input
								type="text"
								className={classnames(
									"form-control",
									style["search-input"]
								)}
								id="origin"
								placeholder="Origin"
								value="New York"
								disabled
								required
							/>
						</div>
						<div
							{...testAttr("search-destination-input")}
							className={classnames(
								"col-md-3",
								style["search-col"]
							)}
						>
							<input
								type="text"
								className={classnames(
									"form-control",
									style["search-input"]
								)}
								value="Montreal"
								id="destination"
								placeholder="Destination"
								disabled
								required
							/>
						</div>
						<div
							{...testAttr("search-date-input")}
							className={classnames(
								"col-md-3",
								style["search-input-last"]
							)}
						>
							<input
								type="text"
								className={classnames(
									"form-control",
									style["search-input"]
								)}
								id="date"
								placeholder="Date"
								value="2020-08-02"
								disabled
								required
							/>
						</div>

						<div
							{...testAttr("search-btn")}
							className={classnames(
								"col-md-2",
								style["last-wrap"]
							)}
						>
							<button
								type="button"
								className={classnames(
									"btn btn-primary rounded-pill",
									style["btn-search"]
								)}
								onClick={this.props.onSearch}
							>
								{Translations.buttonSearch}
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
