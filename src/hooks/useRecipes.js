
import { useEffect, useState } from 'react'
import {
  searchRecipes,
  getRecipesByCategory
} from '/src/service/recipeApi.js'

export function useRecipes(query = '', category = '') {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadRecipes() {
      try {
        setLoading(true)
        setError('')

        const data = category
          ? await getRecipesByCategory(category)
          : await searchRecipes(query)

        if (active) {
          setRecipes(data)
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

    loadRecipes()

    return () => {
      active = false
    }
  }, [query, category])

  return { recipes, loading, error }
}
