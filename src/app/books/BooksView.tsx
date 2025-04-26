"use client";

import { useState } from "react";
import { Book } from "@/types"; // ✅ Import your Book type correctly
import { BookGrid } from "@/components/BookGrid";
import { BookCard } from "@/components/BookCard";

interface BooksViewProps {
    books: Book[];
}

export function BooksView({ books }: BooksViewProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Book Collection</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-2 rounded ${
                            viewMode === 'grid'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Table View
                    </button>
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`px-4 py-2 rounded ${
                            viewMode === 'cards'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Card View
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <BookGrid books={books} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
