
import { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'

import Navbar from '../../components/Navbar/Navbar'
import SearchBar from '../../components/SearchBar/SearchBar'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

import { useRecipes } from '../../hooks/useRecipes'
import { getCategories } from '/src/service/recipeApi.js'

import styles from './Home.module.css'

function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

  const { recipes, loading, error } = useRecipes(
    query,
    category
  )

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error('Error al cargar categorías:', err)
      }
    }

    loadCategories()
  }, [])

  function handleSearch(value) {
    setQuery(value)
    setCategory('')
  }

  function handleCategory(value) {
    setCategory(value)
    setQuery('')
  }

  return (
    <>
      <Navbar />

      <main className={styles.main}>

        <section className={styles.hero}>
          <span className={styles.tag}>
            🍓 COCINAR NUNCA FUE TAN FÁCIL
          </span>

          <h1>
            Descubrí el placer de
            <span> cocinar rico </span>
          </h1>

          <p>
            Encontrá inspiración para tus comidas
            y sorprendé a todos con recetas deliciosas.
          </p>

          <SearchBar
            value={query}
            onChange={handleSearch}
          />
        </section>

        <section className={styles.categories}>
          <h2>Explorá por categorías 🍽️</h2>

          <div className={styles.categoryList}>
            <Button
              variant={!category ? 'contained' : 'outlined'}
              onClick={() => handleCategory('')}
            >
              Todas
            </Button>

            {categories.map((item) => (
              <Button
                key={item.idCategory}
                variant={
                  category === item.strCategory
                    ? 'contained'
                    : 'outlined'
                }
                onClick={() =>
                  handleCategory(item.strCategory)
                }
              >
                {item.strCategory}
              </Button>
            ))}
          </div>
        </section>

        <section className={styles.recipes}>
          <h2>
            {category
              ? `Recetas de ${category}`
              : query
                ? 'Resultados de búsqueda'
                : 'Recetas para inspirarte ✨'}
          </h2>

          {loading && (
            <div className={styles.message}>
              <CircularProgress color="primary" />
              <p>Buscando recetas deliciosas...</p>
            </div>
          )}

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          {!loading && !error && recipes.length === 0 && (
            <p className={styles.message}>
              No encontramos recetas. Probá con otra búsqueda.
            </p>
          )}

          {!loading && recipes.length > 0 && (
            <div className={styles.grid}>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                />
              ))}
            </div>
          )}
        </section>

      </main>
    </>
  )
}

export default Home
