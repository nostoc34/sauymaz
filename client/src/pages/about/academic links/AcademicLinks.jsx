import React, { useState, useEffect } from "react";
import "./academiclinks.scss";

function AcademicLinks() {
	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/academic-link")
			.then((response) => {
				return response.json();
			})
			.then((APIData) => {
				setData(APIData);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="academic-links frame">
			<div className="links-header">
				<h3>
					Akademik çalışmalarıma aşağıdaki linklerden ulaşabilirsiniz:
				</h3>
			</div>
			<div className="links-cont">
				{data.map((x) => {
					return (
						<div className="link-box">
							<a
								href={x.link}
								target="blank"
							>
								{x.title}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AcademicLinks;
