import NavbarLink from "../models/navbarLink.js"
import asyncHandler from "express-async-handler";

//POST
export const newRegistry = asyncHandler(async (req, res) => {
    const {title, to, index, isActive, element} = req.body;
    const newEntry = new NavbarLink({
        title,
        to,
        index,
        isActive,
        element,
    });
    await newEntry.save();
    res.status(200).json(newEntry);
});

//GET
export const getRegistrations = asyncHandler(async (req, res) => {
    const registrations = await NavbarLink.find({});
    res.status(200).json(registrations);
});

//PUT
export const updateRegistry = asyncHandler(async (req, res) => {
    const registry = await NavbarLink.findById(req.params.id);
	if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }

	const updatedRegistry = await NavbarLink.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedRegistry);
});