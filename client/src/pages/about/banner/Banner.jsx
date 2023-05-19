import React, { useEffect, useState } from "react";
import "./banner.scss";

function Banner() {
	const [data, setData] = useState([]);
	const fetchData = () => {
		fetch("http://localhost:5000/api/about-profile")
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
		<div className="banner frame">
			<div className="photo">
				{data && data.length ? (
					<img
						src={`http://localhost:5000/assets/${data[0].picturePath}`}
						alt="pp"
					/>
				) : null}
			</div>
			<div className="para">
				<div>
					{data && data.length ? <h4>{data[0].title}</h4> : null}
				</div>
				<div>
					{data && data.length ? <p>{data[0].content}</p> : null}
				</div>
			</div>
		</div>
	);
}

export default Banner;
