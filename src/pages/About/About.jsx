
import Navbar from '../../components/Navbar/Navbar'
import styles from './About.module.css'

function About() {
  return (
    <>
      <Navbar />

      <main className={styles.container}>

        {/* Presentación principal */}
        <section className={styles.hero}>
          <span>🍓 NUESTRA HISTORIA</span>

          <h1>
            Cocinar es compartir amor ❤️
          </h1>

          <p>
            En Saborcito creemos que cada receta
            cuenta una historia y que cada plato
            puede convertirse en un recuerdo especial.
            ¡La cocina nos une!
          </p>

          <div className={styles.emoji}>
            🥑 🥞 🍓 🍰 🍕
          </div>
        </section>

        {/* Nuestra historia */}
        <section className={styles.content}>
          <h2>¿Qué es Saborcito? 🍽️</h2>

          <p>
            Saborcito es un espacio creado para
            descubrir, organizar y compartir recetas
            deliciosas de diferentes partes del mundo.
          </p>

          <p>
            Queremos que encuentres inspiración para
            tus comidas, aprendas nuevas preparaciones
            y te animes a crear tus propias recetas.
          </p>

          <p>
            Nuestra misión es hacer que cocinar sea
            una experiencia sencilla, creativa y divertida,
            para disfrutar en familia y con amigos.
          </p>
        </section>

        {/* Nuestros valores */}
        <section className={styles.cards}>

          <article>
            <span>❤️</span>
            <h3>Pasión</h3>
            <p>
              Amamos la cocina y todo lo que
              podemos crear con ingredientes simples
              y mucho cariño.
            </p>
          </article>

          <article>
            <span>🌎</span>
            <h3>Descubrimiento</h3>
            <p>
              Exploramos sabores, ingredientes
              y recetas de diferentes culturas
              del mundo.
            </p>
          </article>

          <article>
            <span>👩‍🍳</span>
            <h3>Creatividad</h3>
            <p>
              Cada persona puede crear, organizar
              y compartir sus propias recetas.
            </p>
          </article>

        </section>

        {/* Contacto */}
        <section className={styles.contact}>
          <h2>¡Hablemos! 💌</h2>

          <p>
            ¿Tenés alguna sugerencia, consulta
            o receta deliciosa para compartir?
            ¡Nos encantaría conocerte!
          </p>

          <a href="mailto:hola@saborcito.com">
            Escribinos por correo electrónico
          </a>
        </section>

      </main>
    </>
  )
}

export default About
