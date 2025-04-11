import React, { useEffect, useState } from "react";

const Zombiecomp = () => {
  const [zombies, setZombies] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5500/api/zombie/zombies")
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
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-10 xl:px-16 overflow-x-hidden">
      {/* Header */}
      <header className="max-w-screen-xl mx-auto text-center mb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
          🧟 Zombie Survival Guide
        </h1>
      </header>

      {/* Filter Buttons */}
      <section className="max-w-screen-md mx-auto mb-12">
        <div className="flex justify-center gap-4 flex-wrap">
          {["all", "low", "medium", "high"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-5 py-2.5 rounded-full text-base font-semibold capitalize shadow-md transition-all duration-300 ${
                filter === level
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <main className="max-w-screen-xl mx-auto">
        {filteredZombies.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg py-20">
            No zombies found with selected danger level.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredZombies.map((zombie, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl shadow-md overflow-hidden flex flex-col h-full"
              >
                <img
                  src={zombie.image}
                  alt={zombie.name}
                  className="w-full h-32 sm:h-36 object-cover object-center"
                />
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {zombie.name}
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                      {zombie.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        zombie.danger >= 4
                          ? "bg-red-600"
                          : zombie.danger >= 2
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      Danger: {zombie.danger}/5
                    </span>
                    <span className="text-yellow-500 text-sm">
                      {"★".repeat(zombie.danger)}
                      {"☆".repeat(5 - zombie.danger)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Zombie World Survival Corp. All rights reserved.
      </footer>
    </div>
  );
}


export default Zombiecomp;
