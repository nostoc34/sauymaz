import React, { useState, useEffect } from "react";
import "./weekly.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { Form, Formik, Field, useFormik } from "formik";
import axios from "axios";

function Weekly() {
	const [data, setData] = useState([]);

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
	const [targetID, setTargetID] = useState("");
	
	useEffect(() => {
		for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
			if (document.getElementsByTagName("input")[i].checked === true) {
				setTargetID(document.getElementsByTagName("input")[i].id);
			}
		}
	},)

	return (
		<div className="frame weekly" onClick={handleOpen}>
			<h1>deneme </h1>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Formik
						initialValues={{
							firstname: "",
							lastname: "",
							email: "",
							date: "",
							[targetID]: "",
						}}
						onSubmit={(values) => {
							console.log(values);
						}}
					>
						{(props) => (
							<div>
								<Form>
									<div className="program-cont">
										<div className="program">
											<div className="monday day">
												<div className="date-box">
													Pazartesi
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monAm1"
															value={
																data &&
																data[0].monAm1
																	? data[0]
																			.monAm1
																	: "Dolu"
															}
															disabled={
																!data[0].monAm1
															}
														/>
														{data && data[0].monAm1
															? data[0].monAm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monAm"
															value={
																data &&
																data[0].monAm2
																	? data[0]
																			.monAm2
																	: "Dolu"
															}
															disabled={
																!data[0].monAm2
															}
														/>
														{data && data[0].monAm2
															? data[0].monAm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monAm3"
															value={
																data &&
																data[0].monAm3
																	? data[0]
																			.monAm3
																	: "Dolu"
															}
															disabled={
																!data[0].monAm3
															}
														/>
														{data && data[0].monAm3
															? data[0].monAm3
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monPm1"
															value={
																data &&
																data[0].monPm1
																	? data[0]
																			.monPm1
																	: "Dolu"
															}
															disabled={
																!data[0].monPm1
															}
														/>
														{data && data[0].monPm1
															? data[0].monPm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monPm2"
															value={
																data &&
																data[0].monPm2
																	? data[0]
																			.monPm2
																	: "Dolu"
															}
															disabled={
																!data[0].monPm2
															}
														/>
														{data && data[0].monPm2
															? data[0].monPm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															id="monPm3"
															value={
																data &&
																data[0].monPm3
																	? data[0]
																			.monPm3
																	: "Dolu"
															}
															disabled={
																!data[0].monPm3
															}
														/>
														{data && data[0].monPm3
															? data[0].monPm3
															: "Dolu"}
													</label>
												</div>
											</div>
											<div className="tuesday day">
												<div className="date-box">
													Salı
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesAm1
																	? data[0]
																			.tuesAm1
																	: "Dolu"
															}
															disabled={
																!data[0].tuesAm1
															}
														/>
														{data && data[0].tuesAm1
															? data[0].tuesAm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesAm2
																	? data[0]
																			.tuesAm2
																	: "Dolu"
															}
															disabled={
																!data[0].tuesAm2
															}
														/>
														{data && data[0].tuesAm2
															? data[0].tuesAm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesAm3
																	? data[0]
																			.tuesAm3
																	: "Dolu"
															}
															disabled={
																!data[0].tuesAm3
															}
														/>
														{data && data[0].tuesAm3
															? data[0].tuesAm3
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesPm1
																	? data[0]
																			.tuesPm1
																	: "Dolu"
															}
															disabled={
																!data[0].tuesPm1
															}
														/>
														{data && data[0].tuesPm1
															? data[0].tuesPm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesPm2
																	? data[0]
																			.tuesPm2
																	: "Dolu"
															}
															disabled={
																!data[0].tuesPm2
															}
														/>
														{data && data[0].tuesPm2
															? data[0].tuesPm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].tuesPm3
																	? data[0]
																			.tuesPm3
																	: "Dolu"
															}
															disabled={
																!data[0].tuesPm3
															}
														/>
														{data && data[0].tuesPm3
															? data[0].tuesPm3
															: "Dolu"}
													</label>
												</div>
											</div>
											<div className="wednesday day">
												<div className="date-box">
													Çarşamba
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesAm1
																	? data[0]
																			.wednesAm1
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesAm1
															}
														/>
														{data &&
														data[0].wednesAm1
															? data[0].wednesAm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesAm2
																	? data[0]
																			.wednesAm2
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesAm2
															}
														/>
														{data &&
														data[0].wednesAm2
															? data[0].wednesAm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesAm3
																	? data[0]
																			.wednesAm3
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesAm3
															}
														/>
														{data &&
														data[0].wednesAm3
															? data[0].wednesAm3
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesPm1
																	? data[0]
																			.wednesPm1
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesPm1
															}
														/>
														{data &&
														data[0].wednesPm1
															? data[0].wednesPm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesPm2
																	? data[0]
																			.wednesPm2
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesPm2
															}
														/>
														{data &&
														data[0].wednesPm2
															? data[0].wednesPm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0]
																	.wednesPm3
																	? data[0]
																			.wednesPm3
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.wednesPm3
															}
														/>
														{data &&
														data[0].wednesPm3
															? data[0].wednesPm3
															: "Dolu"}
													</label>
												</div>
											</div>
											<div className="thursday day">
												<div className="date-box">
													Perşembe
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursAm1
																	? data[0]
																			.thursAm1
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursAm1
															}
														/>
														{data &&
														data[0].thursAm1
															? data[0].thursAm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursAm2
																	? data[0]
																			.thursAm2
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursAm2
															}
														/>
														{data &&
														data[0].thursAm2
															? data[0].thursAm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursAm3
																	? data[0]
																			.thursAm3
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursAm3
															}
														/>
														{data &&
														data[0].thursAm3
															? data[0].thursAm3
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursPm1
																	? data[0]
																			.thursPm1
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursPm1
															}
														/>
														{data &&
														data[0].thursPm1
															? data[0].thursPm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursPm2
																	? data[0]
																			.thursPm2
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursPm2
															}
														/>
														{data &&
														data[0].thursPm2
															? data[0].thursPm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].thursPm3
																	? data[0]
																			.thursPm3
																	: "Dolu"
															}
															disabled={
																!data[0]
																	.thursPm3
															}
														/>
														{data &&
														data[0].thursPm3
															? data[0].thursPm3
															: "Dolu"}
													</label>
												</div>
											</div>
											<div className="friday day">
												<div className="date-box">
													Cuma
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friAm1
																	? data[0]
																			.friAm1
																	: "Dolu"
															}
															disabled={
																!data[0].friAm1
															}
														/>
														{data && data[0].friAm1
															? data[0].friAm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friAm2
																	? data[0]
																			.friAm2
																	: "Dolu"
															}
															disabled={
																!data[0].friAm2
															}
														/>
														{data && data[0].friAm2
															? data[0].friAm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friAm3
																	? data[0]
																			.friAm3
																	: "Dolu"
															}
															disabled={
																!data[0].friAm3
															}
														/>
														{data && data[0].friAm3
															? data[0].friAm3
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friPm1
																	? data[0]
																			.friPm1
																	: "Dolu"
															}
															disabled={
																!data[0].friPm1
															}
														/>
														{data && data[0].friPm1
															? data[0].friPm1
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friPm2
																	? data[0]
																			.friPm2
																	: "Dolu"
															}
															disabled={
																!data[0].friPm2
															}
														/>
														{data && data[0].friPm2
															? data[0].friPm2
															: "Dolu"}
													</label>
												</div>
												<div className="date-box">
													<label>
														<Field
															type="radio"
															name="date"
															value={
																data &&
																data[0].friPm3
																	? data[0]
																			.friPm3
																	: "Dolu"
															}
															disabled={
																!data[0].friPm3
															}
														/>
														{data && data[0].friPm3
															? data[0].friPm3
															: "Dolu"}
													</label>
												</div>
											</div>
										</div>
										<div className="program-form">
											<Field
												name="firstname"
												placeholder="Ad"
											/>
											<Field
												name="lastname"
												placeholder="Soyad"
											/>
											<Field
												type="email"
												name="email"
												placeholder="Email"
											/>
											<Field
												name={targetID}
												style={{ display: "none" }}
												value=""
											/>
											<button type="submit">
												Gönder
											</button>
										</div>
									</div>
								</Form>
							</div>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	);
}

export default Weekly;
