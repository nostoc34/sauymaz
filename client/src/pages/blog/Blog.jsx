import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../MainContext";

function Blog() {
	const {setCollapsed} = useContext(MainContext);

	useEffect(() => {
		setCollapsed(false);
	}, [])
	return <div>Blog</div>;
}

export default Blog;
