import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../../MainContext";
import axios from "axios";
import { Formik, Field } from "formik";
import "./navbarlinks.scss";

function NavbarLinks() {
	const { token } = useContext(MainContext);

	const [navbarData, setNavbarData] = useState([]);
	const fetchNavbarData = () => {
		fetch("http://localhost:5000/api/navbar")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setNavbarData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchNavbarData();
	}, [navbarData]);

	return (
		<div>
			{navbarData.map((x) => {
				return (
					<div key={x._id} class="navbarlinks-admin">
						<div
							className="state"
							style={{
								background:
									x.isActive === "true" ? "green" : "red",
							}}
						>
							{" "}
							{x.title}{" "}
						</div>
						<div className="state-forms">
							<Formik
								onSubmit={(values) => {
									axios
										.put(
											`http://localhost:5000/api/navbar/${x._id}`,
											values,
											{
												headers: {
													Authorization:
														"Bearer " + token,
												},
											}
										)
										.then(function (res) {
											console.log(res.status);
										})
										.catch(function (error) {
											console.log(error);
										});
								}}
								initialValues={{
									isActive: "true",
								}}
							>
								{({
									values,
									handleBlur,
									handleChange,
									handleSubmit,
								}) => (
									<form onSubmit={handleSubmit}  className="form">
										<Field
											style={{ display: "none" }}
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.isActive}
											name="isActive"
											autocomplete="off"
										/>

										<button type="submit">Aktif</button>
									</form>
								)}
							</Formik>
							<Formik
								onSubmit={(values) => {
									axios
										.put(
											`http://localhost:5000/api/navbar/${x._id}`,
											values,
											{
												headers: {
													Authorization:
														"Bearer " + token,
												},
											}
										)
										.then(function (res) {
											console.log(res.status);
										})
										.catch(function (error) {
											console.log(error);
										});
								}}
								initialValues={{
									isActive: "false",
								}}
							>
								{({
									values,
									handleBlur,
									handleChange,
									handleSubmit,
								}) => (
									<form onSubmit={handleSubmit} className="form">
										<Field
											style={{ display: "none" }}
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.isActive}
											name="isActive"
											autocomplete="off"
										/>

										<button type="submit">Pasif</button>
									</form>
								)}
							</Formik>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default NavbarLinks;
