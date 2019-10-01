import React from "react"

interface Props {
	expanded?: boolean
}

export const CaretIcon = (props: Props) => {
	const { expanded } = props
	return (
		<svg
			version="1.1"
			id="caret"
			width="10"
			height="10"
			viewBox="0 0 306 306"
			style={{
				background: `new 0 0 306 306`,
				fontSize: "100%"
			}}
			xmlSpace="preserve"
		>
			<g>
				{!expanded && (
					<g id="expand-more">
						<polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35 " />
					</g>
				)}
				{expanded && (
					<g id="expand-less">
						<polygon points="153,58.65 0,211.65 35.7,247.35 153,130.05 270.3,247.35 306,211.65 		" />
					</g>
				)}
			</g>
		</svg>
	)
}
