import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";

function About() {

	const {setCollapsed} = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, [])

	return <div>About</div>;
}

export default About;
