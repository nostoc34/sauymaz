import HomeProfile from "../models/homeProfile.js";
import asyncHandler from "express-async-handler";

//GET
export const getProfile = asyncHandler(async(req, res) => {
    const profile = await HomeProfile.find({});
	res.status(200).json(profile);
});

//PUT
export const updateProfileH = asyncHandler(async(req, res) => {
    const profile = await HomeProfile.findOneAndUpdate({}, req.body, {
		new: true,
	});
	res.status(200).json(profile);
});