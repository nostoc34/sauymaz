import Education from "../models/education.js";
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
    const {title, subtitle, major, from, to} = req.body;
    const newEntry = new Education({
        title,
        subtitle,
        major,
        from,
        to
    });
    await newEntry.save();
    res.status(200).json(newEntry);
});

//PUT
export const updateRegistry = asyncHandler(async (req, res) => {
    const registry = Education.findById(req.params.id);
    if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }
    const updatedRegistry = await Education.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedRegistry);
});

//GET
export const getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await Education.find({});
    res.status(200).json(registrations);
});

//DELETE
export const deleteRegistry = asyncHandler(async (req, res) => {
    const registry = await Education.findById(req.params.id);
	if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }

	await Education.findByIdAndDelete(req.params.id);
	res.status(200).json({id: req.params.id});
});