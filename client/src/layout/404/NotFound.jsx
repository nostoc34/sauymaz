import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../MainContext";

function NotFound() {
	const { setAdminPage, setLoggedIn } = useContext(MainContext);

	useEffect(() => {
		setAdminPage(true);
	});
	return (
		<div>
			<h1>404</h1>
			<h2>Aradığınız sayfa bulunamadı!</h2>
		</div>
	);
}

export default NotFound;
