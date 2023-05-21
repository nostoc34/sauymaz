import React, { useEffect, useState } from "react";
import "./academicpast.scss";
import EduAcaFrame from "../eduaca frame/EduAcaFrame";

function AcademicPast() {
	const [data, setData] = useState([]);
	const fetchData = () => {
		fetch("http://localhost:5000/api/academic")
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
		fetchData();
	}, []);
	return (
		<div className="academic-past frame">
			<div className="title">
				<h3>Akademik Geçmiş</h3>
			</div>
			<div className="hr">
				<div className="circle"></div>
				<div className="line"></div>
				<div className="circle"></div>
			</div>
			<div className="records">
				{data.map((x) => {
					return (
						<EduAcaFrame
							from={x.from}
							to={x.to ? x.to : "-"}
							title={x.title}
							subtitle={x.subtitle}
							major={x.major}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default AcademicPast;
