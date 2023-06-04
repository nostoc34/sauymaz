import React, {useEffect, useState} from "react";
import "./footer.scss";

function Footer() {
	const year = new Date().getFullYear();

	const [data, setData] = useState([]);
	const fetchData = () => {
		fetch("http://localhost:5000/api/user")
		.then((response) => {
			return response.json();
		})
		.then((APIData) => {
			setData(APIData.reverse());
		})
		.catch((err) => {
			console.log(err);
		})
	}
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="footer">
			Copyright © {year} {data && data.length ? data[0].name : ""}. Tüm hakları saklıdır.
		</div>
	);
}

export default Footer;
