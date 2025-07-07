"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyWords() {
    const[words, setWords] = useState([]);

    const fetchWords = async () => {
        const res = await fetch("/api/words");
        const data = await res.json();
        setWords(data);
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const handleDelete = async (id) => {
        await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        fetchWords();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <div className="p-4 border rounded shadow w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">My Word Book</h1>
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600 transition">
                        Back to Home
                    </button>
                </Link>
                <ul>
                    {words.map((w) => (
                        <li key={w.id} className="mb-2 flex justify-between">
                            <span>
                                <strong>{w.word}:</strong> {w.meaning}
                            </span>
                            <button
                                onClick={() => handleDelete(w.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600 transition">
                                    Delete
                                </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}