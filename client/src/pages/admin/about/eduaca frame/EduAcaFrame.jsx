import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik, Field } from "formik";
import axios from "axios";
import MainContext from "../../../../MainContext";
import "./eduacaframe.scss";

function EduAcaFrame(props) {
	const { token } = useContext(MainContext);

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
		<div
			className="edu-aca-update"
			onClick={() => {
				if (!open) {
					setOpen(true);
				}
			}}
		>
			<div>{props.title}</div>
			<div>{props.subtitle}</div>
			<div>{props.major}</div>
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
						onSubmit={(values, onSubmitProps) => {
							axios
								.put(
									`http://localhost:5000/api/${props.api}/${props.id}`,
									values,
									{
										headers: {
											Authorization: "Bearer " + token,
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
							title: props.title,
							subtitle: props.subtitle,
							major: props.major,
							from: props.from,
							to: props.to,
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
									autocomplete="off"
								/>
								<Field
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.subtitle}
									name="subtitle"
									autocomplete="off"
								/>
								<Field
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.major}
									name="major"
									autocomplete="off"
								/>
								<Field
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.from}
									name="from"
									autocomplete="off"
								/>
								<Field
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.to}
									name="to"
									autocomplete="off"
								/>

								<button type="submit">Güncelle</button>
							</form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	);
}

export default EduAcaFrame;
