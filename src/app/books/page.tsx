
"use client";

import { useState, useEffect } from "react";
import { getAllBooks } from "@/lib/db";
import { BookGrid } from "@/components/BookGrid";
import { Book } from "@/types";

export default function BooksPage() {
    // State to hold books data
    const [books, setBooks] = useState<Book[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');

    // Load initial books
    useEffect(() => {
        // In a real application, you would fetch this data from an API
        const initialBooks = getAllBooks();
        setBooks(initialBooks);
    }, []);

    // Handler to add a new book
    const handleAddBook = (newBook: Omit<Book, 'id'>) => {
        // In a real app, you would make an API call here
        // For now, we'll just generate an ID and add it to state
        const bookWithId: Book = {
            ...newBook,
            id: `book-${Date.now()}`,
            available: true // Default to available
        };

        setBooks(prevBooks => [...prevBooks, bookWithId]);

        // In a real app: Call API to persist the new book
        // Example: await addBookToDatabase(bookWithId);
    };

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
                <BookGrid books={books} onAddBook={handleAddBook} />
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
                                <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                                <p className="text-gray-600 mb-2">Year: {book.publicationYear}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}