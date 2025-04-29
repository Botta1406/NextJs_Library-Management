// app/api/borrow/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import {connectToDatabase} from "../../../../lib/mongodb";

export async function POST(request: Request) {
    try {
        const { bookId, borrowerName, borrowDate, dueDate } = await request.json();

        if (!bookId || !borrowerName || !borrowDate || !dueDate) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        // Check if book exists and is not already borrowed
        const book = await db.collection('books').findOne({
            _id: new ObjectId(bookId),
        });

        if (!book) {
            return NextResponse.json(
                { message: 'Book not found' },
                { status: 404 }
            );
        }

        if (book.isBorrowed) {
            return NextResponse.json(
                { message: 'Book is already borrowed' },
                { status: 400 }
            );
        }

        // Update book with borrowing information
        const result = await db.collection('books').updateOne(
            { _id: new ObjectId(bookId) },
            {
                $set: {
                    isBorrowed: true,
                    borrower: {
                        name: borrowerName,
                        borrowDate: borrowDate,
                        dueDate: dueDate,
                    },
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
            { message: 'Book borrowed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error borrowing book:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}