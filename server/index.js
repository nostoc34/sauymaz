import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { updateProfileH } from "./controllers/homeProfile.js";
import { updateProfileA } from "./controllers/aboutProfile.js";
import { newAnnouncement, updateAnnouncement } from "./controllers/announcement.js";
import { newBlog, updateBlog } from "./controllers/blog.js";
import { registerAdmin } from "./controllers/admin.js";
import { protect } from "./middlewares/auth.js";

import aProfileRoutes from "./routes/aboutProfile.js";
import hProfileRoutes from "./routes/homeProfile.js";
import academicRoutes from "./routes/academic.js";
import announcementRoutes from "./routes/announcement.js";
import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";
import educationRoutes from "./routes/education.js";
import adminRoutes from "./routes/admin.js";
import academicLinkRoutes from "./routes/academicLink.js";

// import HomeProfile from "./server/models/homeProfile.js";

//initial settings
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));
//registerAdmin();


//file storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname);
	},
  });
const upload = multer({ storage });

//routes with files
app.put("/api/about-profile", protect, upload.single("picture"), updateProfileA);
app.put("/api/home-profile", protect, upload.single("picture"), updateProfileH);
app.post("/api/announcement", protect, upload.single("picture"), newAnnouncement);
app.put("/api/announcement/:id", protect, upload.single("picture"), updateAnnouncement);
app.post("/api/blog", protect, upload.single("picture"), newBlog);
app.put("/api/blog/:id", protect, upload.single("picture"), updateBlog);


//routes
app.use("/api/about-profile", aProfileRoutes);
app.use("/api/home-profile", hProfileRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/academic-link", academicLinkRoutes);


// const home = new HomeProfile({
// 	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt leo sed volutpat ultrices. Duis cursus sodales mauris in ultricies. Suspendisse vel molestie turpis, vel tristique dui. Maecenas suscipit libero a orci vehicula sagittis feugiat eget felis. Integer ac pellentesque magna. Nullam viverra tortor orci, sit amet feugiat ipsum porttitor e.",
// 	picturePath: "homepp.jpg",
// });
// home.save();


//connect to db
const PORT = process.env.PORT || 5000;
mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log("Server is running on port " + PORT);
		});
	})
	.catch((error) => {
		console.log(error.message);
	});
