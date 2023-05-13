import mongoose from "mongoose";

const aboutProfileSchema = mongoose.Schema({
    title: String,
	content: String,
	picturePath: {
		type: String,
		default: "",
	},
});

const AboutProfile = mongoose.model("AboutProfile", aboutProfileSchema);
export default AboutProfile;
