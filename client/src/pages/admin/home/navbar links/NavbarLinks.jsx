import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../../MainContext";
import axios from "axios";

function NavbarLinks() {
	const { token, activeLink, setActiveLink } = useContext(MainContext);
	const [navbarData, setNavbarData] = useState([]);

	const fetchNavbarData = () => {
		fetch("http://localhost:5000/api/navbar")
			.then((res) => {
				return res.json();
			})
			.then((APIData) => {
				setNavbarData(APIData.sort((a, b) => a.index - b.index));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchNavbarData();
	});
	return (
		<div>
			<div className="handle-navbar-item">
				<div>
					Anasayfa
				</div>
				<div>Aktif</div>
				<div
					style={{ background: activeLink.home ? "white" : "red" }}
					onClick={() => {
						setActiveLink({ ...activeLink, home: false });
						axios.delete(
							`http://localhost:5000/api/navbar/${navbarData[0]._id}`,
							{
								headers: {
									Authorization: "Bearer " + token,
								},
							}
						);
					}}
				>
					Pasif
				</div>
			</div>

			<div className="handle-navbar-item">
				<div>
					Hakkımda
				</div>
				<div>Aktif</div>
				<div
					style={{ background: activeLink.about ? "white" : "red" }}
					onClick={() => {
						setActiveLink({ ...activeLink, about: false });
						axios.delete(
							`http://localhost:5000/api/navbar/${navbarData[1]._id}`,
							{
								headers: {
									Authorization: "Bearer " + token,
								},
							}
						);
					}}
				>
					Pasif
				</div>
			</div>

			<div className="handle-navbar-item">
				<div>
					Blog
				</div>
				<div>Aktif</div>
				<div
					style={{ background: activeLink.blog ? "white" : "red" }}
					onClick={() => {
						setActiveLink({ ...activeLink, blog: false });
						axios.delete(
							`http://localhost:5000/api/navbar/${navbarData[2]._id}`,
							{
								headers: {
									Authorization: "Bearer " + token,
								},
							}
						);
					}}
				>
					Pasif
				</div>
			</div>

			<div className="handle-navbar-item">
				<div>
					İletişim
				</div>
				<div>Aktif</div>
				<div
					style={{ background: activeLink.contact ? "white" : "red" }}
					onClick={() => {
						setActiveLink({ ...activeLink, contact: false });
						axios.delete(
							`http://localhost:5000/api/navbar/${navbarData[3]._id}`,
							{
								headers: {
									Authorization: "Bearer " + token,
								},
							}
						);
					}}
				>
					Pasif
				</div>
			</div>
		</div>
	);
}

export default NavbarLinks;
