import Router from "express";

import 
{
    CreateUser,
    GetUser,
    UpdateUser,
    DeleteUser
}from "../controllers/user-controller";

const UserRoute = Router();

UserRoute.post("/", CreateUser);
UserRoute.get("/", GetUser);
UserRoute.put("/", UpdateUser);
UserRoute.delete("/", DeleteUser);

export default UserRoute;