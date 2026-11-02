import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRecipeStore = create(
  persist(
    (set) => ({
      favorites: [],
      myRecipes: [],

      addFavorite: (recipe) =>
        set((state) => ({
          favorites: state.favorites.some(
            (item) => item.idMeal === recipe.idMeal
          )
            ? state.favorites
            : [...state.favorites, recipe],
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