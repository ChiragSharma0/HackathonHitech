import React, { useEffect, useState } from "react";





const ZombieCard = ({ zombie }) => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
    <img
      src={zombie.image}
      alt={zombie.name}
      className="w-full aspect-[4/3] object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        {zombie.name}
      </h2>

      <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
        {zombie.tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      <div className="mt-3 text-yellow-500 text-sm">
        {"★".repeat(zombie.danger)}
        {"☆".repeat(5 - zombie.danger)}
        <span className="ml-1 text-gray-400">
          (Danger: {zombie.danger}/5)
        </span>
      </div>
    </div>
  </div>
);

const Zombiecomp = () => {
  const [zombies, setZombies] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5500/api/fetch/zombies")
      .then((res) => res.json())
      .then((data) => setZombies(data));
  }, []);

  const filteredZombies = zombies.filter((z) => {
    if (filter === "low") return z.danger <= 2;
    if (filter === "medium") return z.danger === 3;
    if (filter === "high") return z.danger >= 4;
    return true;
  });

  return (
    <div className="p-6  ZombiePage">
      <h1 className="text-6xl font-bold text-center mb-6">🧟 Zombie Survival Guide</h1>

      <div className="flex justify-center gap-3 mb-6">
        {["all", "low", "medium", "high"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1 rounded text-sm capitalize ${filter === level
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredZombies.flatMap((zombie, idx) => [
          <ZombieCard key={`${idx}-1`} zombie={zombie} />,
          <ZombieCard key={`${idx}-2`} zombie={zombie} />
        ])}
      </div>

    </div>
  );
};

export default Zombiecomp;
