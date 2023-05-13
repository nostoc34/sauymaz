import React from "react";
import "./footer.scss";

function Footer() {
	const year = new Date().getFullYear();
	return (
		<div className="footer">
			Copyright © {year} Sait Ali Uymaz. Tüm hakları saklıdır.
		</div>
	);
}

export default Footer;
