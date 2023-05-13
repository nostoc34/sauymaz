import mongoose from "mongoose";

const navbarLinkSchema = mongoose.Schema({
    title: String,
	to: String,
});

const NavbarLink = mongoose.model("NavbarLink", navbarLinkSchema);
export default NavbarLink;