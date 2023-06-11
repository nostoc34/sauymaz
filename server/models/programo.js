import mongoose from "mongoose";



const periodSchema = mongoose.Schema({
	take: {
		type: String,
		default: "false",
	},
	title: String,
	time: String,
	day: String,
});

const daySchema = mongoose.Schema({
	am1: periodSchema,
	am2: periodSchema,
	am3: periodSchema,
	pm1: periodSchema,
	pm2: periodSchema,
	pm3: periodSchema,
});


const programoSchema = mongoose.Schema({
	date: String,
	monday: daySchema,
	tuesday: daySchema,
	wednesday: daySchema,
	thursday: daySchema,
	friday: daySchema,
});

const Programo = mongoose.model("Programo", programoSchema);
export default Programo;
