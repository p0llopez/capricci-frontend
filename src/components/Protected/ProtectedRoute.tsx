import React from "react"
import { useAuth } from "@/contexts/authContext"

interface ProtectedRouteProps {
	authenticated: React.ReactNode
	nonAuthenticated?: React.ReactNode
	loadingComponent?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	authenticated,
	nonAuthenticated,
	loadingComponent,
}) => {
	const { isAuthenticated } = useAuth()

	if (isAuthenticated === null) {
		return loadingComponent ? <>{loadingComponent}</> : null
	} else if (isAuthenticated) {
		return <>{authenticated}</>
	} else {
		return nonAuthenticated ? <>{nonAuthenticated}</> : null
	}
}

export default ProtectedRoute
