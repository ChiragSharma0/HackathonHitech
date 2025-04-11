import React, { useEffect, useState } from "react";
import axios from "axios";

const Marketplace = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from your backend
    axios.get("http://localhost:5500/api/fetch/items")
      .then(res => setItems(res.data))
      .catch(err => console.error("Failed to fetch items", err));
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-100">
        🧟‍♂️ Zombie NFT Marketplace
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((zombie, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-md p-4"
            style={{ minHeight: "310px" }}
          >
            <img
              src={zombie.image || "https://via.placeholder.com/300x150?text=No+Image"}
              alt={zombie.name}
              className="w-full h-36 object-cover rounded-lg"
            />
            <h2 className="text-base font-bold mt-2 text-gray-100">{zombie.name}</h2>
            <p className="text-sm text-gray-400">💼 {zombie.work}</p>
            <p className="text-base font-medium text-green-400 mt-1">💰 {zombie.price}</p>

            <h3 className="mt-3 font-semibold text-sm text-gray-300">🧰 Survival Items:</h3>
            <ul className="mt-1 grid grid-cols-1 gap-1 text-sm">
              {zombie.items.slice(0, 5).map((item, i) => (
                <li key={i} className="bg-gray-700 text-gray-200 px-2 py-1 rounded">
                  🔹 {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
