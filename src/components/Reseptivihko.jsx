import React, { useEffect, useState } from "react";

export default function Reseptivihko({ onClose }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/recipe-fetcher")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes || []))
      .catch(() => setError("Reseptien haku epäonnistui."));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 backdrop-blur-sm z-50 overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reseptivihko</h2>
        <button onClick={onClose} className="text-red-600 font-semibold text-lg">Sulje ✕</button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {recipes.length === 0 && !error && <p>Ladataan reseptejä...</p>}

      {recipes.map((r, i) => (
        <div key={i} className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-1">{r.title}</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{r.summary}</p>
          {r.url && (
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Lue koko resepti alkuperäislähteestä
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
