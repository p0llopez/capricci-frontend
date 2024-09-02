import { useStore } from "@nanostores/preact"
import { useEffect, useState } from "preact/hooks"

import { refreshAccessToken, verifyToken } from "@/lib/api/user"
import { clearTokens, setTokens, user } from "@/stores/User"

interface Props {
  authenticated: React.ReactNode
  nonAuthenticated?: React.ReactNode
  loadingComponent?: React.ReactNode
}

export default function ProtectedRoute({
  authenticated,
  nonAuthenticated,
  loadingComponent,
}: Props) {
  const $user = useStore(user)
  const { accesToken, refreshToken } = $user
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (accesToken !== null) {
      verifyToken(accesToken)
        .then((isTokenValid) => {
          if (isTokenValid) {
            setIsAuthenticated(true)
          } else if (refreshToken !== null) {
            verifyToken(refreshToken)
              .then((isTokenValid) => {
                if (isTokenValid) {
                  refreshAccessToken(refreshToken)
                    .then((newAccessToken) => {
                      if (newAccessToken) {
                        setTokens(newAccessToken, refreshToken)
                        setIsAuthenticated(true)
                      }
                    })
                    .catch((error) => {
                      clearTokens()
                      setIsAuthenticated(false)
                      console.error("Failed to refresh access token:", error)
                    })
                }
              })
              .catch((error) => {
                clearTokens()
                setIsAuthenticated(false)
                console.error("Error verifying refresh token:", error)
              })
          }
        })
        .catch((error) => {
          clearTokens()
          setIsAuthenticated(false)
          console.error("Error verifying access token:", error)
        })
    }
  }, [accesToken, refreshToken])

  if (isAuthenticated === null) return loadingComponent ? <>{loadingComponent}</> : null
  else if (isAuthenticated) return <>{authenticated}</>
  else return nonAuthenticated ? <>{nonAuthenticated}</> : null
}
