import React, { useEffect, useState, useContext } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MainContext from "../../MainContext";

function Navbar() {

	const { isCollapsed, setCollapsed } = useContext(MainContext);

	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/navbar")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setData(APIData.sort((a, b) => a.index - b.index));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	function handleClick() {
		setCollapsed(!isCollapsed);
	}

	return (
		<div className="nav-container">
			<div className="navbar">
				<div className="logo">
					<span>S</span>AİT <span>A</span>Lİ <span>U</span>YMAZ
				</div>
				<div
					className={`links ${
						isCollapsed ? "links-collapsed" : "links-uncollapsed"
					}`}
				>
					{data.map((x) => {
						return (
							<NavLink
								key={x.index}
								to={x.to}
								className={({ isActive }) =>
									isActive ? "active" : ""
								}
							>
								<div className="link">{x.title}</div>
							</NavLink>
						);
					})}
				</div>
				<div className="hamb-menu" onClick={handleClick}>
					<GiHamburgerMenu />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
