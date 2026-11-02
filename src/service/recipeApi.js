
const API_URL = 'https://www.themealdb.com/api/json/v1/1'

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`)

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor')
    }

    return await response.json()

  } catch (error) {
    console.error('Error en la API:', error)

    throw new Error(
      'No pudimos obtener la información. Revisá tu conexión e intentá nuevamente.'
    )
  }
}

export async function searchRecipes(query = '') {
  const data = await fetchData(
    `search.php?s=${encodeURIComponent(query)}`
  )

  return data.meals || []
}

export async function getRecipeById(id) {
  const data = await fetchData(
    `lookup.php?i=${encodeURIComponent(id)}`
  )

  return data.meals?.[0] || null
}

export async function getCategories() {
  const data = await fetchData('categories.php')

  return data.categories || []
}

export async function getRecipesByCategory(category) {
  const data = await fetchData(
    `filter.php?c=${encodeURIComponent(category)}`
  )

  return data.meals || []
}
