import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainContext from "./MainContext";

import Navbar from "./layout/navbar/Navbar";
import Footer from "./layout/footer/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Academic from "./pages/academic/Academic";
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

	useEffect(() => {
		const data = window.localStorage.getItem('loggedIn');
		if ( data !== null ) setLoggedIn(JSON.parse(data));
	  }, []);
	useEffect(() => {
		localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);
	

	const data = {
		setAdminPage,
		isLoggedIn,
		setLoggedIn,
		isCollapsed,
		setCollapsed,
		token,
		setToken,
	};

	return (
		<>
			<MainContext.Provider value={data}>
				<BrowserRouter>
					{isAdminPage ? null : <Navbar />}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/hakkimda" element={<About />} />
						<Route path="/akademik" element={<Academic />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/blog/:id" element={<InnerBlog />} />
						<Route path="/iletisim" element={<Contact />} />
						<Route path="/admin" element={isLoggedIn ? <Admin /> : <Login />} />
						{/* <Route path="/admin/login" element={} /> */}
					</Routes>
					{isAdminPage ? null : <Footer />}
				</BrowserRouter>
			</MainContext.Provider>
		</>
	);
}

export default App;
