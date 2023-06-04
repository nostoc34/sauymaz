import React, { useState } from "react";
import "./announcement.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useMediaQuery from '@mui/material/useMediaQuery';

function Announcement(props) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		if (!open) {
			setOpen(true);
		}
	};
	const handleClose = () => setOpen(false);

	const isMobile = useMediaQuery('(max-width:450px)');

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		fontWeight: 400,
		width: isMobile ? 300 : null,
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
		<div>
			<div className="announcement frame-w" onClick={handleOpen}>
				<div className="date">{props.date}</div>
				<div className="vr"></div>
				<div className="title">{props.title}</div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<img className="announce-img" style={{width: isMobile ? "200px" : "400px"}} src={props.picturePath} alt="duyuru-banner" />
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							{props.title}
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2, fontSize: isMobile ? "12px" : "16px" }}>
							{props.content}
						</Typography>
					</Box>
				</Modal>
			</div>
		</div>
	);
}

export default Announcement;
