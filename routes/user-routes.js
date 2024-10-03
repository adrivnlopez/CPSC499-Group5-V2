import Router from "express";

import 
{
    CreateUser,
    GetUser,
    UpdateUserInfo,
    DeleteUser
}from "../controllers/user-controller";

const ClientRoute = Router();

ClientRoute.post("/", async (req, res) => 
{
    try 
    {
        const newUser = req.body; // get the new user data from the request body
        const createdUser = await CreateUser(newUser); // call the CreateUser function with the new user data
        res.status(201).json(createdUser); // if successful, send the created user data back to the client
    } catch (err) 
    {
        console.log(err); // log the error to the console
        res.status(500).json({"status": "An error occurred while creating the user."}); // send an error message to the client
    }
});

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

// update the user information.
ClientRoute.put("/update-user/.email", async (req,res) => 
    {
        try 
        {
            const EmailAddress = req.params.id; // get the email address from the request.
            const NewEmailAddress = req.body; // get the new email address from the request.
            console.log("Old Address: ", EmailAddress,"New Address:", NewEmailAddress); // log the email address and the new email address to the console.
    
            await User.findoneandupdate({EmailAddress}, NewEmailAddress); // find the user with the email address and update the email address.
    
            res.status(200).json({"status": "Email address updated successfully"});
            
        } catch (err) 
        {
            console.log(err); // log the error to the console.
            res.json({"status": "An error has occurred while updating your info !!"}); // send a message to the client.
        }
});

ClientRoute.delete("/", DeleteUser);

export default ClientRoute;