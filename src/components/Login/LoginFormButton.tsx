export default function LoginFormButton(buttonText: string) {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-bluegray py-3 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
    >
      {buttonText}
    </button>
  )
}
