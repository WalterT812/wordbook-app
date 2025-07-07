import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
    const { id } = await req.json();

    try {
        await prisma.word.delete({ where: { id } });
        return new Response(JSON.stringify({ message: "Deleted" }), { status: 200});
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to delete" }), { status: 500});
    }
}