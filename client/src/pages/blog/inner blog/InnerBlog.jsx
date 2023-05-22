import React, { useState, useEffect, useContext } from "react";
import MainContext from "../../../MainContext";
import { useParams, useNavigate } from "react-router-dom";
import lo from "lodash";
import "./innerblog.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function InnerBlog() {
	const { setCollapsed } = useContext(MainContext);

	const [data, setData] = useState([]);
	const [copied, setCopied] = useState(false);

	const blogUrl = useParams();
	const navigate = useNavigate();

	const currentUrl = window.location.href;
	console.log(currentUrl);

	async function copyToClip() {
		await navigator.clipboard.writeText(currentUrl);
		setCopied(true);
	}

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
		const timeout = setTimeout(() => {
			setCopied(false);
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [copied]);

	useEffect(() => {
		setCollapsed(false);
		fetchData();
	}, []);
	return (
		<>
			{data
				.filter((x) => lo.kebabCase(x.title) === blogUrl.id)
				.map((x) => {
					const options = {
						day: "numeric",
						month: "numeric",
						year: "numeric",
					};
					const publishDate = new Date(
						x.createdAt
					).toLocaleDateString("tr-TR", options);
					return (
						<div className="inner-blog">
							<ArrowBackIcon
								className="go-back"
								onClick={() => {
									navigate("/blog");
								}}
							/>
							<div>
								<img
									src={
										x.picturePath
											? `http://localhost:5000/assets/${x.picturePath}`
											: "http://localhost:5000/assets/blog.jpg"
									}
									alt="blog-pic"
								/>
							</div>
							<div className="blog-header">
								<div className="blog-title">
									<h5> {x.title} </h5>
								</div>
								<div className="blog-date">
									<span> {publishDate} </span>
								</div>
							</div>
							<div className="blog-content">
								<p> {x.content} </p>
							</div>
							<div className="btn-cont">
								<div onClick={copyToClip} className="share-btn">
									Paylaş
								</div>
								{copied && <span>Link kopyalandı!</span>}
							</div>
						</div>
					);
				})}
		</>
	);
}

export default InnerBlog;
