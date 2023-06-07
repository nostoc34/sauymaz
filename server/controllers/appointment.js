import Appointment from "../models/appointment.js";
import asyncHandler from "express-async-handler";

//POST
export const newAppointment = asyncHandler(async (req, res) => {
	const { firstname, lastname, email, date, day } = req.body;
	const newAppointment = new Appointment({
		firstname,
		lastname,
		email,
		date,
		day,
	});
	await newAppointment.save();
	res.status(200).json(newAppointment);
});
