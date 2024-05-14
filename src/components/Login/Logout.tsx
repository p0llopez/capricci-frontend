const LogoutButton = () => {
	const handleLogout = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")
		localStorage.removeItem("userId")
		window.location.href = "/"
	}

	return (
		<>
			<button
				onClick={handleLogout}
				className="w-full rounded-md bg-bluegray py-3 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
			>
				¿Quieres cerrar tu sesion?
			</button>
		</>
	)
}

export default LogoutButton
