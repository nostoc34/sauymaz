import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainContext from "./MainContext";

import Navbar from "./layout/navbar/Navbar";
import Footer from "./layout/footer/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import InnerBlog from "./pages/blog/inner blog/InnerBlog";
import Contact from "./pages/contact/Contact";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";

function App() {
	const [isAdminPage, setAdminPage] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isCollapsed, setCollapsed] = useState(false);
	const [token, setToken] = useState("");
	const [activeLink, setActiveLink] = useState({
		home: true,
		about: true,
		blog: true,
		contact: true,
	});

	useEffect(() => {
		const logdata = window.localStorage.getItem('loggedIn');
		if ( logdata !== null ) setLoggedIn(JSON.parse(logdata));
	  }, []);
	useEffect(() => {
		localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

	useEffect(() => {
		const tokendata = window.localStorage.getItem('token');
		if ( tokendata !== null ) setToken(JSON.parse(tokendata));
	  }, []);
	useEffect(() => {
		localStorage.setItem("token", JSON.stringify(token));
	}, [token]);
	

	const data = {
		setAdminPage,
		isLoggedIn,
		setLoggedIn,
		isCollapsed,
		setCollapsed,
		token,
		setToken,
		activeLink,
		setActiveLink
	};

	return (
		<>
			<MainContext.Provider value={data}>
				<BrowserRouter>
					{isAdminPage ? null : <Navbar />}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/hakkimda" element={<About />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/blog/:id" element={<InnerBlog />} />
						<Route path="/iletisim" element={<Contact />} />
						<Route path="/admin" element={isLoggedIn ? <Admin /> : <Login />} />						
					</Routes>
					{isAdminPage ? null : <Footer />}
				</BrowserRouter>
			</MainContext.Provider>
		</>
	);
}

export default App;
