import { useState } from "react";
import { Drawer, Typography } from "@mui/material";
import { TextField } from "../../Common/Common.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ChevronLeft, FilterSharp } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { RowContainer, Button } from "../../Common/Common.style";
import DishTypeSelect from "../DishTypeSelect/DishTypeSelect";
import MealTypeSelect from "../MealTypeSelect/MealTypeSelect";
import React from 'react';



const SideBar = ({ setTitleFilter, setCalFilter, titleFilter, healthFilters, setHealthFilters, mealTypeFilters, setMealTypeFilters, setDishTypeFilters, setLikedRecipesFilterOn, likedRecipesFilterOn}) => {
  const [calories, setCalories] = useState([500, 3000]);


  const handleCaloriesChange = (event, newValue) => {
    setCalories(newValue);
    setCalFilter(newValue);
    console.log("newValue: " + newValue.length);
  };


  return (
    <div>
      <Box sx={{ width: 350, p: 3 }}>
        <TextField
          sx={{ width: "80%", marginTop: "10%" }}
          variant="standard"
          label="Free Search..."
          size="small"
          value={titleFilter}
          onChange={(e) => {
            setTitleFilter(e.target.value);
          }}
        ></TextField>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "15%",
            marginBottom: "15%",
          }}
        >
          <Slider
            sx={{
              color: "black",
              alignSelf: "center",
              width: "80%",
            }}
            getAriaLabel={() => 'Calories range'}
            value={calories}
            min={500}
            max={3000}
            size={"small"}
            onChange={handleCaloriesChange}
            valueLabelDisplay="on"
          />
          Calories
        </div>
        <RowContainer
          style={{
            height: "100px",
            marginBottom: "15%",
            flexWrap: "wrap",
            justifyContent: "space-around",
            
          }}
        >
         
          <Button style={{ backgroundColor: healthFilters["Vegan"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Vegan": !healthFilters["Vegan"]})}>Vegan</Button>
          <Button style={{ backgroundColor: healthFilters["Gluten-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Gluten-Free": !healthFilters["Gluten-Free"]})} sx={{ alignSelf: "flex-start", color: "" }}>
            Gluten-Free
          </Button>
          <Button style={{ backgroundColor: healthFilters["Dairy-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Dairy-Free": !healthFilters["Dairy-Free"]})}>Dairy-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Egg-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Egg-Free": !healthFilters["Egg-Free"]})} sx={{ alignSelf: "flex-start" }}>Egg-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Wheat-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Wheat-Free": !healthFilters["Wheat-Free"]})}>Wheat-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Peanut-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Peanut-Free": !healthFilters["Peanut-Free"]})} sx={{ alignSelf: "flex-start" }}>Peanut-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Lupine-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Lupine-Free": !healthFilters["Lupine-Free"]})}>Lupine-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Fish-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Fish-Free": !healthFilters["Fish-Free"]})}>Fish-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Mollusk-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Mollusk-Free": !healthFilters["Mollusk-Free"]})} sx={{ alignSelf: "flex-start" }}>Mollusk-Free</Button>
          <Button style={{ backgroundColor: healthFilters["Alcohol-Free"] ? 'lightskyblue' : undefined }} onClick={() => setHealthFilters({...healthFilters, "Alcohol-Free": !healthFilters["Alcohol-Free"]})}>Alcohol-Free</Button>
        </RowContainer>
        <DishTypeSelect setDishTypeFilters={setDishTypeFilters}/>
        <MealTypeSelect mealTypeFilters={mealTypeFilters} setMealTypeFilters={setMealTypeFilters}/>
        <Button style={{ backgroundColor: likedRecipesFilterOn ? 'lightskyblue' : undefined, marginTop: "10%" }} onClick={() => setLikedRecipesFilterOn(!likedRecipesFilterOn)}>Liked Recipes</Button>
        
      </Box>
    </div>
  );
};

export default SideBar;
