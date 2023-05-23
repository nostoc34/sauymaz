import React, { useEffect, useContext, useState } from "react";
import MainContext from "../../MainContext";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";

function Login() {
	const { setAdminPage, setLoggedIn, setToken, token } =
		useContext(MainContext);

	useEffect(() => {
		setAdminPage(true);
	});

	const navigate = useNavigate();

	return (
		<div className="login">
			<div className="login-cont">
				<div className="login-box frame">
					<div className="login-title">
						<h1>Giriş Yap</h1>
					</div>
					<div>
						<Formik
							initialValues={{
								name: "",
								password: "",
							}}
							onSubmit={(values) => {
								axios
									.post(
										"http://localhost:5000/api/admin/login",
										values
									)
									.then(function (response) {
										setToken(response.data.token);
										setLoggedIn(true);
									})
									.catch(function (error) {
										console.log(error);
										alert(
											"Yanlış kullanıcı adı veya şifre!"
										);
									});
							}}
						>
							{(props) => (
								<Form>
									<Field
										name="name"
										placeholder="Kullanıcı Adı"
									/>
									<Field
										name="password"
										placeholder="Şifre"
										type="password"
									/>
									<button type="submit">Giriş Yap</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
