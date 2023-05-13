import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import MainContext from "../../MainContext";

function Login() {
	const { setAdminPage, setLoggedIn } = useContext(MainContext);
	useEffect(() => {
		setAdminPage(true);
	});
	return <div>Login</div>;
}

export default Login;
