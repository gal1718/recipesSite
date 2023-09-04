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
  const [filteresRecipes, setFilteredRecipes] = useState([]);
  const [healthFilters, setHealthFilters] = useState({
    "Gluten-Free": false,
    "Vegan": false,
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
  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {
    getRecipes();
  }, []);

  
  useEffect(() => {
    // Create a copy of the recipes and apply all filters together
    let filtered = [...recipes];

    if (titleFilter !== "") {
      filtered = filtered.filter((rec) =>
        rec.label.toUpperCase().includes(titleFilter.toUpperCase())
      );
    }

    if (calFilter.length !== 0) {
      filtered = filtered.filter(
        (rec) =>
          rec.calories >= calFilter[0] && rec.calories <= calFilter[1]
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

    // Set the filtered recipes
    setFilteredRecipes(filtered);
  }, [titleFilter, calFilter, healthFilters, recipes]);

  const getRecipes = async () => {
    const api = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=ec287221&app_key=9fedf51101deeaf2225eb4ce999499fd&count=20");
    const {hits} = await api.json();
    console.log("recipes length: " + hits.length);
    console.log("recipes : " + JSON.stringify(hits));
    setRecipes(hits.map((item) => item.recipe));
    setFilteredRecipes(hits.map((item) => item.recipe));
    // setRecipes(
    //   recipesData.recipesArr.map((item) => ({
    //     label: item.recipe.label,
    //     image: saladImg,
    //     ingredients: item.recipe.ingredients,
    //     mealType: item.recipe.mealType,
    //     dishType: item.recipe.dishType,
    //     calories: item.recipe.calories,
    //     healthLabels: item.recipe.healthLabels,
    //   }))   
    // );
    // setFilteredRecipes(
    //   recipesData.recipesArr.map((item) => ({
    //     label: item.recipe.label,
    //     image: saladImg,
    //     ingredients: item.recipe.ingredients,
    //     mealType: item.recipe.mealType,
    //     dishType: item.recipe.dishType,
    //     calories: item.recipe.calories,
    //     healthLabels: item.recipe.healthLabels,
    //   }))   
    // );
    console.log("recipes : " + JSON.stringify(recipes));
    // console.log("data " + JSON.stringify(data));
    //console.log("recipes " + JSON.stringify(recipesData));
    //  setRecipes(recipesData.recipesArr.map((item) => ({
    //   label: item.recipe.label,
    //   image: item.recipe.image,
    //   ingredients: item.recipe.ingredients,
    //   mealType: item.recipe.mealType,
    //   dishType: item.recipe.dishType,
    //   calories: item.recipe.calories
    // })));
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
              {filteresRecipes.map((recipe, index) => {
                  return (
                    <RecipeReviewCard
                      key={index}
                      recipe={recipe}
                      setRecipeSelected={setRecipeSelected}
                      setSelectedRecipe={setSelectedRecipe}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {recipeSelected && <RecipeDetails setRecipeSelected={setRecipeSelected} selectedRecipe={selectedRecipe} />}
    </div>
  );
}

export default App;
