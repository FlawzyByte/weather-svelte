import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
    console.log('Received POST request at /bookmark'); 
    try {
        const body = await request.json();
        console.log('Request body:', body); 

        const { place } = body;

        if (!place) {
            console.warn('Validation failed: "place" is missing in the request body'); 
            return json({ error: 'Place is required' }, { status: 400 });
        }

        console.log(`Attempting to save bookmark for place: ${place}`); 

        const bookmark = await prisma.bookmark.create({
            data: { place },
        });

        console.log('Bookmark saved successfully:', bookmark); 
        return json(bookmark, { status: 201 });
    } catch (error) {
        console.error('Error occurred in POST /bookmark:', error); // Log errors
        return json({ error: 'Unable to save bookmark' }, { status: 500 });
    }
};