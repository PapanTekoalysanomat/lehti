import React, { useState } from "react";
import reseptit from "../data/reseptidata";

export default function Reseptivihko({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reseptivihko</h2>
        <button onClick={onClose} className="text-red-600 font-bold text-xl">×</button>
      </div>
      {reseptit.map((r, i) => (
        <div key={i} className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold">{r.nimi}</h3>
          <p className="text-sm italic text-gray-600 mb-2">{r.tyyppi}</p>
          <p>{r.kuvaus}</p>
          <a href={r.linkki} target="_blank" className="text-blue-600 underline text-sm">Katso alkuperäinen ohje</a>
        </div>
      ))}
    </div>
  );
}
