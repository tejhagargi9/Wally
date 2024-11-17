const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());


const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const userdataRouter = require("./routes/userData");
const uploadWallpaperRouter = require("./routes/uploadImage");
const deleteAccountRouter = require("./routes/deleteAccount");
const profilePhotoRouter = require("./routes/updateProfilePhoto");

app.use(signupRouter);
app.use(loginRouter);
app.use(userdataRouter);
app.use(uploadWallpaperRouter);
app.use(deleteAccountRouter);
app.use(profilePhotoRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected ");
  })
  .catch((err) => console.error("Database Connection Failed: ", err));

app.post("/signup", signupRouter);
app.post("/login", loginRouter);
app.post("/getUserData", userdataRouter);
app.post("/uploadWallpaper", uploadWallpaperRouter);
app.post("/deleteAccount", deleteAccountRouter);
app.post("/updateProfilePhoto", profilePhotoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
