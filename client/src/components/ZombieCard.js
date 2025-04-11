// src/components/ZombieCard.js
import React from 'react';

const ZombieCard = ({ zombie }) => {
  return (
    <div className="border p-4 m-2 rounded-lg shadow-lg bg-gray-800 text-white max-w-xs">
      <img src={zombie.image} alt={zombie.name} className="w-full h-40 object-cover rounded-lg mb-2" />
      <h3 className="text-xl font-semibold">{zombie.name}</h3>
      <p className="text-sm mt-1">Rating: {zombie.rating}</p>
      <p className="text-sm mt-1">Prevention: {zombie.prevention}</p>
    </div>
  );
};

export default ZombieCard;
