import React from "react"
import ShoppingCartList from "@/components/Cart/CartList"
import CartWidget from "@/components/Cart/CartWidget"
import ProtectedRoute from "@/components/Protected/ProtectedRoute"
import { AuthProvider } from "@/contexts/authContext"

const HeaderMenu: React.FC = () => {
	return (
		<AuthProvider>
			<div className="grid grid-cols-3 place-items-center gap-4">
				<ProtectedRoute
					authenticated={
						<a
							className="flex flex-col items-center p-1 transition hover:scale-105"
							href="/profile"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#232F3F"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="size-4 stroke-beige xs:size-6"
								viewBox="0 0 24 24"
							>
								<path stroke="none" d="M0 0h24v24H0z"></path>
								<path d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
							</svg>
							<p className="hidden text-beige xl:block">Perfil</p>
						</a>
					}
					nonAuthenticated={
						<a className="flex flex-col items-center p-1 transition hover:scale-105" href="/login">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="#232F3F"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								className="size-4 stroke-beige xs:size-6"
								viewBox="0 0 24 24"
							>
								<path stroke="none" d="M0 0h24v24H0z"></path>
								<path d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
							</svg>
							<p className="hidden text-beige xl:block">Iniciar sesión</p>
						</a>
					}
				/>
				<a className="flex flex-col items-center p-1 transition hover:scale-105" href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="#232F3F"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						className="size-4 stroke-beige xs:size-6"
						viewBox="0 0 24 24"
					>
						<path stroke="none" d="M0 0h24v24H0z"></path>
						<path d="M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.57"></path>
					</svg>
					<p className="hidden text-beige xl:block">Favoritos</p>
				</a>
				<div className="md:relative">
					<CartWidget />
					<ShoppingCartList />
				</div>
			</div>
		</AuthProvider>
	)
}

export default HeaderMenu
