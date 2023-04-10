import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    //AXIOS GET REQUEST THAT CALLS /RECIPES WHICH IS DEFINED IN RECIPES.JS IN THE ROUTES BACKEND.
    const fetchRecipes = async () => {
      try {
        //RETREIVES ALL OF THE RECIPES
        const response = await axios.get("http://localhost:3001/recipes");
        //UPDATES THE STATE WITH ALL THE RECIPES
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          //GETS THE IDS OF THE SAVED RECIPES
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        //UPDATES THE STATE OF THE SAVED RECIPES
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    //CALLS THE TWO FUNCTIONS AFTER DEFINING THEM
    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      //FUNCITON WITH A PUT REQUEST TO SAVE A RECIPE
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      //UPDATES THE SAVED RECIPES WITH THE NEW ONE
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
