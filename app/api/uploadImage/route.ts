import cloudinary from '@/lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import * as exifr from 'exifr';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import Fraction from 'fraction.js';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const uploadsFolder = process.env.CLOUDINARY_UPLOADS_FOLDER;
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const location = formData.get('location') as string;
        const label = formData.get('label') as string;

        const featuredValue = formData.get('featured');
        const featured = featuredValue === "true";

        console.log(location, label, featured);

        if (!file) {
            return Response.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: 'auto', folder: uploadsFolder },
                    (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result);
                    },
                )
                .end(Buffer.from(fileBuffer));
        });

        const exifData = await exifr.parse(fileBuffer);

        let exposure = exifData.ExposureTime;

        if (exposure < 1) {
            const fractionExposure = new Fraction(exposure);
            exposure = `${fractionExposure.n}/${fractionExposure.d}`;
        }

        const uri = process.env.MONGODB_URI || "";
        const client = new MongoClient(uri);

        await client.connect();
        const db = client.db('Image-Gallery');
        const collection = db.collection('image-gallery');

        console.log("hello");
        console.log(exifData);

        const mongoResult = await collection.insertOne(
            {
                link: result.url,
                Manufacturer: exifData.Make,
                Model: exifData.Model,
                Time: exifData.DateTimeOriginal,
                Exposure: exposure,
                ISO: exifData.ISO,
                Focal: exifData.FocalLength + "mm",
                Width: exifData.ExifImageWidth,
                Height: exifData.ExifImageHeight,
                Label: label,
                FNumber: "f/" + exifData.FNumber,
                Description: "",
                Lens: exifData.LensModel,
                location: location,
                featured: featured
            }
        );

        return Response.json({ secure_url: result.secure_url });
    } catch (error) {
        console.error('Error uploading file:', error);
        return Response.json({ error: 'Error uploading file' }, { status: 500 });
    }
}