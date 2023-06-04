import React, { useEffect, useContext } from "react";
import MainContext from "../../MainContext";
import "./contact.scss";
import Header from "../../layout/header/Header";
import MailForm from "./mail form/MailForm";
import Info from "./info/Info";
import Weekly from "./weekly/Weekly";

function Contact() {
	const { setCollapsed } = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, []);
	return (
		<div>
			<Header header="İLETİŞİM" />
			<div className="contact-cont">
				{/* <Weekly /> */}
				<div className="contact">
					<MailForm />
					<Info />
				</div>
			</div>
		</div>
	);
}

export default Contact;
