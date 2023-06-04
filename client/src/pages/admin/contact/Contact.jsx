import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { Formik, Field } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
function Contact() {
	const { token } = useContext(MainContext);

	const [contactData, setContactData] = useState([]);
	const fetchData = () => {
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

	useEffect(() => {
		fetchData();
	}, []);

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

	const [open, setOpen] = useState(false);

	return (
		<div className="admin-contact admin-section">
			<div
				className="admin-contact-item  admin-operation"
				onClick={() => {
					if (!open) {
						setOpen(true);
					}
				}}
			>
				İletişim Bilgileri Güncelle
				<Modal
					open={open}
					onClose={() => {
						setOpen(false);
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
											<form onSubmit={handleSubmit}>
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
		</div>
	);
}

export default Contact;
