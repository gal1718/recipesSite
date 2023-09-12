import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Typography } from "../../Common/Common.style";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const RecipeReviewCard = ({
  recipe,
  addLikedRecipe,
  removeLikedRecipe,
  setRecipeSelected,
  setSelectedRecipe,
  likedRecipes,
  setLikedRecipes,
}) => {
  const handleRecipeSelection = () => {
    setSelectedRecipe(recipe);
    setRecipeSelected(true);
  };

  const handleLikedRecipe = (event) => {
    event.stopPropagation();
    if (recipe.liked == false) {
      event.target.style.color = "red";
      setLikedRecipes([...likedRecipes, recipe]); //add to local storage var then with useaffect
      addLikedRecipe(recipe.key);
    } else {
      removeLikedRecipe(recipe.key);
      event.target.style.color = "initial";
      const newLikedRecipes = likedRecipes.filter(
        (item) => item.key != recipe.key
      );
      setLikedRecipes(newLikedRecipes);
    }
  };

  useEffect(() => {
    localStorage.setItem("likedRecipesStorage", JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  return (
    <Card
      onClick={() => handleRecipeSelection()}
      sx={{ marginBottom: "4%", marginTop: "4%", minWidth: "25%" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.label[0]}
          </Avatar>
        }
        title={recipe.label}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          style={{ color: recipe.liked ? "red" : undefined }}
          onClick={(event) => handleLikedRecipe(event)}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
