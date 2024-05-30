import React, { useState } from "react"

const PopupForm: React.FC = (open) => {
  const [isOpen, setIsOpen] = useState(open)
  const [quantity, setQuantity] = useState("1")

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    togglePopup() // Close the popup after submission
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(event.target.value)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl">Popup Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <select
                  className="text-bold ml-3 appearance-none rounded-lg border border-transparent px-4 py-2 text-xl outline outline-bluegreen transition hover:border-bluegreen focus:border-bluegreen"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Reseña</label>
                <input type="text" className="w-full rounded-md border px-3 py-2" required />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="mr-2 rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupForm
