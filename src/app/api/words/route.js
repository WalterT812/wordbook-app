import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
    const words = await prisma.word.findMany({
        orderBy: { createAt: "desc" },
    });
    return new Response(JSON.stringify(words), { status: 200 });
}