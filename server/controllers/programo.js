import Programo from "../models/programo.js";
import asyncHandler from "express-async-handler";

//POST
export const newProgramo = asyncHandler(async (req, res) => {
	const { monday, tuesday, wednesday, thursday, friday, date } = req.body;
	const newEntry = new Programo({
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		date,
	});
	await newEntry.save();
	res.status(200).json(newEntry);
});


//PUT
export const updateProgramo = asyncHandler(async (req, res) => {
	const registry = Programo.findById(req.params.id);
	if (!registry) {
		res.status(400);
		throw new Error("Registry not found!");
	}
	const updatedRegistry = await Programo.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true}
	);
	res.status(200).json(updatedRegistry);
});

//GET
export const getProgramo = asyncHandler(async (req, res) => {
	const programs = await Programo.find({});
	res.status(200).json(programs);
});