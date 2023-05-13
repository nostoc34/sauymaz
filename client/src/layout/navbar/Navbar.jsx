import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
	const list = [
		{ to: "/", title: "Anasayfa" },
		{ to: "/hakkimda", title: "Hakkımda" },
		{ to: "/akademik", title: "Akademik" },
		{ to: "/blog", title: "Blog" },
		{ to: "/iletisim", title: "İletişim" },
	];
	return (
		<div className="navbar">
			<div className="logo">
				<span>S</span>AİT <span>A</span>Lİ <span>U</span>YMAZ
			</div>
			<div className="links">
				{list.map((sa) => {
					return (
						<NavLink
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
		</div>
	);
}

export default Navbar;
