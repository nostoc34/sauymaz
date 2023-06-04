import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { Formik, Field } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropzone from "react-dropzone";

import AnnouncementFrame from "./announcement frame/AnnouncementFrame";
import NavbarLinks from "./navbar links/NavbarLinks";

function Home() {
	const { token } = useContext(MainContext);

	const [userData, setUserData] = useState([]);
	const fetchUserData = () => {
		fetch("http://localhost:5000/api/user")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setUserData(APIData.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [profileData, setProfileData] = useState([]);
	const fetchProfileData = () => {
		fetch("http://localhost:5000/api/home-profile")
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

	const [announceData, setAnnounceData] = useState([]);
	const fetchAnnounceData = () => {
		fetch("http://localhost:5000/api/announcement")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setAnnounceData(APIData.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchUserData();
		fetchProfileData();
		fetchAnnounceData();
	}, []);
	useEffect(() => {
		fetchAnnounceData();
	}, [announceData]);

	const profileFormSubmit = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		if (values.picture) {
			formData.append("picturePath", values.picture.name);
		}
		fetch(`http://localhost:5000/api/home-profile/${profileData[0]._id}`, {
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

	const newAnnouncementSubmit = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);
		axios
			.post("http://localhost:5000/api/announcement", formData, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((res) => {
				console.log(res.status);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				onSubmitProps.resetForm();
			});
	};

	const [open, setOpen] = useState({
		newUser: false,
		userUpdate: false,
		navbar: false,
		updateProfile: false,
		newAnnouncement: false,
		handleAnnouncement: false,
	});

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
	return (
		<div className="admin-home admin-section">

			<div
				className="admin-home-item admin-operation"
				onClick={() => {
					if (!open.newUser) {
						setOpen({ ...open, newUser: true });
					}
				}}
			>
				Yeni Kullanıcı
				<Modal
					open={open.newUser}
					onClose={() => {
						setOpen({ ...open, newUser: false });
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
							Yeni Kullanıcı
						</Typography>
						<Formik
							onSubmit={(values, onSubmitProps) => {
								axios
									.post(
										"http://localhost:5000/api/user",
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
								name: "",
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
										value={values.name}
										name="name"
										autocomplete="off"
									/>

									<button type="submit">Ekle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-home-item  admin-operation"
				onClick={() => {
					if (!open.userUpdate) {
						setOpen({ ...open, userUpdate: true });
					}
				}}
			>
				Kullanıcı Güncelle
				<Modal
					open={open.userUpdate}
					onClose={() => {
						setOpen({ ...open, userUpdate: false });
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
							Kullanıcı Güncelle
						</Typography>
						<Formik
							onSubmit={(values, onSubmitProps) => {
								axios
									.put(
										`http://localhost:5000/api/user/${userData[0]._id}`,
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
								name:
									userData && userData.length
										? userData[0].name
										: "",
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
										value={values.name}
										name="name"
										autocomplete="off"
									/>

									<button type="submit">Güncelle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-home-item  admin-operation"
				onClick={() => {
					if (!open.navbar) {
						setOpen({ ...open, navbar: true });
					}
				}}
			>
				Navbar
				<Modal
					open={open.navbar}
					onClose={() => {
						setOpen({ ...open, navbar: false });
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
							Navbar
						</Typography>
						{/* <NavbarLinks /> */}
					</Box>
				</Modal>
			</div>

			<div
				className="admin-home-item  admin-operation"
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
												as="textarea"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.content}
												name="content"
												placeholder="İçerik"
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
				className="admin-home-item  admin-operation"
				onClick={() => {
					if (!open.newAnnouncement) {
						setOpen({ ...open, newAnnouncement: true });
					}
				}}
			>
				Yeni Duyuru
				<Modal
					open={open.newAnnouncement}
					onClose={() => {
						setOpen({ ...open, newAnnouncement: false });
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
							Yeni Duyuru
						</Typography>
						<Formik
							onSubmit={newAnnouncementSubmit}
							initialValues={{
								title: "",
								content: "",
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
										<div>
											<Field
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.title}
												name="title"
												placeholder="Başlık"
											/>
											<Field
												as="textarea"
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.content}
												name="content"
												placeholder="İçerik"
											/>
										</div>
									</div>
									<button type="submit">Ekle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>

			<div
				className="admin-home-item  admin-operation"
				onClick={() => {
					if (!open.handleAnnouncement) {
						setOpen({ ...open, handleAnnouncement: true });
					}
				}}
			>
				Duyuru Güncelle-Sil
				<Modal
					open={open.handleAnnouncement}
					onClose={() => {
						setOpen({ ...open, handleAnnouncement: false });
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
							Duyuru Güncelle-Sil
						</Typography>
						{announceData.map((x) => {
							return (
								<AnnouncementFrame
									key={x._id}
									id={x._id}
									title={x.title}
									content={x.content}
									delete={() => {
										axios
											.delete(
												`http://localhost:5000/api/announcement/${x._id}`,
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
									update={async (values, onSubmitProps) => {
										const formData = new FormData();
										for (let value in values) {
											formData.append(
												value,
												values[value]
											);
										}
										if (values.picture) {
											formData.append(
												"picturePath",
												values.picture.name
											);
										}
										axios
											.put(
												`http://localhost:5000/api/announcement/${x._id}`,
												formData,
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

export default Home;
