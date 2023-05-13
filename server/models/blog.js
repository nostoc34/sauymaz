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
	{
		timestapms: true,
	}
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
