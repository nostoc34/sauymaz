import React from "react";
import "./header.scss";

function Header(props) {
	return (
		<div className="header-title">
			<h1> {props.header} </h1>
		</div>
	);
}

export default Header;
