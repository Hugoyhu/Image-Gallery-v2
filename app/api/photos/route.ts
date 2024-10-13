import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function PUT(request: Request) {
    const updatedData = await request.json();

    try {
        const client = await clientPromise;
        const db = client.db("Image-Gallery");
        const result = await db.collection("image-gallery").updateOne(
            { link: updatedData.link }, // Query to find the document
            { $set: updatedData } // Update operation
        );

        if (result.modifiedCount > 0) {
            return NextResponse.json({ message: 'Document updated successfully.' });
        } else {
            return NextResponse.json({ message: 'No documents matched the query or nothing was changed.' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json({ error: 'Error updating document' }, { status: 500 });
    }
}
