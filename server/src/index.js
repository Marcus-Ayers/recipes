import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

//CREATES AN EXPRESS APPLICATION INSTANCE
const app = express();
//ADDS EXPRESS.JSON MIDDLEWARE FOR PARSING INCOMING JSON PAYLOADS IN REQ BODIES
app.use(express.json());
//MIDDLEWARE TO ENABLE CROSS-ORIGIN RESOURCE SHARING FOR API || SECURITY FEATURE
app.use(cors());
//MOUNT THE ROUTERS || GROUP RELATED ROUTES AND ASSIGN THEM TO ROUTERS
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
//CONNECT TO MONGOOSE
mongoose.connect(process.env.MONGO_URL, {
  //tells Mongoose to use the new MongoDB Node.js driver's new URL parser
  //instead of the deprecated one provided by the mongodb
  useNewUrlParser: true,
  //enables the use of the new MongoDB Node.js driver's new topology engine.
  useUnifiedTopology: true,
});
//START EXPRESS ON PORT 3001
app.listen(3001, () => console.log("Server started"));
