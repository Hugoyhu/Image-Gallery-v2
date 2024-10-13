import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; 


export async function PUT(request: Request) {
    const link = await request.json();
    const session = await getServerSession(authOptions);

    console.log(link);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("Image-Gallery");
        const result = await db.collection("image-gallery").deleteOne(
            { link: link }
        );

        return NextResponse.json({ message: 'Delete attempted.' });
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}
