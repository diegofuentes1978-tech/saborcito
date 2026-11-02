const API_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function searchRecipes(query = '') {
  const response = await fetch(
    `${API_URL}/search.php?s=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('No se pudieron obtener las recetas')
  }

  const data = await response.json()

  return data.meals || []
}

export async function getRecipeById(id) {
  const response = await fetch(
    `${API_URL}/lookup.php?i=${id}`
  )

  if (!response.ok) {
    throw new Error('No se pudo obtener el detalle')
  }

  const data = await response.json()

  return data.meals?.[0] || null
}

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/categories.php`
  )

  if (!response.ok) {
    throw new Error('No se pudieron obtener las categorías')
  }

  const data = await response.json()

  return data.categories || []
}