import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user-routes.js";

// const express = require("express");
// const mongoose = require("mongoose");

const gymApp = express();

gymApp.use(express.json());

gymApp.use("/user", userRoute);

const mongoConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017");
  console.log("Database Connected");
};

mongoConnect();

gymApp.listen(3000, () => console.log(" server started on port 3000"));
