
import { Button, Card, CardMedia, CardContent } from '@mui/material'
import { useRecipeStore } from '../../store/recipeStore'
import styles from './RecipeCard.module.css'

function RecipeCard({ recipe }) {
  const addFavorite = useRecipeStore(
    (state) => state.addFavorite
  )

  const favorites = useRecipeStore(
    (state) => state.favorites
  )

  const isFavorite = favorites.some(
    (item) => item.idMeal === recipe.idMeal
  )

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="190"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <CardContent>
        <h3 className={styles.title}>
          {recipe.strMeal}
        </h3>

        <Button
          variant="contained"
          fullWidth
          onClick={() => addFavorite(recipe)}
          disabled={isFavorite}
          sx={{
            backgroundColor: '#F26B4F',
            '&:hover': {
              backgroundColor: '#db553a'
            }
          }}
        >
          {isFavorite ? '❤️ En favoritos' : '♡ Agregar a favoritos'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecipeCard
