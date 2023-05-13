import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    phone: String,
    fax: String,
    email: String,
    adress: String,
    instagram: String,
    twitter: String,
    linkedin: String
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;