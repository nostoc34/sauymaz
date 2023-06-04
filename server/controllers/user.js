import User from "../models/user.js";
import asyncHandler from "express-async-handler";

//POST
export const newUser = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const newEntry = new User({
        name,
    });
    await newEntry.save();
    res.status(200).json(newEntry);
});


//PUT
export const updateUser = asyncHandler(async (req, res) => {
    const registry = User.findById(req.params.id);
    if(!registry) {
        res.status(400);
        throw new Error("Registry not found!")
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);
});

//GET
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.status(200).json(user);
});