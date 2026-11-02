
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Favorites from './pages/Favorites/Favorites'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import MyRecipes from './pages/MyRecipes/MyRecipes'
import About from './pages/About/About'

import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
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

        <Route
          path="*"
          element={<h1>Página no encontrada 🍓</h1>}
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App
