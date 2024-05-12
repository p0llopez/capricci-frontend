import React, { useEffect, useState } from "react"
import { verifyRefreshToken } from "@/lib/Api"

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
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [isChecking, setIsChecking] = useState<boolean>(true)

	useEffect(() => {
		const checkAuthentication = async () => {
			const refreshToken = localStorage.getItem("refreshToken")
			let isAuthenticated = false
			try {
				isAuthenticated = await verifyRefreshToken(refreshToken)
			} catch (error) {
				console.error("Error verifying access token:", error)
			}
			setIsAuthenticated(isAuthenticated)
			setIsChecking(false)
		}

		void checkAuthentication()
	}, [])

	if (isChecking) {
		return loadingComponent ? (
			<>{loadingComponent}</>
		) : (
			<div className="flex flex-col items-center p-1 transition hover:scale-105">
				<svg
					className="size-4 stroke-beige xs:size-6"
					viewBox="0 0 38 38"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#000"
				>
					<g fill="none" fillRule="evenodd">
						<g transform="translate(1 1)" strokeWidth="2">
							<circle strokeOpacity=".5" cx="18" cy="18" r="18" />
							<path d="M36 18c0-9.94-8.06-18-18-18">
								<animateTransform
									attributeName="transform"
									type="rotate"
									from="0 18 18"
									to="360 18 18"
									dur="1s"
									repeatCount="indefinite"
								/>
							</path>
						</g>
					</g>
				</svg>
				<p className="hidden text-beige xl:block">Iniciar Sesión</p>
			</div>
		)
	}

	return isAuthenticated ? <>{authenticated}</> : nonAuthenticated ? <>{nonAuthenticated}</> : null
}

export default ProtectedRoute
