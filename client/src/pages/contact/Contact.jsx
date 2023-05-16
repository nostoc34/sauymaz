import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";

function Contact() {
	const {setCollapsed} = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, [])
	return <div>Contact</div>;
}

export default Contact;
