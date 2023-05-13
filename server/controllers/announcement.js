import Announcement from "../models/announcement.js";
import asyncHandler from "express-async-handler";

//POST
export const newAnnouncement = asyncHandler(async (req, res) => {
	const { title, content, picturePath } = req.body;
	const newAnnounce = new Announcement({
		title,
		content,
		picturePath,
	});
	await newAnnounce.save();
	res.status(200).json(newAnnounce);
});

//PUT
export const updateAnnouncement = asyncHandler(async (req, res) => {
	const announce = Announcement.findById(req.params.id);
	if (!announce) {
		res.status(400);
		throw new Error("Announcement not found!");
	}
	const updatedAnnounce = await Announcement.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json(updatedAnnounce);
});

//GET
export const getAllAnnouncements = asyncHandler(async (req, res) => {
	const announces = await Announcement.find({});
	res.status(200).json(announces);
});

//GET
export const getAnnouncement = asyncHandler(async (req, res) => {
	const announce = await Announcement.findById(req.params.id);
	if (!announce) {
		res.status(400);
		throw new Error("Announcement not found!");
	}
	res.status(200).json(announce);
});

//DELETE
export const deleteAnnouncement = asyncHandler(async (req, res) => {
	const announce = await Announcement.findById(req.params.id);
	if (!announce) {
		res.status(400);
		throw new Error("Announcement not found!");
	}
	await Announcement.findByIdAndDelete(req.params.id);
	res.status(200).json({ id: req.params.id });
});
