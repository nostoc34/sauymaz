import AboutProfile from "../models/aboutProfile.js";
import asyncHandler from "express-async-handler";

//GET
export const getProfile = asyncHandler(async (req, res) => {
	const profile = await AboutProfile.find({});
	res.status(200).json(profile);
});

//PUT
export const updateProfileA = asyncHandler(async (req, res) => {
	const profile = await AboutProfile.findById(req.params.id);
	if(!profile) {
	    res.status(400);
	    throw new Error("Profile not found!")
	}

	const updatedProfile = await AboutProfile.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedProfile);
});
