import mongoose from "mongoose";

const academicSchema = mongoose.Schema({
    title: String,
	subtitle: String,
    major: String,
    from: Number,
    to: Number
});

const Academic = mongoose.model("Academic", academicSchema);
export default Academic;