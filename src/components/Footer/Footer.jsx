
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        <div className={styles.brand}>
          <h2>🍓 Saborcito</h2>

          <p>
            Descubrí, creá y compartí recetas
            deliciosas. Porque cocinar es una
            forma de compartir amor.
          </p>
        </div>

        <div className={styles.links}>
          <h3>Explorá Saborcito</h3>

          <Link to="/">🏠 Inicio</Link>
          <Link to="/favoritos">❤️ Favoritos</Link>
          <Link to="/mis-recetas">📝 Mis recetas</Link>
          <Link to="/nosotros">🍰 Nosotros</Link>
        </div>

        <div className={styles.social}>
          <h3>¡Compartamos sabores!</h3>

          <p>❤️ Hecho con mucho amor.</p>
          <p>👩‍🍳 ¡Cocinemos juntos!</p>
          <p>🍓 Gracias por visitar Saborcito.</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Saborcito.
          Todos los derechos reservados.
        </p>
      </div>

    </footer>
  )
}

export default Footer
