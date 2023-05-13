import AcademicLink from "../models/academicLink.js"
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
    const {title, link} = req.body;
    const newEntry = new AcademicLink({
        title,
        link
    });
    await newEntry.save();
    res.status(200).json(newEntry);
});

//PUT
export const updateRegistry = asyncHandler(async (req, res) => {
    const registry = AcademicLink.findById(req.params.id);
    if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }
    const updatedRegistry = await AcademicLink.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedRegistry);
});

//GET
export const getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await AcademicLink.find({});
    res.status(200).json(registrations);
});

//DELETE
export const deleteRegistry = asyncHandler(async (req, res) => {
    const registry = await AcademicLink.findById(req.params.id);
	if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }

	await AcademicLink.findByIdAndDelete(req.params.id);
	res.status(200).json({id: req.params.id});
});