import React from "react"
import { Header } from "./header"
import style from "./layout.module.scss"

interface Props {
	children: any
}

export const Layout = (props: Props) => (
	<div className="container">
		<Header />
		<div className={style.wrapper}>{props.children}</div>
	</div>
)
