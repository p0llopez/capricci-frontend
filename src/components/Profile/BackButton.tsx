interface Props {
  className?: string
}

export default function GoBackButton({ className }: Props) {
  const goBack = () => {
    window.history.back() // Go back to the previous page in history
  }

  return (
    <button
      onClick={goBack}
      className={`${className} rounded-md bg-bluegray p-2 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none`}
    >
      Go Back
    </button>
  )
}
