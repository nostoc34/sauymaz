import NavbarLink from "../models/navbarLink.js"
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
    const {title, to, index, stateCode} = req.body;
    const newEntry = new NavbarLink({
        title,
        to,
        index,
        stateCode,
    });
    await newEntry.save();
    res.status(200).json(newEntry);
});

//GET
export const getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await NavbarLink.find({});
    res.status(200).json(registrations);
});

//DELETE
export const deleteRegistry = asyncHandler(async (req, res) => {
    const registry = await NavbarLink.findById(req.params.id);
	if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }

	await NavbarLink.findByIdAndDelete(req.params.id);
	res.status(200).json({id: req.params.id});
});