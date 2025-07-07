import axios from "axios";
// import { errorToJSON } from "next/dist/server/render";

export async function GET(req) {
    const { searchParams } = new URL(req.url, "http://localhost:3000");
    const word = searchParams.get("word");

    if (!word) {
        return new Response(JSON.stringify({ error: "No word provided" }), {status: 400});
    }

    try{
        const response = await axios.get( `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to fetch definition" }), { status: 500});
    }
}