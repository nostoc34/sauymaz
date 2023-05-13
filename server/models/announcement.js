import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
	{
		title: String,
		content: String,
		picturePath: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
