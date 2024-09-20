const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL

export const checkUserExists = async (email: string) => {
  const encodedEmail = encodeURIComponent(email)
  const response = await fetch(`${API_BASE_URL}/users/exists/${encodedEmail}`)
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

  return (await response.json()) as boolean
}

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/token/pair`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)

  return (await response.json()) as {
    user: { id: string; email: string }
    refresh: string
    access: string
  }
}

export const registerUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, first_name, last_name }),
  })
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
}
