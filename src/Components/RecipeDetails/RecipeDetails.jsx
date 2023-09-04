import React from 'react';


const RecipeDetails = ({setRecipeSelected, selectedRecipe}) => {

    console.log(JSON.stringify(selectedRecipe));
    
  return (
    <div className="RecipeDetails">
        <span style={{float: "left", margin: "2px"}} onClick={()=> setRecipeSelected(false)}>Back</span>
     RecipeDetails:
     <h2>{selectedRecipe.label}</h2>
    </div>
  );
}

export default RecipeDetails;