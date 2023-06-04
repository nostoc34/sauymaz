import HomeProfile from "../models/homeProfile.js";
import asyncHandler from "express-async-handler";

//GET
export const getProfile = asyncHandler(async (req, res) => {
	const profile = await HomeProfile.find({});
	res.status(200).json(profile);
});

//PUT
export const updateProfileH = asyncHandler(async (req, res) => {
	const profile = await HomeProfile.findById(req.params.id);
	if(!profile) {
	    res.status(400);
	    throw new Error("Profile not found!")
	}

	const updatedProfile = await HomeProfile.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedProfile);
});
