
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

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            🏠 Inicio
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            ❤️ Favoritos
          </NavLink>

          <NavLink
            to="/mis-recetas"
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            📝 Mis recetas
          </NavLink>

          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            🍰 Nosotros
          </NavLink>

        </nav>

      </div>
    </header>
  )
}

export default Navbar
