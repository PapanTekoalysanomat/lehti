import React, { useState, useEffect } from "react";
import Reseptivihko from "./components/Reseptivihko";

const initialTopics = [];

const categories = ["Kotimaa", "Maailma", "Autot", "Ranua"];

export default function FrontPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newCategory, setNewCategory] = useState("Kotimaa");
  const [error, setError] = useState(null);
  const [showReseptivihko, setShowReseptivihko] = useState(false);

  useEffect(() => {
    const fetchInitialIngresses = async () => {
      if (initialTopics.length === 0) return;
      const promises = initialTopics.map(async (topic) => {
        const response = await fetch("/.netlify/functions/news-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topic.title }),
        });
        const data = await response.json();
        return {
          title: topic.title,
          ingress: data.ingress || "Ei saatu vastausta OpenAI:lta.",
          category: topic.category,
        };
      });
      const loadedTopics = await Promise.all(promises);
      setTopics(loadedTopics);
    };
    fetchInitialIngresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    setError(null);

    try {
      const response = await fetch("/.netlify/functions/news-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: newTopic }),
      });

      const data = await response.json();
      const ingress = data.ingress || "Ei saatu vastausta OpenAI:lta.";

      setTopics([...topics, { title: newTopic, ingress, category: newCategory }]);
      setNewTopic("");
    } catch (err) {
      console.error("Virhe API-kutsussa:", err);
      setError("Tapahtui virhe uutisen luonnissa.");
    }
  };

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl mb-2">Papan tekoälysanomat</h1>
        <div>
          <a href="/sudoku" className="mr-4 text-blue-600 underline">Sudoku</a>
          <button
            onClick={() => setShowReseptivihko(true)}
            className="text-blue-600 underline"
          >
            Resepti
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {new Date().toLocaleDateString("fi-FI", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })} klo {new Date().toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit" })}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Ehdota aihetta uutisiin"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="flex-grow border px-2 py-1 rounded"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          +
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{cat}</h2>
          <ul>
            {topics
              .filter((t) => t.category === cat)
              .map((topic, index) => (
                <li key={index} className="mb-2">
                  <strong>• {topic.title}</strong>
                  <p className="text-gray-700 text-sm mt-1">{topic.ingress}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {showReseptivihko && <Reseptivihko onClose={() => setShowReseptivihko(false)} />}
    </div>
  );
}
