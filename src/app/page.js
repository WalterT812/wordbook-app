"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    if (!word) {
      alert("Please enter a word");
      return;
    }

    const res = await fetch(`/api/query/?word=${word}`);
    const data = await res.json();
    setResult(data[0]) 
  };

  const handleSave = async () => {
    if (!result) return;
    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: result.word,
        meaning: result.meanings[0].definitions[0].definition,
      }),
    });
    alert("Saved!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
      <div className="p-6 border rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Word Lookup</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border p-2 mr-2 text-black"
        />
        <button onClick={handleQuery} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{result.word}</h2>
            <p>{result.meanings[0].definitions[0].definition}</p>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition">
              Save
            </button>
          </div>
        )}
        <div className="mt-4">
        <Link href="/mywords">
              <button className="bg-gray-500 text-white px-4 py-2 mt-2 rounded hover:bg-gray-600 transition">
                View My Words
              </button>
            </Link>
      </div>
      </div>
    </div>
  )
}