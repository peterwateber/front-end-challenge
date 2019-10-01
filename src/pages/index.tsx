import { fetch, RequestParams } from "api"
import classnames from "classnames"
import { Cards } from "pages/widgets/cards"
import { Layout } from "common/components/layout"
import { Search } from "common/components/search"
import React, { Component } from "react"
import { testAttr } from "utilities/test"
import { BusbudResponse } from "utilities/types/busbud"
import { Translations } from "utilities/translations"

enum Language {
	en = "en",
	fr = "fr"
}

interface Props {}
interface State {
	compressed: boolean
	toggleCaret: boolean
	busbudResponse: BusbudResponse
	errorDisplay: boolean
	currentLanguage: Language
}
class App extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			compressed: false,
			errorDisplay: false,
			toggleCaret: false,
			busbudResponse: [],
			currentLanguage: Language.en
		}
	}

	public async componentDidMount() {
		this.fetchBusbudApi()
	}

	public render() {
		const translationButtonStyle = {
			english:
				this.state.currentLanguage === "en"
					? "btn-dark"
					: "btn-outline-dark",
			french:
				this.state.currentLanguage === "fr"
					? "btn-dark"
					: "btn-outline-dark"
		}
		const filterButtonStyle = {
			compressed: this.state.compressed
				? "btn-primary"
				: "btn-outline-primary",
			uncompressed: !this.state.compressed
				? "btn-primary"
				: "btn-outline-primary"
		}
		return (
			<Layout>
				<div className="col-lg-10 col-md-12 offset-lg-1">
					<div style={{ marginBottom: "20px", textAlign: "right" }}>
						<button
							{...testAttr("switch-language-en")}
							type="button"
							className={classnames(
								"btn rounded-pill",
								translationButtonStyle.english
							)}
							style={{ marginRight: "10px" }}
							onClick={() => this.changeLanguage(Language.en)}
						>
							English
						</button>
						<button
							{...testAttr("switch-language-fr")}
							type="button"
							className={classnames(
								"btn rounded-pill",
								translationButtonStyle.french
							)}
							onClick={() => this.changeLanguage(Language.fr)}
						>
							French
						</button>
					</div>
				</div>
				<Search
					onSearch={() => this.toggleView(this.state.compressed)}
				/>
				<div className="col-lg-10 col-md-12 offset-lg-1">
					<div style={{ margin: "20px 0" }}>
						<button
							{...testAttr("filter-all")}
							type="button"
							className={classnames(
								"btn rounded-pill",
								filterButtonStyle.uncompressed
							)}
							style={{ marginRight: "10px" }}
							onClick={() => this.toggleView(false)}
						>
							{Translations.labelAll}
						</button>
						<button
							{...testAttr("filter-compressed")}
							type="button"
							className={classnames(
								"btn rounded-pill",
								filterButtonStyle.compressed
							)}
							onClick={() => this.toggleView(true)}
						>
							{Translations.labelCompressed}
						</button>
					</div>

					{this.state.errorDisplay && (
						<div
							id="errorAlert"
							className="alert alert-danger"
							role="alert"
						>
							{Translations.errorMessage}
						</div>
					)}

					<Cards
						busbudResponse={this.state.busbudResponse}
						compressed={this.state.compressed}
					/>
				</div>
			</Layout>
		)
	}

	private changeLanguage = (newLanguage: Language) => {
		Translations.setLanguage(newLanguage)
		this.setState({
			currentLanguage: newLanguage
		})
	}

	private fetchBusbudApi = async () => {
		try {
			const busbudRequest: RequestParams = {
				origin: "dr5reg",
				destination: "f25dvk",
				date: "2020-08-02",
				isPoll: false
			}
			const response: BusbudResponse = await fetch(busbudRequest)

			// console.log(`[Debug] Response`, response)

			this.setState({
				busbudResponse: response
			})

			if (!response.complete) {
				const index =
					response.departures.length > 0
						? response.departures.length
						: 10
				await this.pollRequest(response, index)
			}
		} catch (ex) {
			// console.log(`[Error] - `, ex)
			this.setState({
				errorDisplay: true
			})
		}
	}

	private toggleView = (compressed: boolean) => {
		this.setState({
			compressed,
			busbudResponse: []
		})
		this.fetchBusbudApi()
	}

	private pollRequest = async (
		busbudResponse: BusbudResponse,
		index: string
	) => {
		const busbudRequest: RequestParams = {
			origin: "dr5reg",
			destination: "f25dvk",
			date: "2020-08-02",
			isPoll: true,
			params: { index }
		}
		const response: BusbudResponse = await fetch(busbudRequest)

		if (typeof response === "object") {
			const { departures, operators } = busbudResponse
			const mergedDepartures = (departures || []).concat([
				...response.departures
			])

			const mergedOperators = (operators || []).concat([
				...response.operators
			])

			// console.log(`[Debug] Merged departures `, mergedDepartures)

			this.setState({
				busbudResponse: {
					...response,
					departures: mergedDepartures,
					operators: mergedOperators
				}
			})

			if (!response.complete) {
				this.timeout(3000).then(() =>
					this.pollRequest(departures, index)
				)
			}
		}
	}

	private timeout = delay =>
		new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, delay)
		})

	public _testExports = {
		pollRequest: this.pollRequest
	}
}

export default App
