import React, { useEffect, useContext, useState } from "react";
import MainContext from "../../MainContext";
import "./admin.scss";
import Home from "./home/Home";
import About from "./about/About";
import Blog from "./blog/Blog";
import Contact from "./contact/Contact";

function Admin() {
	const { setAdminPage, setLoggedIn } = useContext(MainContext);

	useEffect(() => {
		setAdminPage(true);
	});


	return (
		<div id="admin-cont">
			<div className="admin-navbar">
				<div className="admin-logo">
					<h3>Admin Paneli</h3>
				</div>
				<div className="sections">
					<div
						className="section-item"
						onClick={() => {
							setLoggedIn(false);
						}}
					>
						Çıkış Yap
					</div>
				</div>
			</div>
			<div className="admin-panel">
				<h2>Anasayfa</h2>
				<Home />
				<hr />
				<h2>Hakkımda</h2>
				<About />
				<hr />
				<h2>Blog</h2>
				<Blog />
				<hr />
				<h2>İletişim</h2>
				<Contact />
			</div>
		</div>
	);
}

export default Admin;
