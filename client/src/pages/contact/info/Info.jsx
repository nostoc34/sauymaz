import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./info.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Info() {
	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/contact")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setData(APIData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
		console.log(data);
	}, []);

	return (
		<>
			{data && data.length ? (
				<div className="info frame">
					<div className="info-box">
						<div className="info-title">
							<h5>Telefon:</h5>
						</div>
						<div className="info-content">
							<span> {data[0].phone} </span>
						</div>
					</div>
					<div className="info-box">
						<div className="info-title">
							<h5>Fax:</h5>
						</div>
						<div className="info-content">
							<span> {data[0].fax} </span>
						</div>
					</div>
					<div className="info-box">
						<div className="info-title">
							<h5>Email:</h5>
						</div>
						<div className="info-content">
							<span> {data[0].email} </span>
						</div>
					</div>
					<div className="info-box">
						<div className="info-title">
							<h5>Adres:</h5>
						</div>
						<div className="info-content">
							<span> {data[0].adress} </span>
						</div>
					</div>
					<div className="socials">
						<a href={data[0].instagram} target="_blank" rel="noreferrer">
							{" "}
							<InstagramIcon />{" "}
						</a>
						<a href={data[0].twitter} target="_blank" rel="noreferrer">
							<TwitterIcon />
						</a>
						<a href={data[0].linkedin} target="_blank" rel="noreferrer">
							<LinkedInIcon />
						</a>
					</div>
				</div>
			) : null}
		</>
	);
}

export default Info;
