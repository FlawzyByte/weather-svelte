import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
    try {
        // Fetch all bookmarks sorted by ID in ascending order
        const favorites = await prisma.bookmark.findMany({
            orderBy: { id: 'asc' }, // Sort by ID (lowest to highest)
        });

        return json(favorites); // Return the data as JSON
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return json({ error: 'Unable to fetch favorites' }, { status: 500 });
    }
};