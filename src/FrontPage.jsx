// Päivitetty: lisätty UnifrakturCook-fontti, testiuutisia ja AI-keskustelukenttä toimivaksi

import { useState, useEffect } from "react";

export default function FrontPage() {
  const [topics, setTopics] = useState([]);
  const [input, setInput] = useState("");
  const [articles, setArticles] = useState([]);
  const [datetime, setDatetime] = useState("");
  const [chatInputs, setChatInputs] = useState({});
  const [chatResponses, setChatResponses] = useState({});

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

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Testiartikkeleita
    setArticles([
      {
        title: "Yhdysvaltain työttömyys laski yllättäen",
        source: "Reuters",
        timestamp: "2.6.2025 08:45",
        ingress: "Työttömyys Yhdysvalloissa laski toukokuussa 3,4 prosenttiin. Analyytikot eivät odottaneet näin nopeaa toipumista."
      },
      {
        title: "Tekoäly kehittää omia algoritmejaan",
        source: "MIT News",
        timestamp: "2.6.2025 10:15",
        ingress: "Massachusettsin teknillinen instituutti raportoi, että suuri kielimalli kehitti uudenlaisen tekstianalyysimenetelmän ilman ihmisen ohjausta."
      }
    ]);
  }, []);

  const handleSuggest = () => {
    if (input.trim()) {
      setTopics((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const handleChatInput = (idx, value) => {
    setChatInputs((prev) => ({ ...prev, [idx]: value }));
  };

  const handleSendChat = (idx) => {
    const query = chatInputs[idx];
    if (!query) return;
    // Mockattu vastaus — oikea AI-haun voisi korvata API-kutsulla
    setChatResponses((prev) => ({ ...prev, [idx]: `Tämä on tekoälyn vastaus kysymykseen: “${query}”` }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="w-full border-b p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div>
          <h1 className="text-3xl tracking-wider" style={{ fontFamily: 'UnifrakturCook, cursive' }}>
            Papan tekoälysanomat
          </h1>
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
              <input
                placeholder="Kysy lisää tästä uutisesta..."
                className="border p-2 w-full"
                value={chatInputs[idx] || ""}
                onChange={(e) => handleChatInput(idx, e.target.value)}
              />
              <button className="mt-2 w-full border p-2" onClick={() => handleSendChat(idx)}>Lähetä</button>
              {chatResponses[idx] && (
                <p className="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                  {chatResponses[idx]}
                </p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
