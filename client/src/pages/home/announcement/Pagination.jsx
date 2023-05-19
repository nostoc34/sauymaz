import React, { useEffect, useState } from "react";
import "./pagination.scss";
import Announcement from "./Announcement";

function Pagination() {
	const [data, setData] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/api/announcement")
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
		console.log(data);
	}, []);

	const options = { day: "numeric", month: "long", year: "numeric" };

	const renderData = (data) => {
		return (
			<div className="entries">
				{data.map((x) => {
					const publishDate = new Date(
						x.createdAt
					).toLocaleDateString("tr-TR", options);
					return (
						<Announcement
							key={x._id}
							title={x.title}
							date={publishDate}
							content={x.content}
							picturePath={`http://localhost:5000/assets/${x.picturePath}`}
						/>
					);
				})}
			</div>
		);
	};

	const [currentPage, setcurrentPage] = useState(1);
	const [itemsPerPage, setitemsPerPage] = useState(3);

	const [pageNumberLimit, setpageNumberLimit] = useState(3);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const handleClick = (event) => {
		setcurrentPage(Number(event.target.id));
	};

	const pages = [];
	for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage === number ? "active" : null}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	const handleNextbtn = () => {
		setcurrentPage(currentPage + 1);

		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevbtn = () => {
		setcurrentPage(currentPage - 1);

		if ((currentPage - 1) % pageNumberLimit === 0) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	return (
		<>
			{renderData(currentItems)}
			<div className="pagination">
				<ul className="pageNumbers">
					<button
						className="page-btn"
						onClick={handlePrevbtn}
						disabled={currentPage === pages[0] ? true : false}
					>
						<span aria-hidden="true">&laquo;</span>
					</button>

					{renderPageNumbers}

					<button
						className="page-btn"
						onClick={handleNextbtn}
						disabled={
							currentPage === pages[pages.length - 1]
								? true
								: false
						}
					>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</ul>
			</div>
		</>
	);
}

export default Pagination;
