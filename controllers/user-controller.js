import User from "../models/user-model.js";

export const createUser = async (req, res) => { //post request for name, email, password
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
