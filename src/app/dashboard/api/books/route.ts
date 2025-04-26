// app/api/books/route.ts
import { NextResponse } from "next/server";
import { getAllBooks, addBook } from "@/lib/db";

export async function GET() {
    const books = getAllBooks();
    return NextResponse.json({ books });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newBook = addBook(body);
        return NextResponse.json({ book: newBook }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}
