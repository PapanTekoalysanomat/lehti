export async function handler(event) {
  try {
    const { topic } = JSON.parse(event.body || '{}');

    if (!topic || typeof topic !== "string" || topic.length > 200) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Virheellinen tai liian pitkä aihe." }),
      };
    }

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

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "OpenAI API -virhe", details: await response.text() }),
      };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GPT ei palauttanut sisältöä." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ingress: text }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sisäinen virhe", details: error.message }),
    };
  }
}
