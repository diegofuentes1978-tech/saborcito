import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRecipeStore = create(
  persist(
    (set) => ({
      favorites: [],
      myRecipes: [],

     addRecipe: (recipe) =>
  set((state) => ({
    myRecipes: state.myRecipes.some(
      (item) => item.idMeal === recipe.idMeal
    )
      ? state.myRecipes
      : [...state.myRecipes, recipe],
  })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (recipe) => recipe.idMeal !== id
          ),
        })),

      addRecipe: (recipe) =>
        set((state) => ({
          myRecipes: [
            ...state.myRecipes,
            recipe,
          ],
        })),

      updateRecipe: (updatedRecipe) =>
        set((state) => ({
          myRecipes: state.myRecipes.map((recipe) =>
            recipe.idMeal === updatedRecipe.idMeal
              ? updatedRecipe
              : recipe
          ),
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          myRecipes: state.myRecipes.filter(
            (recipe) => recipe.idMeal !== id
          ),
        })),
    }),
    {
      name: 'saborcito-storage',
    }
  )
)