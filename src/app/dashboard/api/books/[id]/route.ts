
// 1. API Route file - app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { getBookById, updateBook } from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const book = await getBookById(params.id);

    if (!book) {
        return NextResponse.json(
            { error: "Book not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ book });
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const book = await getBookById(params.id);

        if (!book) {
            return NextResponse.json(
                { error: "Book not found" },
                { status: 404 }
            );
        }

        const updatedBook = await updateBook(params.id, body);
        return NextResponse.json({ book: updatedBook });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
}
