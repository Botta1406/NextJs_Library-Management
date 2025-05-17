
    "use client";
    import { useState, useEffect } from "react";
    import { getAllBooks } from "@/lib/db";
    import { BookGrid } from "@/components/BookGrid";
    import { Book } from "@/types";
    import Link from "next/link";
    import Image from "next/image";

    export default function BooksPage() {
        const [books, setBooks] = useState<Book[]>([]);
        const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
        const [viewMode, setViewMode] = useState<'grid' | 'cards'>('cards');
        const [searchTerm, setSearchTerm] = useState<string>("");

        useEffect(() => {
            const fetchBooks = async () => {
                const initialBooks = await getAllBooks();
                setBooks(initialBooks);
                setFilteredBooks(initialBooks);
            };
            fetchBooks();
        }, []);

        useEffect(() => {
            const lower = searchTerm.toLowerCase();
            const results = books.filter(book =>
                book.title.toLowerCase().includes(lower) ||
                book.author.toLowerCase().includes(lower)
            );
            setFilteredBooks(results);
        }, [searchTerm, books]);

        return (
            <div>
                {/* Top Section: Title, View Buttons, and Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-8 space-y-4 md:space-y-0">
                    <h1 className="text-3xl font-bold text-gray-700">Book Collection</h1>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Table View
                            </button>
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`px-4 py-2 rounded ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Card View
                            </button>
                        </div>
                    </div>
                </div>

                {/* Book Display */}
                {viewMode === 'grid' ? (
                    <BookGrid books={filteredBooks} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map(book => (
                            <div key={book.id} className="bg-blue-100 rounded-lg shadow-md overflow-hidden">
                                <div className="h-64 w-full relative mt-5">
                                    <Image
                                        src={book.coverImage.replace("public/", "/")}
                                        alt={`${book.title} cover`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                                    <p className="text-gray-700 mb-2">by {book.author}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-semibold">Genre:</span> {book.genre}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-semibold">Year:</span> {book.publicationYear}</p>
                                    <Link
                                        href={`/books/${book.id}`}
                                        className="text-blue-600 hover:text-blue-800 mt-2 block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
