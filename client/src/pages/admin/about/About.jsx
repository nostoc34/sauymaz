import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { Formik, Field } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropzone from "react-dropzone";

import EduAcaFrame from "./eduaca frame/EduAcaFrame";
import AcaLinkFrame from "./acalink frame/AcaLinkFrame";

function About() {
	const { token } = useContext(MainContext);

	const [profileData, setProfileData] = useState([]);
	const fetchProfileData = () => {
		fetch("http://localhost:5000/api/about-profile")
			.then((response) => {
				return response.json();
			})
			.then((APIdata) => {
				setProfileData(APIdata);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const [eduData, setEduData] = useState([]);
	const fetchEduData = () => {
		fetch("http://localhost:5000/api/education")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setEduData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [acaPastData, setAcaPastData] = useState([]);
	const fetchAcaPastData = () => {
		fetch("http://localhost:5000/api/academic")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setAcaPastData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [acaLinkData, setAcaLinkData] = useState([]);
	const fetchAcaLinkData = () => {
		fetch("http://localhost:5000/api/academic-link")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setAcaLinkData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchProfileData();
		fetchEduData();
		fetchAcaPastData();
		fetchAcaLinkData();
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

	const [open, setOpen] = useState({
		updateProfile: false,
		newEd: false,
		updateEd: false,
		newAcaPast: false,
		updateAcaPast: false,
		newAcaLink: false,
		updateAcaLink: false,
	});

	const profileFormSubmit = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		if (values.picture) {
			formData.append("picturePath", values.picture.name);
		}
		fetch(`http://localhost:5000/api/about-profile/${profileData[0]._id}`, {
			method: "PUT",
			body: formData,
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				console.log(res.status);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="admin-about admin-section">
			<div
				className="admin-about-item admin-operation"
				onClick={() => {
					if (!open.updateProfile) {
						setOpen({ ...open, updateProfile: true });
					}
				}}
			>
				Profili Güncelle
				<Modal
					open={open.updateProfile}
					onClose={() => {
						setOpen({ ...open, updateProfile: false });
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
							Profili Güncelle
						</Typography>
						<Formik
							onSubmit={profileFormSubmit}
							initialValues={{
								title:
									profileData && profileData.length
										? profileData[0].title
										: "",
								content:
									profileData && profileData.length
										? profileData[0].content
										: "",
								picture: "",
							}}
						>
							{({
								values,
								handleBlur,
								handleChange,
								handleSubmit,
								setFieldValue,
							}) => (
								<form onSubmit={handleSubmit}>
									<div className="form-content">
										<div className="img-section">
											<Dropzone
												acceptedFiles=".jpg, .jpeg, .png"
												multiple={false}
												onDrop={(acceptedFiles) =>
													setFieldValue(
														"picture",
														acceptedFiles[0]
													)
												}
											>
												{({
													getRootProps,
													getInputProps,
												}) => (
													<div
														className="img-input"
														{...getRootProps()}
													>
														<div
															{...getInputProps}
														/>
														{!values.picture ? (
															<p>Resim Ekle</p>
														) : (
															values.picture.name
														)}
													</div>
												)}
											</Dropzone>
										</div>
										<div className="profile-content">
											<Field
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.title}
												name="title"
											/>
											<Field
												as="textarea"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.content}
												name="content"
											/>
										</div>
									</div>
									<button type="submit">Güncelle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.newEd) {
						setOpen({ ...open, newEd: true });
					}
				}}
			>
				Yeni Eğitim Bilgisi Kaydı
				<Modal
					open={open.newEd}
					onClose={() => {
						setOpen({ ...open, newEd: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Formik
							onSubmit={(values, onSubmitProps) => {
								axios
									.post(
										"http://localhost:5000/api/education",
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
									})
									.finally(() => {
										onSubmitProps.resetForm();
									});
							}}
							initialValues={{
								title: "",
								subtitle: "",
								major: "",
								from: "",
								to: "",
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
										value={values.title}
										name="title"
										autocomplete="off"
										placeholder="Okul"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.subtitle}
										name="subtitle"
										autocomplete="off"
										placeholder="Bölüm"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.major}
										name="major"
										autocomplete="off"
										placeholder="Alan"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.from}
										name="from"
										autocomplete="off"
										placeholder="Şu Yıldan"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.to}
										name="to"
										autocomplete="off"
										placeholder="Şu Yıla"
									/>

									<button type="submit">Ekle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.updateEd) {
						setOpen({ ...open, updateEd: true });
					}
				}}
			>
				Eğitim Bilgisi Kaydı Güncelle
				<Modal
					open={open.updateEd}
					onClose={() => {
						setOpen({ ...open, updateEd: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{eduData.map((x) => {
							return (
								<EduAcaFrame
									key={x._id}
									id={x._id}
									title={x.title}
									subtitle={x.subtitle}
									major={x.major}
									from={x.from}
									to={x.to}
									api="education"
								/>
							);
						})}
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.newAcaPast) {
						setOpen({ ...open, newAcaPast: true });
					}
				}}
			>
				Yeni Akademik Geçmiş Kaydı
				<Modal
					open={open.newAcaPast}
					onClose={() => {
						setOpen({ ...open, newAcaPast: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Formik
							onSubmit={(values, onSubmitProps) => {
								axios
									.post(
										"http://localhost:5000/api/academic",
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
									})
									.finally(() => {
										onSubmitProps.resetForm();
									});
							}}
							initialValues={{
								title: "",
								subtitle: "",
								major: "",
								from: "",
								to: "",
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
										value={values.title}
										name="title"
										autocomplete="off"
										placeholder="Ünvan"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.subtitle}
										name="subtitle"
										autocomplete="off"
										placeholder="Okul"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.major}
										name="major"
										autocomplete="off"
										placeholder="Bölüm"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.from}
										name="from"
										autocomplete="off"
										placeholder="Şu Yıldan"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.to}
										name="to"
										autocomplete="off"
										placeholder="Şu Yıla"
									/>

									<button type="submit">Ekle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.updateAcaPast) {
						setOpen({ ...open, updateAcaPast: true });
					}
				}}
			>
				Akademik Geçmiş Kaydı Güncelle
				<Modal
					open={open.updateAcaPast}
					onClose={() => {
						setOpen({ ...open, updateAcaPast: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{acaPastData.map((x) => {
							return (
								<EduAcaFrame
									key={x._id}
									id={x._id}
									title={x.title}
									subtitle={x.subtitle}
									major={x.major}
									from={x.from}
									to={x.to}
									api="academic"
								/>
							);
						})}
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.newAcaLink) {
						setOpen({ ...open, newAcaLink: true });
					}
				}}
			>
				Yeni Akademik Link
				<Modal
					open={open.newAcaLink}
					onClose={() => {
						setOpen({ ...open, newAcaLink: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Formik
							onSubmit={(values, onSubmitProps) => {
								axios
									.post(
										"http://localhost:5000/api/academic-link",
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
									})
									.finally(() => {
										onSubmitProps.resetForm();
									});
							}}
							initialValues={{
								title: "",
								link: "",
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
										value={values.title}
										name="title"
										autocomplete="off"
										placeholder="Başlık"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.link}
										name="link"
										autocomplete="off"
										placeholder="Link"
									/>

									<button type="submit">Ekle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-about-item  admin-operation"
				onClick={() => {
					if (!open.updateAcaLink) {
						setOpen({ ...open, updateAcaLink: true });
					}
				}}
			>
				Akademik Link Güncelle-Sil
				<Modal
					open={open.updateAcaLink}
					onClose={() => {
						setOpen({ ...open, updateAcaLink: false });
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{acaLinkData.map((x) => {
							return (
								<AcaLinkFrame
									key={x._id}
									id={x._id}
									title={x.title}
									link={x.link}
									delete={() => {
										axios
											.delete(
												`http://localhost:5000/api/academic-link/${x._id}`,
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
									update={(values) => {
										axios
											.put(
												`http://localhost:5000/api/academic-link/${x._id}`,
												values,
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
								/>
							);
						})}
					</Box>
				</Modal>
			</div>
		</div>
	);
}

export default About;
