import AboutProfile from "../models/aboutProfile.js";
import asyncHandler from "express-async-handler";

//GET
export const getProfile = asyncHandler(async (req, res) => {
	const profile = await AboutProfile.find({});
	res.status(200).json(profile);
});

//PUT
export const updateProfileA = asyncHandler(async (req, res) => {
	const profile = await AboutProfile.findOneAndUpdate({}, req.body, {
		new: true,
	});
	res.status(200).json(profile);
});
