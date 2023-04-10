import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  //CHECKS IF THE USERNAME ALREADY EXISTS
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists! " });
  }
  //HASH THE PASSWORD BEFORE SAVING THE USER
  const hashedPassword = await bcrypt.hash(password, 10);
  //CREATE A NEW USER WITH THE USERNAME AND HASHED PASSWORD
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered Successfully!" });
};
//LOG IN AN EXISTING USER
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  //CHECKS IF THE USERNAME EXISTS
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User Doesn't Exist " });
  }
  //CHECKS IF THE PASSWORD MATCHES THE STORED HASHED PASSWORD USING THE BCRYPT.COMPARE
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect" });
  }
  //IF PASSWORD IS VALID USES JWT.SIGN TO ENCODE THE PAYLOAD AND SIGN IT TO CREATE A NEW JWT
  //THE PAYLOAD '{id: user._id}' CONTAINS THE USERS ID WHICH IS EXTRACTED FROM THE USER OBJECT '{user._id}'
  //FOLLOWED BY A SECRET KEY TO SIGN THE JWT
  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  //SENDS A RES WITH THE TOKEN AND USER ID
  res.json({ token, userID: user._id });
};

export const verifyToken = (req, res, next) => {
  //EXTRACTS THE AUTHORIZAITON HEADER FROM THE REQ (IE: THE JWT)
  const authHeader = req.headers.authorization;
  if (authHeader) {
    //IF IT EXISTS THEN USES JWT.VERIFY FROM THE JWT LIBRARY TO VERIFY THE TOKEN USING TEH SECRET KEY
    jwt.verify(authHeader, process.env.SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      //PROCEEDS TO NEXT MIDDLEWARE OR ROUTE HANDLER
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
