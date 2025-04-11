import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
    try {
        const mostBookmarked = await prisma.bookmark.groupBy({
            by: ['place'],
            _count: {
                place: true,
            },
            orderBy: {
                _count: {
                    place: 'desc',
                },
            },
            take: 1,
        });

        const lastBookmarked = await prisma.bookmark.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return json({
            mostBookmarked: mostBookmarked[0] || null,
            lastBookmarked: lastBookmarked || null,
        });
    } catch (error) {
        console.error(error);
        return json({ error: 'Unable to fetch bookmark stats' }, { status: 500 });
    }
};