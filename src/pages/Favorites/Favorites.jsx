
import { useRecipeStore } from '../../store/recipeStore'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Favorites.module.css'

function Favorites() {
  const favorites = useRecipeStore(
    (state) => state.favorites
  )

  return (
    <>
      <Navbar />

      <main className={styles.container}>

        <h1>Mis recetas favoritas ❤️</h1>

        <p className={styles.description}>
          Acá encontrarás todas las recetas que guardaste.
        </p>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <span>🍓</span>

            <h2>Todavía no tenés favoritos</h2>

            <p>
              Explorá nuestras recetas y guardá las que más te gusten.
            </p>

            <Button
              component={Link}
              to="/"
              variant="contained"
            >
              Explorar recetas
            </Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
              />
            ))}
          </div>
        )}

      </main>
    </>
  )
}

export default Favorites
