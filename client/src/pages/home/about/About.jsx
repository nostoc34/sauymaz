import React, { useState, useEffect } from "react";
import "./about.scss";

function About() {
	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/home-profile")
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
	return (
		<div className="home-about frame">
			<div>
				{data && data.length ? (
					<img
						src={`http://localhost:5000/assets/${data[0].picturePath}`}
						alt="pp"
					/>
				) : null}
			</div>
			<div className="text">
				{data.map((x) => {
					return <div key={x._id}> {x.content} </div>;
				})}
			</div>
		</div>
	);
}

export default About;
