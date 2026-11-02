
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CircularProgress, Button } from '@mui/material'

import Navbar from '../../components/Navbar/Navbar'
import { getRecipeById } from '/src/service/recipeApi'

import styles from './RecipeDetail.module.css'

function RecipeDetail() {
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadRecipe() {
      try {
        setLoading(true)
        setError('')

        const data = await getRecipeById(id)

        if (active) {
          if (!data) {
            setError('No encontramos esta receta.')
          } else {
            setRecipe(data)
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadRecipe()

    return () => {
      active = false
    }
  }, [id])

  function getIngredients() {
    if (!recipe) return []

    const ingredients = []

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || ''
        })
      }
    }

    return ingredients
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.message}>
          <CircularProgress />
          <p>Cargando receta...</p>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className={styles.message}>
          <h2>{error}</h2>
          <Button component={Link} to="/">
            Volver al inicio
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className={styles.container}>

        <Button component={Link} to="/" variant="outlined">
          ← Volver a recetas
        </Button>

        <div className={styles.header}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />

          <div>
            <span className={styles.category}>
              {recipe.strCategory}
            </span>

            <h1>{recipe.strMeal}</h1>

            <p>🌎 Origen: {recipe.strArea}</p>

            {recipe.strTags && (
              <p>🏷️ {recipe.strTags}</p>
            )}
          </div>
        </div>

        <section className={styles.content}>

          <div className={styles.ingredients}>
            <h2>🛒 Ingredientes</h2>

            {getIngredients().map((item, index) => (
              <div
                key={index}
                className={styles.ingredient}
              >
                <span>{item.name}</span>
                <strong>{item.measure}</strong>
              </div>
            ))}
          </div>

          <div className={styles.instructions}>
            <h2>👩‍🍳 Preparación</h2>

            <p>{recipe.strInstructions}</p>

            {recipe.strYoutube && (
              <Button
                variant="contained"
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: 3 }}
              >
                Ver video de preparación ▶
              </Button>
            )}
          </div>

        </section>

      </main>
    </>
  )
}

export default RecipeDetail
