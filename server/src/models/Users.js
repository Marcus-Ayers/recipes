import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});
//CREATES A COLLECTIONS IN MONGO NAMED 'users' THAT FOLLOWWS THE 'RecipeSchema' PROVIDED ABOVE
export const UserModel = mongoose.model("users", UserSchema);
