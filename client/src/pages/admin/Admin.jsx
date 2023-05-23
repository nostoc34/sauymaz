import React, { useEffect, useContext } from "react";
import MainContext from "../../MainContext";
import { useNavigate } from "react-router-dom";

function Admin() {
	const { setAdminPage, isLoggedIn, setLoggedIn } = useContext(MainContext);

	const navigate = useNavigate();

	useEffect(() => {
		setAdminPage(true);
	});


	return (
		<div>
			<button
				onClick={() => {
					setLoggedIn(false);
				}}
			>
				Çıkış Yap
			</button>
		</div>
	);
}

export default Admin;
