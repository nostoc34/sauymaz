import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useContext } from "react";
import MainContext from "../../MainContext";

function Navbar() {
	const list = [
		{ to: "/", title: "Anasayfa", id: "homelink" },
		{ to: "/hakkimda", title: "Hakkımda", id: "aboutlink" },
		{ to: "/akademik", title: "Akademik", id: "acalink" },
		{ to: "/blog", title: "Blog", id: "bloglink" },
		{ to: "/iletisim", title: "İletişim", id: "contactlink" },
	];

	const {isCollapsed, setCollapsed} = useContext(MainContext);	

	function handleClick() {
		setCollapsed(!isCollapsed);
	}

	return (
		<div className="nav-container">
			<div className="navbar">
				<div className="logo">
					<span>S</span>AİT <span>A</span>Lİ <span>U</span>YMAZ
				</div>
				<div className={`links ${isCollapsed ? "links-collapsed" : "links-uncollapsed"}`}>
					{list.map((sa) => {
						return (
							<NavLink
								id={sa.id}
								key={sa.id}
								to={sa.to}
								className={({ isActive }) =>
									isActive ? "active" : ""
								}
							>
								<div className="link">{sa.title}</div>
							</NavLink>
						);
					})}
				</div>
				<div className="hamb-menu"  onClick={handleClick}>
					<GiHamburgerMenu />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
