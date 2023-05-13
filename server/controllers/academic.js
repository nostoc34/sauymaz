import Academic from "../models/academic.js"
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
    const {title, subtitle, major, from, to} = req.body;
    const newEntry = new Academic({
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
    const registry = Academic.findById(req.params.id);
    if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }
    const updatedRegistry = await Academic.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedRegistry);
});

//GET
export const getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await Academic.find({});
    res.status(200).json(registrations);
});

//DELETE
export const deleteRegistry = asyncHandler(async (req, res) => {
    const registry = await Academic.findById(req.params.id);
	if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }

	await Academic.findByIdAndDelete(req.params.id);
	res.status(200).json({id: req.params.id});
});