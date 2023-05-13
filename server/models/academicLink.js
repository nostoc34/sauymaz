import mongoose from "mongoose";

const academicLinkSchema = mongoose.Schema({
    title: String,
	link: String,
});

const AcademicLink = mongoose.model("AcademicLink", academicLinkSchema);
export default AcademicLink;