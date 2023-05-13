import Blog from "../models/blog.js";
import asyncHandler from "express-async-handler";

//POST
export const newBlog = asyncHandler(async (req, res) => {
	const { title, content, picturePath } = req.body;
	const newPost = new Blog({
		title,
		content,
		picturePath,
	});
	await newPost.save();
	res.status(200).json(newPost);
});

//PUT
export const updateBlog =  asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if(!blog) {
        res.status(400);
        throw new Error("Blog not found!")
    }

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedBlog);
});

//GET
export const getAllBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find({});
	res.status(200).json(blogs);
});

//GET
export const getBlog = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if(!blog) {
        res.status(400);
        throw new Error("Blog not found!")
    }
	res.status(200).json(blog);
});

//DELETE
export const deleteBlog = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if(!blog) {
        res.status(400);
        throw new Error("Blog not found!")
    }

	await Blog.findByIdAndDelete(req.params.id);
	res.status(200).json({id: req.params.id});
});
