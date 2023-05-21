import React from "react";
import "./eduacaframe.scss";

function EduAcaFrame(props) {
	return (
		<div className="eduaca frame-w">
			<div className="dates">
				<span>
					<h5> {props.to} </h5>
				</span>
				<span>
					<h5> {props.from} </h5>
				</span>
			</div>
			<div className="info">
				<div>
					<h4> {props.title} </h4>
				</div>
				<div>
					<h5> {props.subtitle} </h5>
				</div>
				<div>
					<h6> {props.major} </h6>
				</div>
			</div>
		</div>
	);
}

export default EduAcaFrame;
