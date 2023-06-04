import Program from "../models/program.js";
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
	const {
		monAm1,
		monAm2,
		monAm3,
		monPm1,
		monPm2,
		monPm3,
		tuesAm1,
		tuesAm2,
		tuesAm3,
		tuesPm1,
		tuesPm2,
		tuesPm3,
		wednesAm1,
		wednesAm2,
		wednesAm3,
		wednesPm1,
		wednesPm2,
		wednesPm3,
		thursAm1,
		thursAm2,
		thursAm3,
		thursPm1,
		thursPm2,
		thursPm3,
		friAm1,
		friAm2,
		friAm3,
		friPm1,
		friPm2,
		friPm3,
	} = req.body;
	const newEntry = new Program({
		monAm1,
		monAm2,
		monAm3,
		monPm1,
		monPm2,
		monPm3,
		tuesAm1,
		tuesAm2,
		tuesAm3,
		tuesPm1,
		tuesPm2,
		tuesPm3,
		wednesAm1,
		wednesAm2,
		wednesAm3,
		wednesPm1,
		wednesPm2,
		wednesPm3,
		thursAm1,
		thursAm2,
		thursAm3,
		thursPm1,
		thursPm2,
		thursPm3,
		friAm1,
		friAm2,
		friAm3,
		friPm1,
		friPm2,
		friPm3,
	});
	await newEntry.save();
	res.status(200).json(newEntry);
});


//GET
export const getProgram = asyncHandler(async (req, res) => {
	const programs = await Program.find({});
	res.status(200).json(programs);
});

//PUT
export const updateRegistry = asyncHandler(async (req, res) => {
    const registry = Program.findById(req.params.id);
    if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }
    const updatedRegistry = await Program.findByIdAndUpdate(req.params.id, req.body , {new: true});
    res.status(200).json(updatedRegistry);
});