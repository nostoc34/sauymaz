import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";

function Academic() {
	const {setCollapsed} = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, [])
	return <div>Academic</div>;
}

export default Academic;
