import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    time: String,
    day: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
