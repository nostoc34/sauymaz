import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";
import "./about.scss";
import Header from "../../layout/header/Header";
import Banner from "./banner/Banner";

function About() {
	const { setCollapsed } = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, []);

	return (
		<>
			<Header header="HAKKIMDA" />
			<div className="about">
				<Banner />
				<div className="ed-aca"></div>
				<div className="aca-links frame"></div>
			</div>
		</>
	);
}

export default About;
