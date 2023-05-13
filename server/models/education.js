import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
    title: String,
	subtitle: String,
    major: String,
    from: Number,
    to: Number
});

const Education = mongoose.model("Education", educationSchema);
export default Education;
