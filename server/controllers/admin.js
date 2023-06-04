import Admin from "../models/admin.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//POST
export const login = asyncHandler(async(req, res) => {
    const { name, password } = req.body;

	const admin = await Admin.findOne({ name });

	if (admin && (await bcrypt.compare(password, admin.password))) {
		res.json({
			_id: admin.id,
			name: admin.name,
            token: generateToken(admin._id)
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials.");
	};
});




//generate jwt
const generateToken = (id) => {
    return  jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerAdmin = asyncHandler(async(req, res) => {
    const password = "";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
        name: "",
        password: hashedPassword,
    });
    admin.save();
});

