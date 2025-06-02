export async function handler(event) {
  const { topic } = JSON.parse(event.body || '{}');

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Kirjoita suomenkielinen uutisartikkelin ingressi aiheesta. Ole lyhyt, selkeä ja ytimekäs.",
        },
        {
          role: "user",
          content: `Kirjoita uutisartikkelin ingressi aiheesta: "${topic}"`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "Virhe generoinnissa.";

  return {
    statusCode: 200,
    body: JSON.stringify({ ingress: text }),
  };
}
