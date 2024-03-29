export const City = {
	id: "375dd5879001acbd84a4683deda84183",
	locale: "en",
	region_id: 6417,
	name: "New York",
	lat: 40.71427,
	lon: -74.00597,
	geohash: "dr5reg",
	timezone: "America/New_York",
	image_url: "/images/promos/city-blocks/new-york.jpg",
	legacy_url_form: "NewYork,NewYork,UnitedStates",
	full_name: "New York, New York, United States",
	region: {
		id: 6417,
		locale: "en",
		country_code2: "US",
		name: "New York",
		country: {
			code2: "US",
			locale: "en",
			code3: "USA",
			name: "United States",
			continent: "NA",
			default_locale: "en",
			default_currency: "USD",
			population: 310232863
		}
	}
}

export const Location = {
	id: 3970,
	city_id: "375dd5879001acbd84a4683dedfb933e",
	name: "Métro Bonaventure Bus Station",
	address: ["997 Rue St-Antoine Ouest", "Montreal, QC H3C 1A6"],
	type: "transit_station",
	lat: 45.4988273060484,
	lon: -73.5644745826722,
	geohash: "f25dvfzcz"
}

export const Operator = {
	id: "bfc27cd544ca49c18d000f2bc00c58c0",
	source_id: 155,
	profile_id: 111,
	name: "Greyhound",
	url: null,
	logo_url:
		"https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}",
	display_name: "Greyhound",
	sellable: true,
	fuzzy_prices: false,
	sell_tickets_cutoff: {
		hours: 1
	},
	amenities: {
		classes: {
			Normal: {
				display_name: "Economy",
				wifi: true,
				toilet: true,
				ac: true,
				food: false,
				refreshment: false,
				power_outlets: true,
				tv: false,
				bus_attendant: false,
				leg_room: false
			},
			Economy: {
				display_name: "Economy",
				wifi: true,
				toilet: true,
				ac: true,
				food: false,
				refreshment: false,
				power_outlets: true,
				tv: false,
				bus_attendant: false,
				leg_room: false
			}
		}
	},
	source: "greyhound_us",
	referral_deal: false,
	display_url: null,
	fraud_check: "iovation",
	terms: {
		refund: false,
		exchange: true,
		bag_allowed: true,
		piece_of_id: false,
		boarding_requirement: "printed_tkt",
		extra_bag_policy: true,
		use_new_ticket: false,
		exchange_cutoff: 24,
		nb_checked_bags: 1,
		kg_by_bag: 25,
		nb_carry_on: 1,
		extra_bag_cost: 1500
	}
}

export const XDeparture = {
	id: "7c5dd26a",
	source_id: 155,
	checkout_type: "new",
	operator_id: "bfc27cd544ca49c18d000f2bc00c58c0",
	origin_location_id: 3970,
	destination_location_id: 3970,
	class: "Economy",
	class_name: "Economy",
	amenities: {
		display_name: "Economy",
		wifi: true,
		toilet: true,
		ac: true,
		food: false,
		refreshment: false,
		power_outlets: true,
		tv: false,
		bus_attendant: false,
		leg_room: false
	},
	available_seats: 55,
	prices: {
		total: 5200,
		breakdown: {
			base: 5200
		},
		currency: "USD",
		categories: {},
		discounted: false
	},
	terms: {
		refund: false,
		exchange: true,
		bag_allowed: true,
		piece_of_id: false,
		boarding_requirement: "printed_tkt",
		extra_bag_policy: true,
		use_new_ticket: false,
		exchange_cutoff: 24,
		nb_checked_bags: 1,
		kg_by_bag: 25,
		nb_carry_on: 1,
		extra_bag_cost: 1500
	},
	ticket_types: ["print"],
	departure_timezone: "America/New_York",
	arrival_timezone: "America/Montreal",
	departure_time: "2016-01-14T00:01:00",
	arrival_time: "2016-01-14T07:55:00"
}

export const BusbudReturn = {
	origin_city_id: "375dd5879001acbd84a4683deda84183",
	destination_city_id: "375dd5879001acbd84a4683deda84183",
	cities: [{ ...City }, { ...City }],
	locations: [{ ...Location }, { ...Location }],
	operators: [{ ...Operator }, { ...Operator }],
	departures: [{ ...XDeparture }, { ...XDeparture }],
	complete: true,
	ttl: 900,
	is_valid_route: true
}
