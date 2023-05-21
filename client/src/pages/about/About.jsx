import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";
import "./about.scss";
import Header from "../../layout/header/Header";
import Banner from "./banner/Banner";
import Education from "./education/Education";
import AcademicPast from "./academic past/AcademicPast";
import AcademicLinks from "./academic links/AcademicLinks";

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
				<div className="ed-aca">
					<Education />
					<AcademicPast />
				</div>
				<AcademicLinks />
			</div>
		</>
	);
}

export default About;
