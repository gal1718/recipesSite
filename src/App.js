import "./App.css";
import { useEffect, useState } from "react";
import RecipeReviewCard from "./Components/RecipeReviewCard/RecipeReviewCard";
import recipesData from "../src/data/recipes.json";
import saladImg from "../src/Images/pexels-chan-walrus - salad.jpg";
import SideBar from "./Components/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import Banner from "./Components/Banner/Banner";
import RecipeDetails from "./Components/RecipeDetails/RecipeDetails";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [calFilter, setCalFilter] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [healthFilters, setHealthFilters] = useState({
    "Gluten-Free": false,
    Vegan: false,
    "Dairy-Free": false,
    "Egg-Free": false,
    "Wheat-Free": false,
    "Peanut-Free": false,
    "Lupine-Free": false,
    "Fish-Free": false,
    "Mollusk-Free": false,
    "Alcohol-Free": false,
  });
  const [mealTypeFilters, setMealTypeFilters] = useState([]);
  const [dishTypeFilters, setDishTypeFilters] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipesStorage")) || []
  );
  const [likedRecipesFilterOn, setLikedRecipesFilterOn] = useState(false);

  useEffect(() => {
    // Fetch recipes data

    const getRecipes = async () => {
      if (recipes.length == 0) {
        console.log("fetching data from API");
        const response = await fetch(
          "https://api.edamam.com/api/recipes/v2?type=public&&calories=500-1000&app_id=ec287221&app_key=9fedf51101deeaf2225eb4ce999499fd&count=20"
        );
        const { hits: recipesData } = await response.json();
        let newRecipesData = [];
        if (localStorage.getItem("likedRecipesStorage")) {
          const likedRecFromStorageLabels = JSON.parse(
            localStorage.getItem("likedRecipesStorage")
          ).map((item) => item.label);
          newRecipesData = recipesData.map((item, index) => {
            if (likedRecFromStorageLabels.includes(item.recipe.label)) {
              return { key: index, ...item.recipe, liked: true };
            } else {
              return { key: index, ...item.recipe, liked: false };
            }
          });
        } else {
          newRecipesData = recipesData.map((item, index) => {
            return { key: index, ...item.recipe, liked: false };
          });
        }

        setRecipes(newRecipesData);
        setFilteredRecipes(newRecipesData);
      }
    };

    getRecipes();
  }, []);

  useEffect(() => {
    let filtered = [...recipes];

    if (likedRecipesFilterOn) {
      filtered = filtered.filter((rec) => rec.liked == true);
    }

    if (titleFilter !== "") {
      filtered = filtered.filter((rec) =>
        rec.label.toUpperCase().includes(titleFilter.toUpperCase())
      );
    }

    if (calFilter.length !== 0) {
      filtered = filtered.filter(
        (rec) => rec.calories >= calFilter[0] && rec.calories <= calFilter[1]
      );
    }

    const trueHealthKeys = Object.entries(healthFilters)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    if (trueHealthKeys.length > 0) {
      filtered = filtered.filter((rec) =>
        trueHealthKeys.every((key) => rec.healthLabels.includes(key))
      );
    }
    if (mealTypeFilters.length > 0) {
      filtered = filtered.filter((rec) =>
        mealTypeFilters.some((key) => rec.mealType.includes(key.toLowerCase()))
      );
    }

    if (dishTypeFilters.length > 0) {
      filtered = filtered.filter((rec) =>
        dishTypeFilters.some((key) => rec.dishType.includes(key.toLowerCase()))
      );
    }

    setFilteredRecipes(filtered);
  }, [
    titleFilter,
    calFilter,
    healthFilters,
    mealTypeFilters,
    dishTypeFilters,
    likedRecipesFilterOn,
    likedRecipes,
  ]);

  const addLikedRecipe = (key) => {
    const filteredRecipesCopy = filteredRecipes.map((item) => {
      if (item.key == key) return { ...item, liked: true };
      else return item;
    });
    setFilteredRecipes(filteredRecipesCopy);

    const recipesCopy = recipes.map((item) => {
      if (item.key == key) return { ...item, liked: true };
      else return item;
    });
    setRecipes(recipesCopy);
  };

  const removeLikedRecipe = (key) => {
    const filteredRecipesCopy = filteredRecipes.map((item) => {
      if (item.key == key) return { ...item, liked: false };
      else return item;
    });
    setFilteredRecipes(filteredRecipesCopy);

    const recipesCopy = recipes.map((item) => {
      if (item.key == key) return { ...item, liked: false };
      else return item;
    });

    setRecipes(recipesCopy);
  };

  return (
    <div className="App">
      {!recipeSelected && (
        <div>
          <Banner />
          <div style={{ display: "flex" }}>
            <SideBar
              {...{
                setCalFilter,
                setTitleFilter,
                titleFilter,
                healthFilters,
                setHealthFilters,
                mealTypeFilters,
                setMealTypeFilters,
                setDishTypeFilters,
                setLikedRecipesFilterOn,
                likedRecipesFilterOn,
              }}
            />
            <div
              className="container"
              style={{
                display: "flex",
                gap: "5%",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              {filteredRecipes.map((recipe) => {
                return (
                  <RecipeReviewCard
                    key={recipe.key}
                    recipe={recipe}
                    setRecipeSelected={setRecipeSelected}
                    setSelectedRecipe={setSelectedRecipe}
                    setLikedRecipes={setLikedRecipes}
                    likedRecipes={likedRecipes}
                    addLikedRecipe={addLikedRecipe}
                    removeLikedRecipe={removeLikedRecipe}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      {recipeSelected && (
        <RecipeDetails
          setRecipeSelected={setRecipeSelected}
          selectedRecipe={selectedRecipe}
        />
      )}
    </div>
  );
}

export default App;
