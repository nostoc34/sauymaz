import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik, Field } from "formik";
import Dropzone from "react-dropzone";

function AnnouncementFrame(props) {
	const [announceOpen, setAnnounceOpen] = useState(false);

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
		<>
			<div
				className="update-delete"
				id={props.id}
				onClick={() => {
					if (!announceOpen) {
						setAnnounceOpen(true);
					}
				}}
			>
				<div className="ud-title">{props.title}</div>

				<Modal
					open={announceOpen}
					onClose={() => {
						setAnnounceOpen(false);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Formik
							onSubmit={props.update}
							initialValues={{
								title: props.title,
								content: props.content,
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
								<form onSubmit={handleSubmit} className="form">
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
										{({ getRootProps, getInputProps }) => (
											<div
												className="img-input"
												{...getRootProps()}
											>
												<div {...getInputProps} />
												{!values.picture ? (
													<p>Resim Ekle</p>
												) : (
													values.picture.name
												)}
											</div>
										)}
									</Dropzone>
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
									<button type="submit">Güncelle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>
			<button className="delete-button" onClick={props.delete}>
				Sil
			</button>
		</>
	);
}

export default AnnouncementFrame;
