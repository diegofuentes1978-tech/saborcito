import { useEffect, useState } from 'react'
import { searchRecipes } from '../services/recipeApi'

export function useRecipes(query = '') {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadRecipes() {
      try {
        setLoading(true)
        setError('')

        const data = await searchRecipes(query)

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
  }, [query])

  return {
    recipes,
    loading,
    error,
  }
}