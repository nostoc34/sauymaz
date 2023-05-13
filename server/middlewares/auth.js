import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/admin.js";

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get token from header
			token = req.headers.authorization.split(" ")[1];

			//verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			//get admin from the token
			req.admin = await Admin.findById(decoded.id).select("-password");

			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error("Not authorized.");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token.");
	}
});
