import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { Formik, Field } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropzone from "react-dropzone";

import BlogFrame from "./blog frame/BlogFrame";

function Blog() {
	const { token } = useContext(MainContext);

	const [blogData, setBlogData] = useState([]);
	const fetchBlogData = () => {
		fetch("http://localhost:5000/api/blog")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setBlogData(APIData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchBlogData();
	}, []);

	const [open, setOpen] = useState({
		newBlog: false,
		updateBlog: false,
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

	const newBlogSubmit = async (values, onSubmitProps) => {
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append("picturePath", values.picture.name);
		axios
			.post("http://localhost:5000/api/blog", formData, {
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

	return (
		<div className="admin-blog admin-section">
			<div
				className="admin-blog-item  admin-operation"
				onClick={() => {
					if (!open.newBlog) {
						setOpen({ ...open, newBlog: true });
					}
				}}
			>
				Yeni Blog
				<Modal
					open={open.newBlog}
					onClose={() => {
						setOpen({ ...open, newBlog: false });
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
							onSubmit={newBlogSubmit}
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
				className="admin-blog-item  admin-operation"
				onClick={() => {
					if (!open.updateBlog) {
						setOpen({ ...open, updateBlog: true });
					}
				}}
			>
				Blog Güncelle-Sil
				<Modal
					open={open.updateBlog}
					onClose={() => {
						setOpen({ ...open, updateBlog: false });
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
							Blog Güncelle-Sil
						</Typography>
						{blogData.map((x) => {
							return (
								<BlogFrame
									key={x._id}
									id={x._id}
									title={x.title}
									content={x.content}
								/>
							);
						})}
					</Box>
				</Modal>
			</div>
		</div>
	);
}

export default Blog;
