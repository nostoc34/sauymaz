import Contact from "../models/contact.js";
import asyncHandler from "express-async-handler";

//GET
export const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.find({});
	res.status(200).json(contact);
});

//PUT
export const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findOneAndUpdate({}, req.body, { new: true });
	res.status(200).json(contact);
});
