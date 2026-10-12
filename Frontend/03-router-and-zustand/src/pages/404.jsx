import { Link } from "../components/Link"

export default function NotFoundPage () {
  return (
    <main style={{ maxWidth: '70rem', margin: '0 auto', padding: '4rem var(--gutter)', textAlign: 'left' }}>
      <h1>404 — Página no encontrada</h1>
      <p style={{ color: 'var(--text-2)', margin: '0.5rem 0 1.5rem' }}>La página que buscas no existe.</p>
      <Link href="/" className="btn btn-primary">Volver al inicio</Link>
    </main>
  )
}
