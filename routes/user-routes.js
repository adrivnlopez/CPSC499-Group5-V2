import Router from "express";
import { createUser, getUser, updateUserInfo, deleteUser } from "../controllers/user-controller.js";

const ClientRoute = Router();

ClientRoute.post("/signup", createUser); 
ClientRoute.get("/users/:email", getUser); 
ClientRoute.put("/update-user/:email", updateUserInfo); 
ClientRoute.delete("/:id", deleteUser); 

export default ClientRoute;
