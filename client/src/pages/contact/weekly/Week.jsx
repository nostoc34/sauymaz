import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import "./weekly.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Formik, Field } from "formik";
// import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import "./week.scss";

function Week() {
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
		console.log(data);
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
		bgcolor: "background.paper",
		border: "2px solid #000",
		borderRadius: "20px",
		boxShadow: 24,
		p: 4,
	};

	const a = data && data.length ? Object.entries(data[0]) : [];
	const b = a.splice(2, a.length - 3);

	const [day, setDay] = useState("Gün");

	useEffect(() => {
		console.log("changed");
	}, [day]);

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
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Haftalık Program (
						{data && data.length ? data[0].date : null})
					</Typography>
					<Formik
						onSubmit={(values, {resetForm}) => {
							axios
								.post(
									"http://localhost:5000/api/appointment",
									{
										...values,
										day,
									},
									{
										headers: {
											Authorization: "Bearer " + token,
										},
									}
								)
								.then((res) => {
									console.log(res.status);
								})
								.catch((err) => {
									console.log(err);
								})
								.finally(() => {
									resetForm();
									alert("Randevu isteğiniz alınmıştır.")
								})
						}}
						initialValues={{
							firstname: "",
							lastname: "",
							email: "",
							time: "",
							day: day,
						}}
					>
						{({
							values,
							handleBlur,
							handleChange,
							handleSubmit,
							setFieldValue,
							resetForm,
						}) => (
							<form onSubmit={handleSubmit} id="program-form">
								<div className="week">
									{b.map((x, index) => {
										var theDay = "";
										switch (x[0]) {
											case "monday":
												theDay = "Pazartesi";
												break;
											case "tuesday":
												theDay = "Salı";
												break;
											case "wednesday":
												theDay = "Çarşamba";
												break;
											case "thursday":
												theDay = "Perşembe";
												break;
											case "friday":
												theDay = "Cuma";
												break;
											default:
												break;
										}
										return (
											<div key={index} className="daysOfweek">
												<div className="title">
													{theDay}
												</div>
												{x[1].am1 ? (
													<div className="day-appo" >
														<div>
															{x[1].am1.title}
														</div>
														<div>
															{x[1].am1.time}
														</div>
														{x[1].am1.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].am1
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
												{x[1].am2 ? (
													<div className="day-appo" >
														<div>
															{x[1].am2.title}
														</div>
														<div>
															{x[1].am2.time}
														</div>
														{x[1].am2.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].am2
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
												{x[1].am3 ? (
													<div className="day-appo" >
														<div>
															{x[1].am3.title}
														</div>
														<div>
															{x[1].am3.time}
														</div>
														{x[1].am3.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].am3
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
												{x[1].pm1 ? (
													<div className="day-appo" >
														<div>
															{x[1].pm1.title}
														</div>
														<div>
															{x[1].pm1.time}
														</div>
														{x[1].pm1.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].pm1
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
												{x[1].pm2 ? (
													<div className="day-appo" >
														<div>
															{x[1].pm2.title}
														</div>
														<div>
															{x[1].pm2.time}
														</div>
														{x[1].pm2.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].pm2
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
												{x[1].pm3 ? (
													<div className="day-appo" >
														<div>
															{x[1].pm3.title}
														</div>
														<div>
															{x[1].pm3.time}
														</div>
														{x[1].pm3.take ===
														"true" ? (
															<label>
																<Field
																	onClick={() => {
																		setDay(
																			x[0]
																		);
																		setFieldValue(
																			"day",
																			day
																		);
																	}}
																	type="radio"
																	name="time"
																	value={
																		x[1].pm3
																			.time
																	}
																/>
															</label>
														) : null}
													</div>
												) : null}
											</div>
										);
									})}
								</div>
								<div className="infotab">
									<Field
										name="firstname"
										placeholder="Ad"
										onChange={handleChange}
										autocomplete="off"
									/>
									<Field
										name="lastname"
										placeholder="Soyad"
										onChange={handleChange}
										autocomplete="off"
									/>
									<Field
										type="email"
										name="email"
										placeholder="Email"
										onChange={handleChange}
										autocomplete="off"
									/>
									<Field
										name="day"
										value={day}
										onBlur={handleBlur}
										type="hidden"
									/>
									<div>
									<button type="submit">Gönder</button>
									</div>
								</div>
								
							</form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	);
}

export default Week;
