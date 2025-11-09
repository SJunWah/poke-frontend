import React from 'react'
import { Pokemon } from '../types';


export default function PokemonCard({ p }: { p: Pokemon }) {
  return (
    <div className="bg-white rounded-md border border-gray-100 p-3 flex items-center gap-3">
      <img src={p.image} alt={p.name} className="w-14 h-14 object-contain" />
      <div>
        <div className="font-medium capitalize">{p.name}</div>
        {/* show type */}
        <div className="flex gap-2 mt-1">
          {p.types.map((type) => (
            <span
              key={type}
              className="text-xs px-2 py-1 bg-gray-200 capitalize"
            >
              {type}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
