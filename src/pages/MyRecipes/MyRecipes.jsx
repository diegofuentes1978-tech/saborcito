
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useRecipeStore } from '../../store/recipeStore'
import styles from './MyRecipes.module.css'

function MyRecipes() {
  const myRecipes = useRecipeStore(
    (state) => state.myRecipes
  )

  const addRecipe = useRecipeStore(
    (state) => state.addRecipe
  )

  const updateRecipe = useRecipeStore(
    (state) => state.updateRecipe
  )

  const deleteRecipe = useRecipeStore(
    (state) => state.deleteRecipe
  )

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    strMeal: '',
    ingredients: '',
    strInstructions: '',
    strMealThumb: ''
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function resetForm() {
    setForm({
      strMeal: '',
      ingredients: '',
      strInstructions: '',
      strMealThumb: ''
    })

    setEditingId(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const recipe = {
      ...form,
      idMeal: editingId || `local-${Date.now()}`,
      strMealThumb:
        form.strMealThumb.trim() ||
        'https://placehold.co/600x400/FFF0DF/F26B4F?text=Mi+receta'
    }

    if (editingId) {
      updateRecipe(recipe)
      alert('¡Tu receta se actualizó correctamente! ❤️')
    } else {
      addRecipe(recipe)
      alert('¡Tu receta se guardó correctamente! 🍓')
    }

    resetForm()
  }

  function handleEdit(recipe) {
    setForm({
      strMeal: recipe.strMeal,
      ingredients: recipe.ingredients || '',
      strInstructions: recipe.strInstructions,
      strMealThumb: recipe.strMealThumb || ''
    })

    setEditingId(recipe.idMeal)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que querés eliminar esta receta?'
    )

    if (confirmDelete) {
      deleteRecipe(id)

      if (editingId === id) {
        resetForm()
      }
    }
  }

  return (
    <>
      <Navbar />

      <main className={styles.container}>

        <h1>Mis recetas 📝</h1>

        <p className={styles.description}>
          ¡Este es tu rincón de cocina! Compartí tus
          creaciones y guardá tus recetas favoritas.
        </p>

        <section className={styles.formCard}>

          <h2>
            {editingId
              ? '✏️ Editar mi receta'
              : '🍓 Crear una nueva receta'}
          </h2>

          <form onSubmit={handleSubmit}>

            <label htmlFor="strMeal">
              Nombre de la receta
            </label>

            <input
              id="strMeal"
              type="text"
              name="strMeal"
              value={form.strMeal}
              onChange={handleChange}
              placeholder="Ej: Panqueques caseros"
              required
            />

            <label htmlFor="strMealThumb">
              Imagen de la receta (URL opcional)
            </label>

            <input
              id="strMealThumb"
              type="url"
              name="strMealThumb"
              value={form.strMealThumb}
              onChange={handleChange}
              placeholder="Pegá aquí el enlace de una imagen"
            />

            <label htmlFor="ingredients">
              Ingredientes y cantidades
            </label>

            <textarea
              id="ingredients"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder={'Ejemplo:\n2 tazas de harina\n1 taza de leche\n2 huevos\n1 cucharada de azúcar'}
              rows="5"
              required
            />

            <label htmlFor="strInstructions">
              Preparación paso a paso
            </label>

            <textarea
              id="strInstructions"
              name="strInstructions"
              value={form.strInstructions}
              onChange={handleChange}
              placeholder="Contanos cómo preparar esta deliciosa receta..."
              rows="6"
              required
            />

            <button type="submit">
              {editingId
                ? '✏️ Guardar cambios'
                : '🍓 Publicar mi receta'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancelar edición
              </button>
            )}

          </form>

        </section>

        <section className={styles.list}>

          <h2>Mis creaciones 🍽️</h2>

          {myRecipes.length === 0 ? (
            <p>
              Todavía no agregaste recetas.
              ¡Animate a crear la primera! ❤️
            </p>
          ) : (
            <div className={styles.grid}>

              {myRecipes.map((recipe) => (
                <article
                  key={recipe.idMeal}
                  className={styles.recipeCard}
                >

                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />

                  <h3>{recipe.strMeal}</h3>

                  <p>{recipe.ingredients}</p>

                  <div className={styles.actions}>

                    <button
                      type="button"
                      onClick={() => handleEdit(recipe)}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(recipe.idMeal)}
                      className={styles.deleteButton}
                    >
                      🗑️ Eliminar receta
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>
    </>
  )
}

export default MyRecipes
