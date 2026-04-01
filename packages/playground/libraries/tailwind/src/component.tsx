import React from 'react'

export const TailwindComponent = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    {/* eslint-disable-next-line better-tailwindcss/enforce-consistent-line-wrapping */}
    <div className="rounded-xl bg-white p-8 shadow-2xl transition-all hover:scale-105">
      <h1 className="
        bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl
        font-extrabold text-transparent
      "
      >
        Tailwind Playground
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        This component demonstrates complex Tailwind CSS classes and React integration.
      </p>
      <div className="mt-6 flex space-x-4">
        <button
          type="button"
          className="
            rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white
            transition-colors
            hover:bg-blue-700
          "
        >
          Primary Action
        </button>
        <button
          type="button"
          className="
            rounded-lg border-2 border-gray-200 px-6 py-2 font-semibold
            text-gray-600 transition-all
            hover:border-gray-300 hover:bg-gray-50
          "
        >
          Secondary
        </button>
      </div>
    </div>
  </div>
)
