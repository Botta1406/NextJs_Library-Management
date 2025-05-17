// app/api/books/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
    try {
        const { db } = await connectToDatabase();

        const books = await db
            .collection('books')
            .find({})
            .sort({ title: 1 })
            .toArray();

        return NextResponse.json(books);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch books" },
            { status: 500 }
        );
    }
}