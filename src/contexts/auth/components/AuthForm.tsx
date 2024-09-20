import { useState } from "react"
import InitialForm from "./InitialForm"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function AuthForm() {
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null)
  const [email, setEmail] = useState<string>("")

  const handleNext = (newUser: boolean, email: string) => {
    setIsNewUser(newUser)
    setEmail(email)
  }

  const goBackToInitial = () => {
    setIsNewUser(null)
    setEmail("")
  }

  return (
    <div className="absolute bottom-0 h-[85vh] w-[calc(100vw-1rem)] rounded-t-lg bg-beige px-4 py-8 shadow-[0_-5px_15px_0_rgba(0,0,0,0.05)] md:h-[calc(100vh-10rem)] md:w-3/4 md:px-8 xl:w-2/5">
      {isNewUser === null && <InitialForm onNext={handleNext} />}
      {isNewUser === false && <LoginForm email={email} onBack={goBackToInitial} />}
      {isNewUser === true && <RegisterForm email={email} onBack={goBackToInitial} />}
    </div>
  )
}
