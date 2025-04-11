import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
    try {
        // Group bookmarks by place and count how many times each place is bookmarked
        const travelSuggestions = await prisma.bookmark.groupBy({
            by: ['place'],
            _count: { place: true },
            orderBy: { _count: { place: 'desc' } }, // Sort by the count in descending order
        });

        return json(travelSuggestions); // Return the sorted list of places
    } catch (error) {
        console.error('Error fetching travel ideas:', error);
        return json({ error: 'Unable to fetch travel ideas' }, { status: 500 });
    }
};