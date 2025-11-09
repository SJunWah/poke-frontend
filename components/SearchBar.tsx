import React from 'react'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={onChange}
        placeholder="Pokemon Name"
        className="flex-1 border border-gray-200 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <button
        onClick={onSearch}
        className="bg-amber-400 text-white px-4 py-2 rounded-full shadow-sm"
      >
        Search
      </button>
    </div>
  )
}
