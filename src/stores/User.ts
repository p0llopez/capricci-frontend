import { persistentAtom } from "@nanostores/persistent"

import type { User } from "@/types/User"

export const user = persistentAtom<User>(
	"user",
	{
		accesToken: "",
		refreshToken: "",
	},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
)

export const setTokens = (accessToken: string, refreshToken: string) => {
	user.set({ accesToken: accessToken, refreshToken })
}

export const setAccessToken = (accessToken: string) => {
	const refreshToken = user.get().refreshToken
	user.set({ accesToken: accessToken, refreshToken })
}

export const clearTokens = () => {
	user.set({ accesToken: "", refreshToken: "" })
}

export const getAccessToken = () => user.get().accesToken

export const getRefreshToken = () => user.get().refreshToken
