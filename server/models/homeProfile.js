import mongoose from "mongoose";

const homeProfileSchema = mongoose.Schema({
	content: String,
	picturePath: {
		type: String,
		default: "",
	},
});

const HomeProfile = mongoose.model("HomeProfile", homeProfileSchema);
export default HomeProfile;
