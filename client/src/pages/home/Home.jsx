import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";

function Home() {
	const {setCollapsed} = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, [])
	return <div>Home</div>;
}

export default Home;
