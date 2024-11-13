const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");


app.use(signupRouter);
app.use(loginRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected ");
  })
  .catch((err) => console.error("Database Connection Failed: ", err));

app.post("/signup", signupRouter);
app.post("/login", loginRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
