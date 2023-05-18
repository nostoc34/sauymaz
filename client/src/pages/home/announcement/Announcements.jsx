import React from "react";
import "./announcements.scss";
import Pagination from "./Pagination";

function Announcements() {
	return (
		<div className="announcements">
			<div className="title">
				<h3>DUYURULAR</h3>
			</div>
			<div className="hr">
				<div className="circle"></div>
				<div className="line"></div>
				<div className="circle"></div>
			</div>
			<Pagination />
		</div>
	);
}

export default Announcements;
