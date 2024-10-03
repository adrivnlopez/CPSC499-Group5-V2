import Router from "express";

import 
{
    createUser,
    GetUser,
    UpdateUserInfo,
    DeleteUser,
    
}from "../controllers/user-controller";

const ClientRoute = Router();

// ClientRoute.post("/", async (req, res) => 
// {
//     try 
//     {
//         const NewUser = req.body; // get the new user data from the request body
//         const createdUser = await CreateUser(NewUser); // call the CreateUser function with the new user data
//         res.status(201).json(createdUser); // if successful, send the created user data back to the client
//     } catch (err) 
//     {
//         console.log(err); // log the error to the console
//         res.status(500).json({"status": "An error occurred while creating the user."}); // send an error message to the client
//     }
// });

ClientRoute.post("/signup", createUser); // post request for name, email, password

ClientRoute.get("/users/:email", async (req,res) =>  // get the user name from the email address.
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
ClientRoute.put("/update-user/:email", async (req,res) => 
    {
        try 
        {
            const EmailAddress = req.params.id; // get the email address from the request.
            const NewEmailAddress = req.body; // get the new email address from the request.
            console.log("Old Address: ", EmailAddress,"New Address:", NewEmailAddress); // log the email address and the new email address to the console.
    
            await User.findoneandupdate({EmailAddress}, NewEmailAddress); // find the user with the email address and update the email address.
                
        } catch (err) 
        {
            console.log(err); // log the error to the console.
            res.json({"status": "An error has occurred while updating your info !!"}); // send a message to the client.
        }
});

// delete the user
ClientRoute.delete("/:id", async (req, res) => 
{
    try 
    {
        const userId = req.params.id; // get the user ID from the route parameter
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) 
        {
            return res.status(404).json({ error: "User not found"});
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) 
    {
        console.log(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

export default ClientRoute;