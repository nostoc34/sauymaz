import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik, Field } from "formik";

function AcaLinkFrame(props) {
	const [open, setOpen] = useState(false);

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
				onClick={(e) => {
					if (!open) {
						setOpen(true);
					}
				}}
			>
				<div className="ud-title">{props.title}</div>

				<Modal
					open={open}
					onClose={() => {
						setOpen(false);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Formik
							onSubmit={props.update}
							initialValues={{
								title: props.title,
								link: props.link,
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
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.title}
										name="title"
									/>
									<Field
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.link}
										name="link"
									/>
									<button type="submit">Güncelle</button>
								</form>
							)}
						</Formik>
					</Box>
				</Modal>
			</div>
			<button className="delete-button" onClick={props.delete}>Sil</button>
		</>
	);
}

export default AcaLinkFrame;
