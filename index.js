import express from "express";
import mongoose from "mongoose";

const gymApp = express();

gymApp.use(express.json());

//gymApp.use("/user", userRoute);

const mongoConnect = async () => {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Database Connected");
  };
  
  mongoConnect();
  
  app.listen(3000, () => console.log(" server started on port 3000"));
  