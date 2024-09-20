interface LoginFormButtonProps {
  buttonText: string
  onBack?: () => void
}

export default function LoginFormButton({ buttonText, onBack }: LoginFormButtonProps) {
  return (
    <div className="mt-7 flex flex-row gap-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex rounded-md border-2 border-bluegray px-3 py-3 font-semibold transition"
        >
          Atrás
        </button>
      )}
      <button
        type="submit"
        className="flex-grow rounded-md bg-bluegray py-3 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
      >
        {buttonText}
      </button>
    </div>
  )
}
