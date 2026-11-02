
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <Link to="/" className={styles.logo}>
          🍓 Saborcito
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <NavLink to="/mis-recetas">Mis recetas</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
