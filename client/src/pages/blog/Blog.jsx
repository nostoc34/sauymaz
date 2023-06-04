import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../MainContext";
import Header from "../../layout/header/Header";
import lo from "lodash";
import "./blog.scss";
import { useNavigate } from "react-router-dom";

function Blog() {
	const { setCollapsed, setBlogId } = useContext(MainContext);
	const navigate = useNavigate();

	function handleButton(e) {
		const id = e.target.className;
		const target = lo.kebabCase(
			document.getElementById(id).innerHTML.toLowerCase()
		);
		navigate(`/blog/${target}`);
	}

	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/blog")
			.then((response) => {
				return response.json();
			})
			.then((APIdata) => {
				setData(APIdata.reverse());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		setCollapsed(false);
		fetchData();
	}, []);

	return (
		<>
			<Header header="BLOG" />
			<div className="blog">
				{data.map((x) => {
					const options = {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					};
					const publishDate = new Date(
						x.createdAt
					).toLocaleDateString("tr-TR", options);
					return (
						<div key={x._id} className="blog-frame frame">
							<div>
								<img
									src={
										x.picturePath === "undefined"
											? "http://localhost:5000/assets/blog.jpg"
											: `http://localhost:5000/assets/${x.picturePath}`
									}
									alt="blog-pic"
								/>
							</div>
							<div className="blog-header">
								<div className="blog-title">
									<h5 id={x._id}> {x.title} </h5>
								</div>
								<div className="blog-date">
									<span> {publishDate} </span>
								</div>
							</div>
							<div className="blog-content">
								<p> {x.content.slice(0, 500) + "..."} </p>
							</div>
							<div className="button">
								<div onClick={handleButton} className={x._id}>
									Devamını oku...{" "}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Blog;
