
export async function handler() {
  const recipes = [
    {
      title: "Lohikeitto (HS)",
      url: "https://www.hs.fi/ruoka/resepti/art-2000009735463.html",
      type: "suolainen",
    },
    {
      title: "Mustikkapiirakka (Yle)",
      url: "https://yle.fi/aihe/artikkeli/2020/08/05/kesainen-mustikkapiirakka",
      type: "makea",
    },
  ];
  return {
    statusCode: 200,
    body: JSON.stringify(recipes),
  };
}
