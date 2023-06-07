import React, { useEffect, useState, useContext } from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MainContext from "../../MainContext";

function Navbar() {
	const { isCollapsed, setCollapsed, links } = useContext(MainContext);

	const [linkData, setLinkData] = useState([]);
	const [userData, setUserData] = useState([]);

	const fetchLinkData = () => {
		fetch("http://localhost:5000/api/navbar")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setLinkData(APIData.sort((a, b) => a.index - b.index));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchUserData = () => {
		fetch("http://localhost:5000/api/user")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setUserData(APIData.reverse());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchLinkData();
		fetchUserData();
	}, []);

	function handleClick() {
		setCollapsed(!isCollapsed);
	}

	return (
		<div className="nav-container">
			<div className="navbar">
				<div className="logo">
					<NavLink to="/">{userData && userData.length ? userData[0].name : ""}</NavLink>
				</div>
				<div
					className={`links ${
						isCollapsed ? "links-collapsed" : "links-uncollapsed"
					}`}
				>
					{linkData.map((x) => {
						return x.isActive === "true" ? (
							<NavLink
								key={x.index}
								to={x.to}
								className={({ isActive }) =>
									isActive ? "active" : ""
								}
							>
								<div className="link">{x.title}</div>
							</NavLink>
						) : null;
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
