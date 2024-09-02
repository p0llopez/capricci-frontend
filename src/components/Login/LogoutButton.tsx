import { clearTokens } from "@/stores/User"

export default function LogoutButton() {
  const handleLogout = () => {
    clearTokens()
    window.location.href = "/"
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-md bg-bluegray py-3 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
    >
      ¿Quieres cerrar tu sesion?
    </button>
  )
}
