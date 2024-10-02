import Router from "express";

import 
{
    CreateUser,
    GetUser,
    UpdateUserInfo,
    DeleteUser
}from "../controllers/user-controller";

const ClientRoute = Router();

ClientRoute.post("/", CreateUser);

ClientRoute.get("/", GetUser); 

ClientRoute.get("/", async (req,res) =>  // get the user name from the email address.
    {
        try 
        {
            const UserEmailToCheck = req.params.email; // get the email from the request.
            const PossibleUserName = await User.find({UserEmailToCheck}); // find the user with the email.
            res.status(200).json(PossibleUserName); // if Successful, send the UserName back to the client.
        } 
        catch (err) // if there is an error, send a message to the client.
        {
            console.log(err); // log the error to the console.
            res.json({"status": "Email Address not found."}); // send the message to the client.
        }
    });


    ClientRoute.put("/", UpdateUserInfo) // update the user information.


ClientRoute.delete("/", DeleteUser);

export default ClientRoute;