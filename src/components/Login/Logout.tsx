const LogoutButton = () => {
	const handleLogout = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")
		localStorage.removeItem("userId")
		window.location.href = "/"
	}

	return (
		<>
			<button onClick={handleLogout}>Cerrar sesión</button>
		</>
	)
}

export default LogoutButton
