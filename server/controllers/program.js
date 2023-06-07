import Program from "../models/program.js";
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
	const {
		monAm1Title,
		monAm1Time,
		monAm2Title,
		monAm2Time,
		monAm3Title,
		monAm3Time,
		monPm1Title,
		monPm1Time,
		monPm2Title,
		monPm2Time,
		monPm3Title,
		monPm3Time,
		tueAm1Title,
		tueAm1Time,
		tueAm2Title,
		tueAm2Time,
		tueAm3Title,
		tueAm3Time,
		tuePm1Title,
		tuePm1Time,
		tuePm2Title,
		tuePm2Time,
		tuePm3Title,
		tuePm3Time,
		wedAm1Title,
		wedAm1Time,
		wedAm2Title,
		wedAm2Time,
		wedAm3Title,
		wedAm3Time,
		wedPm1Title,
		wedPm1Time,
		wedPm2Title,
		wedPm2Time,
		wedPm3Title,
		wedPm3Time,
		thursAm1Title,
		thursAm1Time,
		thursAm2Title,
		thursAm2Time,
		thursAm3Title,
		thursAm3Time,
		thursPm1Title,
		thursPm1Time,
		thursPm2Title,
		thursPm2Time,
		thursPm3Title,
		thursPm3Time,
		friAm1Title,
		friAm1Time,
		friAm2Title,
		friAm2Time,
		friAm3Title,
		friAm3Time,
		friPm1Title,
		friPm1Time,
		friPm2Title,
		friPm2Time,
		friPm3Title,
		friPm3Time,
	} = req.body;
	const newEntry = new Program({
		monAm1Title: monAm1Title,
		monAm1Time: monAm1Time,
		monAm2Title: monAm2Title,
		monAm2Time: monAm2Time,
		monAm3Title: monAm3Title,
		monAm3Time: monAm3Time,
		monPm1Title: monPm1Title,
		monPm1Time: monPm1Time,
		monPm2Title: monPm2Title,
		monPm2Time: monPm2Time,
		monPm3Title: monPm3Title,
		monPm3Time: monPm3Time,
		tueAm1Title: tueAm1Title,
		tueAm1Time: tueAm1Time,
		tueAm2Title: tueAm2Title,
		tueAm2Time: tueAm2Time,
		tueAm3Title: tueAm3Title,
		tueAm3Time: tueAm3Time,
		tuePm1Title: tuePm1Title,
		tuePm1Time: tuePm1Time,
		tuePm2Title: tuePm2Title,
		tuePm2Time: tuePm2Time,
		tuePm3Title: tuePm3Title,
		tuePm3Time: tuePm3Time,
		wedAm1Title: wedAm1Title,
		wedAm1Time: wedAm1Time,
		wedAm2Title: wedAm2Title,
		wedAm2Time: wedAm2Time,
		wedAm3Title: wedAm3Title,
		wedAm3Time: wedAm3Time,
		wedPm1Title: wedPm1Title,
		wedPm1Time: wedPm1Time,
		wedPm2Title: wedPm2Title,
		wedPm2Time: wedPm2Time,
		wedPm3Title: wedPm3Title,
		wedPm3Time: wedPm3Time,
		thursAm1Title: thursAm1Title,
		thursAm1Time: thursAm1Time,
		thursAm2Title: thursAm2Title,
		thursAm2Time: thursAm2Time,
		thursAm3Title: thursAm3Title,
		thursAm3Time: thursAm3Time,
		thursPm1Title: thursPm1Title,
		thursPm1Time: thursPm1Time,
		thursPm2Title: thursPm2Title,
		thursPm2Time: thursPm2Time,
		thursPm3Title: thursPm3Title,
		thursPm3Time: thursPm3Time,
		friAm1Title: friAm1Title,
		friAm1Time: friAm1Time,
		friAm2Title: friAm2Title,
		friAm2Time: friAm2Time,
		friAm3Title: friAm3Title,
		friAm3Time: friAm3Time,
		friPm1Title: friPm1Title,
		friPm1Time: friPm1Time,
		friPm2Title: friPm2Title,
		friPm2Time: friPm2Time,
		friPm3Title: friPm3Title,
		friPm3Time: friPm3Time,
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
	if (!registry) {
		res.status(400);
		throw new Error("Registry not found!");
	}
	const updatedRegistry = await Program.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true}
	);
	res.status(200).json(updatedRegistry);
});
