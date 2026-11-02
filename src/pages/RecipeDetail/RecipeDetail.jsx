
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CircularProgress, Button } from '@mui/material'

import Navbar from '../../components/Navbar/Navbar'

import {
  getRecipeById
} from '../../service/recipeApi'

import {
  translateRecipeName,
  translateCategory,
  translateIngredient,
  translateArea,
  translateMeasure
} from '../../utils/translations'

import styles from './RecipeDetail.module.css'

// Divide textos largos en fragmentos para traducirlos
async function translateLongText(text) {
  const words = text.split(/\s+/)
  const chunks = []
  let currentChunk = ''

  words.forEach((word) => {
    if ((currentChunk + ' ' + word).length > 450) {
      chunks.push(currentChunk)
      currentChunk = word
    } else {
      currentChunk += (currentChunk ? ' ' : '') + word
    }
  })

  if (currentChunk) {
    chunks.push(currentChunk)
  }

  const translatedChunks = []

  for (const chunk of chunks) {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|es`
    )

    if (!response.ok) {
      throw new Error('No se pudo traducir el texto')
    }

    const data = await response.json()

    if (data.responseStatus !== 200) {
      throw new Error('El servicio de traducción no está disponible')
    }

    translatedChunks.push(data.responseData.translatedText)
  }

  return translatedChunks.join(' ')
}

function RecipeDetail() {
  const { id } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [instructionsEs, setInstructionsEs] = useState('')
  const [translating, setTranslating] = useState(false)
  const [translationError, setTranslationError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadRecipe() {
      try {
        setLoading(true)
        setError('')
        setRecipe(null)

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
          setError('No pudimos cargar la receta. Intentá nuevamente.')
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

  // Traducir las instrucciones cuando se carga la receta
  useEffect(() => {
    if (!recipe?.strInstructions) return

    let active = true

    async function translateInstructions() {
      try {
        setTranslating(true)
        setTranslationError(false)
        setInstructionsEs('')

        const translated = await translateLongText(
          recipe.strInstructions
        )

        if (active) {
          setInstructionsEs(translated)
        }
      } catch (err) {
        if (active) {
          setInstructionsEs(recipe.strInstructions)
          setTranslationError(true)
        }
      } finally {
        if (active) {
          setTranslating(false)
        }
      }
    }

    translateInstructions()

    return () => {
      active = false
    }
  }, [recipe])

  function getIngredients() {
    if (!recipe) return []

    const ingredients = []

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: translateIngredient(ingredient),
          measure: translateMeasure(measure || '')
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

  if (error || !recipe) {
    return (
      <>
        <Navbar />
        <div className={styles.message}>
          <h2>{error || 'No encontramos esta receta.'}</h2>
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
            alt={translateRecipeName(recipe.strMeal)}
          />

          <div>
            <span className={styles.category}>
              {translateCategory(recipe.strCategory)}
            </span>

            <h1>{translateRecipeName(recipe.strMeal)}</h1>

            <p>
              🌎 Origen: {translateArea(recipe.strArea)}
            </p>

            {recipe.strTags && (
              <p>🏷️ Etiquetas: {recipe.strTags}</p>
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

            {translating ? (
              <div>
                <CircularProgress size={22} />
                <p>Traduciendo la preparación al español...</p>
              </div>
            ) : (
              <>
                {translationError && (
                  <p>
                    No pudimos traducir esta preparación.
                    Mostramos el texto original.
                  </p>
                )}

                <p>{instructionsEs}</p>
              </>
            )}

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
