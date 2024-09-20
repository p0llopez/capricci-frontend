const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL

export const refreshAccessToken = async (refreshToken: string | null) => {
  try {
    if (!refreshToken) throw new Error("No refresh token found")

    const response = await fetch(`${API_BASE_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) throw new Error("Failed to refresh access token")

    const data = (await response.json()) as { refresh: string; access: string }
    return data.access
  } catch (error) {
    console.error("Error refreshing access token:", error)
    return null
  }
}

export const verifyToken = async (token: string | null): Promise<boolean> => {
  if (!token) return false

  const response = await fetch(`${API_BASE_URL}/token/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
  if (!response.ok) return false

  return true
}
