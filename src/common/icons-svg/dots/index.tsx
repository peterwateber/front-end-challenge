import React from "react"

export const Dots = () => {
	const dotStyle = {
		background: "new 0 0 512 512",
		fill: "#dee2e6",
		color: "#dee2e6"
	}
	return (
		<svg
			id="dots"
			viewBox="0 0 512 512"
			width="16"
			height="16"
			style={dotStyle}
			xmlSpace="preserve"
		>
			<g>
				<g>
					<g>
						<circle cx="256" cy="256" r="64" />
						<circle cx="256" cy="448" r="64" />
						<circle cx="256" cy="64" r="64" />
					</g>
				</g>
			</g>
		</svg>
	)
}
