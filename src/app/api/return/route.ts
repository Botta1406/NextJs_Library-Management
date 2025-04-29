// app/api/return/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import {connectToDatabase} from "../../../../lib/mongodb";

export async function POST(request: Request) {
    try {
        const { bookId } = await request.json();

        if (!bookId) {
            return NextResponse.json(
                { message: 'Book ID is required' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        // Check if book exists and is borrowed
        const book = await db.collection('books').findOne({
            _id: new ObjectId(bookId),
        });

        if (!book) {
            return NextResponse.json(
                { message: 'Book not found' },
                { status: 404 }
            );
        }

        if (!book.isBorrowed) {
            return NextResponse.json(
                { message: 'Book is not currently borrowed' },
                { status: 400 }
            );
        }

        // Update book to mark as returned
        const result = await db.collection('books').updateOne(
            { _id: new ObjectId(bookId) },
            {
                $set: {
                    isBorrowed: false,
                },
                $unset: {
                    borrower: "",
                },
            }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: 'Failed to update book' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Book returned successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error returning book:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}