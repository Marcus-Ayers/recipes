import express from "express";
import {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  saveRecipe,
  getSavedRecipeIds,
  getSavedRecipes,
} from "../controllers/recipes.js";
import { verifyToken } from "../controllers/users.js";

const router = express.Router();

//THE ROUTE / OR /RECIPES CALLS THE FUNCTION getAllRecipes WHICH IS DEFINED IN THE CONTROLLER
router.get("/", getAllRecipes);
//CREATES VERIFIES THE TOKEN AND THEN CREATS THE RECIPE USING createRecipe IN THE CONTROLLER
router.post("/", verifyToken, createRecipe);
//GETS A RECIPE BY ID
router.get("/:recipeId", getRecipeById);

router.put("/", saveRecipe);
//RETURNS THE IDS OF THE SAVED RECIPES FOR A USER
router.get("/savedRecipes/ids/:userId", getSavedRecipeIds);
//RETURNS THE WHOLE RECIPES FOR THE USER
router.get("/savedRecipes/:userId", getSavedRecipes);

export { router as recipesRouter };
