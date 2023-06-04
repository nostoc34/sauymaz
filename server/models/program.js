import mongoose from "mongoose";

const programSchema = mongoose.Schema({
    monAm1: String,
    monAm2: String,
    monAm3: String,
    monPm1: String,
    monPm2: String,
    monPm3: String,
    tuesAm1: String,
    tuesAm2: String,
    tuesAm3: String,
    tuesPm1: String,
    tuesPm2: String,
    tuesPm3: String,
    wednesAm1: String,
    wednesAm2: String,
    wednesAm3: String,
    wednesPm1: String,
    wednesPm2: String,
    wednesPm3: String,
    thursAm1: String,
    thursAm2: String,
    thursAm3: String,
    thursPm1: String,
    thursPm2: String,
    thursPm3: String,
    friAm1: String,
    friAm2: String,
    friAm3: String,
    friPm1: String,
    friPm2: String,
    friPm3: String,
});

const Program = mongoose.model("Program", programSchema);
export default Program;
