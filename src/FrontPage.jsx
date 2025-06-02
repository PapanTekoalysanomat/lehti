import { useState, useEffect } from "react";

export default function FrontPage() {
  const [topics, setTopics] = useState([]);
  const [input, setInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString("fi-FI", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setDatetime(formatted);
  }, []);

  const handleSuggest = () => {
    if (input.trim()) {
      setTopics((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="w-full border-b p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div>
          <h1 className="text-3xl font-serif tracking-wider">Papan tekoälysanomat</h1>
          <p className="text-sm text-gray-600 mt-1">{datetime}</p>
        </div>
        <div className="flex items-center space-x-2 w-96">
          <input
            className="border p-2 flex-grow"
            placeholder="Ehdota aihetta uutisiin"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="border px-3 py-1" onClick={handleSuggest}>+</button>
        </div>
      </header>

      {topics.length > 0 && (
        <div className="px-6 pt-2">
          <ul className="text-sm">
            {topics.map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {articles.map((article, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm italic text-gray-600 mb-2">{article.source} – {article.timestamp}</p>
            <p className="mb-4 text-base leading-snug">{article.ingress}</p>
            <div className="mt-4">
              <input placeholder="Kysy lisää tästä uutisesta..." className="border p-2 w-full" />
              <button className="mt-2 w-full border p-2">Lähetä</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
