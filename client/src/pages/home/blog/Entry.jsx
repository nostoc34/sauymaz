import React from "react";
import { useNavigate } from "react-router-dom";
import "./entry.scss";
import lo from "lodash";

function Entry(props) {
    const navigate = useNavigate();
	

    function handleButton(e) {
        const id = e.target.className;
        const target = lo.kebabCase(document.getElementById(id).innerHTML.toLowerCase());
        console.log(target);
        navigate(`/blog/${target}`);
    }

	return (
		<div className="entry">
			<div className="header">
				<h5 id={props.id}> {props.title} </h5>
				<h6> {props.date} </h6>
			</div>
			<div className="content">
				<p> {props.content} </p>
			</div>
			<div className="button">
				<div onClick={handleButton} class={props.id} >Devamını oku... </div>
			</div>
		</div>
	);
}

export default Entry;
