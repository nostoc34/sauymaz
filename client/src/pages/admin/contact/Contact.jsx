import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { Formik, Field } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./contact.scss";

function Contact() {
	const { token } = useContext(MainContext);

	const [contactData, setContactData] = useState([]);
	const fetchContactData = () => {
		fetch("http://localhost:5000/api/contact")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setContactData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [programData, setProgramData] = useState([]);
	const fetchProgramdata = () => {
		fetch("http://localhost:5000/api/program")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setProgramData(APIData.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const updateID =
		programData && programData.length ? programData[0]._id : null;

	const [appointmentData, setAppointmentData] = useState([]);
	const fetchAppointmentData = () => {
		fetch("http://localhost:5000/api/appointment")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setAppointmentData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchContactData();
		fetchProgramdata();
	}, []);

	useEffect(() => {
		fetchAppointmentData();
	}, [appointmentData]);

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
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	const programstyle = {
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
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		maxHeight: 800,
		overflowY: "scroll",
		width: "75%",
	};

	const [open, setOpen] = useState({
		updateContact: false,
		newProgram: false,
		updateProgram: false,
		appointments: false,
	});

	const periods = [
		[".am1.title", ".am1.time", ".am1.take"],
		[".am2.title", ".am2.time", ".am2.take"],
		[".am3.title", ".am3.time", ".am3.take"],
		[".pm1.title", ".pm1.time", ".pm1.take"],
		[".pm2.title", ".pm2.time", ".pm2.take"],
		[".pm3.title", ".pm3.time", ".pm3.take"],
	];

	return (
		<div className="admin-contact admin-section">
			<div
				className="admin-contact-item  admin-operation"
				onClick={() => {
					if (!open.updateContact) {
						setOpen({
							...open,
							updateContact: true,
						});
					}
				}}
			>
				İletişim Bilgileri Güncelle
				<Modal
					open={open.updateContact}
					onClose={() => {
						setOpen({
							...open,
							updateContact: false,
						});
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							İletişim Bilgileri Güncelle
						</Typography>
						{contactData.map((x) => {
							return (
								<div key={x._id}>
									<Formik
										onSubmit={(values) => {
											axios
												.put(
													`http://localhost:5000/api/contact/${x._id}`,
													values,
													{
														headers: {
															Authorization:
																"Bearer " +
																token,
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
											phone: x.phone,
											fax: x.fax,
											email: x.email,
											adress: x.adress,
											instagram: x.instagram,
											twitter: x.twitter,
											linkedin: x.linkedin,
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
												className="form"
											>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.phone}
													name="phone"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.fax}
													name="fax"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
													name="email"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.adress}
													name="adress"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.instagram}
													name="instagram"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.twitter}
													name="twitter"
													autocomplete="off"
												/>
												<Field
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.linkedin}
													name="linkedin"
													autocomplete="off"
												/>

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

			<div
				className="admin-contact-item  admin-operation"
				onClick={() => {
					if (!open.newProgram) {
						setOpen({
							...open,
							newProgram: true,
						});
					}
				}}
			>
				Yeni Haftalık Program
				<Modal
					open={open.newProgram}
					onClose={() => {
						setOpen({
							...open,
							newProgram: false,
						});
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={programstyle}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Yeni Haftalık Program
						</Typography>
						<div className="program-cont">
							<Formik
								initialValues={{
									date: "",
									monday: {
										am1: {
											title: "",
											time: "",
											take: "false",
										},
										am2: {
											title: "",
											time: "",
											take: "false",
										},
										am3: {
											title: "",
											time: "",
											take: "false",
										},
										pm1: {
											title: "",
											time: "",
											take: "false",
										},
										pm2: {
											title: "",
											time: "",
											take: "false",
										},
										pm3: {
											title: "",
											time: "",
											take: "false",
										},
									},
									tuesday: {
										am1: {
											title: "",
											time: "",
											take: "false",
										},
										am2: {
											title: "",
											time: "",
											take: "false",
										},
										am3: {
											title: "",
											time: "",
											take: "false",
										},
										pm1: {
											title: "",
											time: "",
											take: "false",
										},
										pm2: {
											title: "",
											time: "",
											take: "false",
										},
										pm3: {
											title: "",
											time: "",
											take: "false",
										},
									},
									wednesday: {
										am1: {
											title: "",
											time: "",
											take: "false",
										},
										am2: {
											title: "",
											time: "",
											take: "false",
										},
										am3: {
											title: "",
											time: "",
											take: "false",
										},
										pm1: {
											title: "",
											time: "",
											take: "false",
										},
										pm2: {
											title: "",
											time: "",
											take: "false",
										},
										pm3: {
											title: "",
											time: "",
											take: "false",
										},
									},
									thursday: {
										am1: {
											title: "",
											time: "",
											take: "false",
										},
										am2: {
											title: "",
											time: "",
											take: "false",
										},
										am3: {
											title: "",
											time: "",
											take: "false",
										},
										pm1: {
											title: "",
											time: "",
											take: "false",
										},
										pm2: {
											title: "",
											time: "",
											take: "false",
										},
										pm3: {
											title: "",
											time: "",
											take: "false",
										},
									},
									friday: {
										am1: {
											title: "",
											time: "",
											take: "false",
										},
										am2: {
											title: "",
											time: "",
											take: "false",
										},
										am3: {
											title: "",
											time: "",
											take: "false",
										},
										pm1: {
											title: "",
											time: "",
											take: "false",
										},
										pm2: {
											title: "",
											time: "",
											take: "false",
										},
										pm3: {
											title: "",
											time: "",
											take: "false",
										},
									},
								}}
								onSubmit={(values) => {
									axios
										.post(
											"http://localhost:5000/api/program",
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
									axios
										.delete(
											`http://localhost:5000/api/appointment`,
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
							>
								{({
									values,
									handleBlur,
									handleChange,
									handleSubmit,
								}) => (
									<form
										onSubmit={handleSubmit}
										className="new-program-form form"
									>
										<Field
											name="date"
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Tarih"
										/>
										<div className="days">
											<div className="program-day">
												<h3>Pazartesi</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`monday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`monday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`monday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`monday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Salı</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`tuesday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`tuesday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`tuesday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`tuesday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Çarşamba</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`wednesday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`wednesday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`wednesday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`wednesday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Perşembe</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`thursday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`thursday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`thursday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`thursday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Cuma</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`friday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`friday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`friday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`friday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
										</div>
										<button type="submit">Gönder</button>
									</form>
								)}
							</Formik>
						</div>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-contact-item  admin-operation"
				onClick={() => {
					if (!open.updateProgram) {
						setOpen({
							...open,
							updateProgram: true,
						});
					}
				}}
			>
				Haftalık Programı Güncelle
				<Modal
					open={open.updateProgram}
					onClose={() => {
						setOpen({
							...open,
							updateProgram: false,
						});
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={programstyle}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Haftalık Programı Güncelle
						</Typography>
						<div className="program-cont">
							<Formik
								initialValues={{
									date:
										programData && programData.length
											? programData[0].date
											: null,
									monday: {
										am1: {
											title:
												programData &&
												programData.length
													? programData[0].monday.am1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.am1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.am1
															.take
													: "false",
										},
										am2: {
											title:
												programData &&
												programData.length
													? programData[0].monday.am2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.am2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.am2
															.take
													: "false",
										},
										am3: {
											title:
												programData &&
												programData.length
													? programData[0].monday.am3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.am3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.am3
															.take
													: "false",
										},
										pm1: {
											title:
												programData &&
												programData.length
													? programData[0].monday.pm1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.pm1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.pm1
															.take
													: "false",
										},
										pm2: {
											title:
												programData &&
												programData.length
													? programData[0].monday.pm2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.pm2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.pm2
															.take
													: "false",
										},
										pm3: {
											title:
												programData &&
												programData.length
													? programData[0].monday.pm3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].monday.pm3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].monday.pm3
															.take
													: "false",
										},
									},
									tuesday: {
										am1: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.am1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.am1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.am1
															.take
													: "false",
										},
										am2: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.am2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.am2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.am2
															.take
													: "false",
										},
										am3: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.am3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.am3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.am3
															.take
													: "false",
										},
										pm1: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.pm1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.pm1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.pm1
															.take
													: "false",
										},
										pm2: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.pm2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.pm2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.pm2
															.take
													: "false",
										},
										pm3: {
											title:
												programData &&
												programData.length
													? programData[0].tuesday.pm3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].tuesday.pm3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].tuesday.pm3
															.take
													: "false",
										},
									},
									wednesday: {
										am1: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.am1.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.am1.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.am1.take
													: "false",
										},
										am2: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.am2.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.am2.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.am2.take
													: "false",
										},
										am3: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.am3.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.am3.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.am3.take
													: "false",
										},
										pm1: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm1.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm1.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm1.take
													: "false",
										},
										pm2: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm2.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm2.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm2.take
													: "false",
										},
										pm3: {
											title:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm3.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm3.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].wednesday
															.pm3.take
													: "false",
										},
									},
									thursday: {
										am1: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.am1.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.am1.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.am1.take
													: "false",
										},
										am2: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.am2.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.am2.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.am2.take
													: "false",
										},
										am3: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.am3.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.am3.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.am3.take
													: "false",
										},
										pm1: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.pm1.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.pm1.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.pm1.take
													: "false",
										},
										pm2: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.pm2.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.pm2.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.pm2.take
													: "false",
										},
										pm3: {
											title:
												programData &&
												programData.length
													? programData[0].thursday
															.pm3.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].thursday
															.pm3.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].thursday
															.pm3.take
													: "false",
										},
									},
									friday: {
										am1: {
											title:
												programData &&
												programData.length
													? programData[0].friday.am1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.am1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.am1
															.take
													: "false",
										},
										am2: {
											title:
												programData &&
												programData.length
													? programData[0].friday.am2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.am2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.am2
															.take
													: "false",
										},
										am3: {
											title:
												programData &&
												programData.length
													? programData[0].friday.am3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.am3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.am3
															.take
													: "false",
										},
										pm1: {
											title:
												programData &&
												programData.length
													? programData[0].friday.pm1
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.pm1
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.pm1
															.take
													: "false",
										},
										pm2: {
											title:
												programData &&
												programData.length
													? programData[0].friday.pm2
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.pm2
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.pm2
															.take
													: "false",
										},
										pm3: {
											title:
												programData &&
												programData.length
													? programData[0].friday.pm3
															.title
													: null,
											time:
												programData &&
												programData.length
													? programData[0].friday.pm3
															.time
													: null,
											take:
												programData &&
												programData.length
													? programData[0].friday.pm3
															.take
													: "false",
										},
									},
								}}
								onSubmit={(values) => {
									axios
										.put(
											`http://localhost:5000/api/program/${updateID}`,
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
							>
								{({
									values,
									handleBlur,
									handleChange,
									handleSubmit,
								}) => (
									<form
										onSubmit={handleSubmit}
										className="new-program-form form"
									>
										<Field
											name="date"
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Tarih"
										/>
										<div className="days">
											<div className="program-day">
												<h3>Pazartesi</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`monday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`monday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`monday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`monday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Salı</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`tuesday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`tuesday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`tuesday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`tuesday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Çarşamba</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`wednesday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`wednesday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`wednesday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`wednesday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Perşembe</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`thursday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`thursday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`thursday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`thursday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
											<div className="program-day">
												<h3>Cuma</h3>
												{periods.map((x) => {
													return (
														<div>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`friday${x[0]}`}
																autocomplete="off"
																placeholder="Başlık"
															/>
															<Field
																onBlur={
																	handleBlur
																}
																onChange={
																	handleChange
																}
																name={`friday${x[1]}`}
																autocomplete="off"
																placeholder="Saat"
															/>
															<div>
																<label>
																	Boş
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`friday${x[2]}`}
																		autocomplete="off"
																		value="true"
																	/>
																</label>
																<label>
																	Dolu
																	<Field
																		type="radio"
																		onBlur={
																			handleBlur
																		}
																		onChange={
																			handleChange
																		}
																		name={`friday${x[2]}`}
																		autocomplete="off"
																		value="false"
																	/>
																</label>
															</div>
														</div>
													);
												})}
											</div>
										</div>
										<button type="submit">Gönder</button>
									</form>
								)}
							</Formik>
						</div>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-contact-item  admin-operation"
				onClick={() => {
					if (!open.appointments) {
						setOpen({
							...open,
							appointments: true,
						});
					}
				}}
			>
				Randevu İstekleri
				<Modal
					open={open.appointments}
					onClose={() => {
						setOpen({
							...open,
							appointments: false,
						});
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Randevu İstekleri
						</Typography>
						{appointmentData.map((x) => {
							var theDay = "";
							switch (x.day) {
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
								<div key={x._id} className="appo-req">
									<div>
										{" "}
										{x.firstname} {x.lastname}{" "}
									</div>
									<div> {x.email} </div>
									<div>
										{" "}
										{theDay} {x.time}{" "}
									</div>
								</div>
							);
						})}
						<button
							onClick={() => {
								axios
									.delete(
										"http://localhost:5000/api/appointment",
										{
											headers: {
												Authorization:
													"Bearer " + token,
											},
										}
									)
									.then((res) => {
										console.log(res.status);
									})
									.catch((err) => {
										console.log(err);
									});
							}}
							className="req-reset-btn"
						>
							Sıfırla
						</button>
					</Box>
				</Modal>
			</div>
		</div>
	);
}

export default Contact;
