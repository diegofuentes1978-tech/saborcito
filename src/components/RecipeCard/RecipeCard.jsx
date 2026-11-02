
import {
  Button,
  Card,
  CardMedia,
  CardContent
} from '@mui/material'

import { Link } from 'react-router-dom'
import { useRecipeStore } from '../../store/recipeStore'
import styles from './RecipeCard.module.css'

function RecipeCard({ recipe }) {
  const addFavorite = useRecipeStore(
    (state) => state.addFavorite
  )

  const removeFavorite = useRecipeStore(
    (state) => state.removeFavorite
  )

  const favorites = useRecipeStore(
    (state) => state.favorites
  )

  const isFavorite = favorites.some(
    (item) => item.idMeal === recipe.idMeal
  )

  function handleFavorite() {
    if (isFavorite) {
      removeFavorite(recipe.idMeal)
    } else {
      addFavorite(recipe)
    }
  }

  return (
    <Card className={styles.card}>

      <Link to={`/receta/${recipe.idMeal}`}>
        <CardMedia
          component="img"
          height="190"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
      </Link>

      <CardContent>

        <h3 className={styles.title}>
          {recipe.strMeal}
        </h3>

        <Button
          variant="contained"
          fullWidth
          onClick={handleFavorite}
          sx={{
            backgroundColor: '#F26B4F',
            '&:hover': {
              backgroundColor: '#db553a'
            }
          }}
        >
          {isFavorite
            ? '❤️ Quitar de favoritos'
            : '♡ Agregar a favoritos'}
        </Button>

      </CardContent>
    </Card>
  )
}

export default RecipeCard
