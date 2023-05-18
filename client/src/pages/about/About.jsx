import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";
import Header from "../../layout/header/Header";

function About() {
	const { setCollapsed } = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, []);

	return (
		<div className="about">
			<Header header="HAKKIMDA" />
			<div className="banner"></div>
			<div className="ed-aca">
				<div className="education"></div>
				<div className="aca-past"></div>
			</div>
			<div className="aca-links"></div>
		</div>
	);
}

export default About;
