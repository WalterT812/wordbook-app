import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
    const { word, meaning, note } = await req.json();

    try {
        const saveWord = await prisma.word.create({
            data: { word, meaning, note },
        });
        return new Response(JSON.stringify(saveWord), { status: 200});
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to save word" }), { status: 500});
    }
}