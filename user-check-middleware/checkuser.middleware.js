import { getUserByemail } from "../services/user.service.js" //Maybe Change getUserByemail to getMemberByemail or if we use phonenumber

const memberCheck = async (req, res, next) => {
    try {
        const email = req.params.id;
        const member = await getUserByemail(email); //Maybe Change getUserByemail to getMemberByemail or if we use phonenumber
        console.log(member)
        if(member.length === 0) {
            throw new Error("Member does not exist")
        } else {
            next();
        }
    } catch(err) {
        console.log(err)
        return res.status(400).json({"status": "member not found"})
    } 
};

export default memberCheck