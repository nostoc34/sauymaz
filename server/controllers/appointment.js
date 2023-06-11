import Appointment from "../models/appointment.js";
import asyncHandler from "express-async-handler";

//POST
export const newAppointment = asyncHandler(async (req, res) => {
	const { firstname, lastname, email, time, day } = req.body;
	const newAppointment = new Appointment({
		firstname,
		lastname,
		email,
		time,
		day,
	});
	await newAppointment.save();
	res.status(200).json(newAppointment);
});


//GET
export const getAppointments = asyncHandler(async (req, res) => {
	const appos = await Appointment.find({});
	res.status(200).json(appos);
});

//DELETE
export const deleteAppos = asyncHandler(async (req, res) => {
	await Appointment.deleteMany({});
	res.status(200).json();
});