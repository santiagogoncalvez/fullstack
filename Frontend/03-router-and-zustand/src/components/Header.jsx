import { NavLink } from 'react-router'
import { Link } from './Link'
import { ThemeToggle } from './ThemeToggle'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/favoritesStore'

export function Header () {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoritesStore()

  const numberOfFavorites = countFavorites()

  return (
    <header>
      <Link href='/' className="brand">
        <span className="brand-mark" aria-hidden="true">L</span>
        LaburoDev
      </Link>

      <nav>
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link-active' : ''}
          to="/search">Empleos</NavLink>
          {
            isLoggedIn && (
              <NavLink
                className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                to="/profile">
                  Perfil {numberOfFavorites > 0 && `(${numberOfFavorites})`}
              </NavLink>
            )
          }
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <HeaderUserButton />
      </div>

    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  const { clearFavorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    clearFavorites()
  }

  return isLoggedIn
    ? <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Cerrar sesión</button>
    : <button className="btn btn-primary btn-sm" onClick={login}>Iniciar sesión</button>
}
