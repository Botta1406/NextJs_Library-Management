// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import {connectToDatabase} from "@/lib/mongodb";
// import {connectToDatabase} from "../../../../../lib/mongodb";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: 'Invalid book ID' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        const book = await db
            .collection('books')
            .findOne({ _id: new ObjectId(id) });

        if (!book) {
            return NextResponse.json(
                { message: 'Book not found' },
                { status: 404 }
            );
        }

        // Convert ObjectId to string for JSON serialization
        return NextResponse.json({
            ...book,
            _id: book._id.toString(),
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: 'Invalid book ID' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        const result = await db
            .collection('books')
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: 'Book not found or already deleted' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Book deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting book:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}