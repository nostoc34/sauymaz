import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import "./weekly.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Formik, Field } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

function Weekly() {
	const [data, setData] = useState([]);
	const { token } = useContext(MainContext);

	const fetchData = () => {
		fetch("http://localhost:5000/api/program")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setData(APIData.reverse());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};
	const handleClose = () => setOpen(false);

	// const isMobile = useMediaQuery("(max-width:450px)");
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		fontWeight: 400,
		width: "80%",
		bgcolor: "background.paper",
		border: "2px solid #000",
		borderRadius: "20px",
		boxShadow: 24,
		p: 4,
	};

	const handleFormSubmit = async (values) => {
		console.log(values);
		console.log(day);
		// fetch("http://localhost:5000/api/appointment", {
		// 	method: "POST",
		// 	body: values,
		// 	headers: {
		// 		Authorization: "Bearer " + token,
		// 	},
		// })
		// 	.then((res) => {
		// 		console.log(res.status);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	const [day, setDay] = useState("Gün");

	return (
		<div className="frame weekly" onClick={handleOpen}>
			<h1>Haftalık Program ve Randevu</h1>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{data.map((x) => {
						return (
							<div key={x._id}>
								<Formik
									onSubmit={handleFormSubmit}
									initialValues={{
										firstname: "",
										lastname: "",
										email: "",
										date: "",
										day: day,
									}}
								>
									{({
										values,
										handleBlur,
										handleChange,
										handleSubmit,
									}) => (
										<form
											onSubmit={handleSubmit}
											id="program-form"
										>
											<div className="program-day">
												<h3>Pazartesi</h3>
												<div className="day-piece">
													{" "}
													{x.monAm1Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monAm1Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monAm1Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="time"
																	value={
																		x.monAm1Time
																	}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
												<div className="day-piece">
													{" "}
													{x.monAm2Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monAm2Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monAm2Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="date"
																	value={
																		x.monAm2Time
																	}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
												<div className="day-piece">
													{" "}
													{x.monAm3Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monAm3Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monAm3Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="date"
																	value={
																		x.monAm3Time
																	}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
												<div className="day-piece">
													{" "}
													{x.monPm1Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monPm1Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monPm1Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="date"
																	value={
																		x.monPm1Time
																	}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
												<div className="day-piece">
													{" "}
													{x.monPm2Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monPm2Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monPm2Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="date"
																	value={
																		x.monPm2Time
																	}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
												<div className="day-piece">
													{" "}
													{x.monPm3Title ? (
														<div>
															<div>
																{" "}
																{
																	x.monPm3Title
																}{" "}
															</div>{" "}
															<div>
																{" "}
																{
																	x.monPm3Time
																}{" "}
															</div>
															<label>
																<Field
																	type="radio"
																	name="date"
																	value={
																		x.monPm3Time
																	}
																	onClick={() => {
																		setDay(
																			"Pazartesi"
																		);
																	}}
																/>
															</label>
														</div>
													) : (
														"Dolu"
													)}{" "}
												</div>
											</div>
											<div>
												<Field
													name="firstname"
													placeholder="Ad"
													onChange={handleChange}
												/>
												<Field
													name="lastname"
													placeholder="Soyad"
													onChange={handleChange}
												/>
												<Field
													type="email"
													name="email"
													placeholder="Email"
													onChange={handleChange}
												/>
												<Field
													id="day"
													name="day"
													value={day}
												/>
											</div>
											<button type="submit">
												Güncelle
											</button>
										</form>
									)}
								</Formik>
							</div>
						);
					})}
				</Box>
			</Modal>
		</div>
	);
}

export default Weekly;
