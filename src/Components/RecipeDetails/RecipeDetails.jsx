import React from "react";
import { Typography } from "../../Common/Common.style";
import { Container } from "@mui/material";

const RecipeDetails = ({ setRecipeSelected, selectedRecipe }) => {
  return (
    <div className="RecipeDetails">
      <span
        style={{ float: "left", margin: "2px" }}
        onClick={() => setRecipeSelected(false)}
      >
        Go Back
      </span>
      <Container>
        <h2>{selectedRecipe.label}</h2>
        <img src={selectedRecipe.image}></img>
        <Typography style={{ marginTop: "5%" }}>
          {selectedRecipe.ingredientLines
            .toString()
            .split(",")
            .map((line, i) => (
              <div key={i}>{line}</div>
            ))}
        </Typography>
      </Container>
    </div>
  );
};

export default RecipeDetails;
