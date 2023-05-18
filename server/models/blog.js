import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
	{
		title: String,
		content: String,
		picturePath: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
