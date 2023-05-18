import React, { useEffect, useState } from "react";
import "./blog.scss";
import Entry from "./Entry";

function Blog() {
	const [data, setData] = useState([]);
	const fetchData = () => {
		fetch("http://localhost:5000/api/blog")
			.then((response) => {
				return response.json();
			})
			.then((APIdata) => {
				setData(APIdata);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		fetchData();
		
	}, []);

	const options = { day: "numeric", month: "numeric", year: "numeric" };
	return (
		<div className="home-blog frame">
			<div className="title">
				<h3>BLOG</h3>
			</div>
			<div className="hr">
				<div className="circle"></div>
				<div className="line"></div>
				<div className="circle"></div>
			</div>
			<div className="entries">
                {data.reverse().filter((item, index) => index < 2).map((x) => {
					const publishDate = new Date(
						x.createdAt
					).toLocaleDateString("tr-TR", options);
                    return <Entry 
                        key = {x._id}
                        id = {x._id}
                        title = {x.title}
                        content = {x.content.slice(0,150) + "..."}
                        date = {publishDate}
                    />
                })}
            </div>
		</div>
	);
}

export default Blog;
