import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";
import "./home.scss";

import About from "./about/About";
import Announcements from "./announcement/Announcements";
import Blog from "./blog/Blog";

function Home() {
	const { setCollapsed } = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, []);

	return (
		<div className="home">
			<About />
			<div className="right-block">
				<Announcements />
				<Blog />
			</div>
		</div>
	);
}

export default Home;
