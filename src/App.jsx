
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'

function MyRecipes() {
  return <h1>Mis recetas 📝</h1>
}

function About() {
  return <h1>Sobre nosotros 👩‍🍳</h1>
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/favoritos"
        element={<Favorites />}
      />

      <Route
        path="/receta/:id"
        element={<RecipeDetail />}
      />

      <Route
        path="/mis-recetas"
        element={<MyRecipes />}
      />

      <Route
        path="/nosotros"
        element={<About />}
      />

    </Routes>
  )
}

export default App
