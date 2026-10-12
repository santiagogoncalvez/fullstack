import { useRouter } from "../hooks/useRouter"
import styles from "./Home.module.css"

export default function HomePage () {
  const { navigateTo } = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchTerm = formData.get('search')

    const url = searchTerm
      ? `/search?text=${encodeURIComponent(searchTerm)}`
      : '/search'

    navigateTo(url)
  }

  return (
    <main>
      <section className="jobs-search">
        <h1>Encontrá el trabajo que buscás</h1>
        <p>La comunidad de desarrolladores donde están las mejores oportunidades.</p>

        <form role="search" onSubmit={handleSearch}>
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              name="search"
              required
              type="search"
              placeholder="Buscar empleos por título, habilidad o empresa"
            />

            <button className="btn btn-primary" type="submit">Buscar</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <header>
          <h2>¿Por qué LaburoDev?</h2>
          <p>Conectamos a los mejores talentos con las empresas más innovadoras.</p>
        </header>

        <div className={styles.rows}>
          <article className={styles.row}>
            <h3>Encontrá el trabajo de tus sueños</h3>
            <p>Busca miles de empleos de las mejores empresas de todo el mundo.</p>
          </article>

          <article className={styles.row}>
            <h3>Conecta con las mejores empresas</h3>
            <p>Conecta con empresas que están contratando por tus habilidades.</p>
          </article>

          <article className={styles.row}>
            <h3>Obtén el salario que mereces</h3>
            <p>Obtén el salario que mereces con nuestra calculadora de salarios.</p>
          </article>
        </div>

      </section>
    </main>
  )
}
