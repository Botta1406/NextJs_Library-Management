// app/books/page.tsx
"use client";

import { getAllBooks } from "@/lib/db";
import { BookGrid } from "@/components/BookGrid";
import { useState } from "react";

export default function BooksPage() {
    // In a real application, you would fetch this data from an API
    const books = getAllBooks();
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
                    {books.map(book => (
                        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                <div className="text-gray-500">Cover Image</div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-2">by {book.author}</p>
                                <div className="mb-4">
                  <span
                      className={`px-2 py-1 text-xs rounded-full ${
                          book.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                  >
                    {book.available ? "Available" : "Borrowed"}
                  </span>
                                </div>
                                <a
                                    href={`/books/${book.id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

