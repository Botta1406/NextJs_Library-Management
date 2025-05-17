// "use client";
//
// import { useState } from "react";
// import { Book } from "@/types"; // ✅ Import your Book type correctly
// import { BookGrid } from "@/components/BookGrid";
// import { BookCard } from "@/components/BookCard";
//
// interface BooksViewProps {
//     books: Book[];
// }
//
// export function BooksView({ books }: BooksViewProps) {
//     const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');
//
//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Book Collection</h1>
//                 <div className="flex space-x-2">
//                     <button
//                         onClick={() => setViewMode('grid')}
//                         className={`px-4 py-2 rounded ${
//                             viewMode === 'grid'
//                                 ? 'bg-blue-600 text-white'
//                                 : 'bg-gray-200 text-gray-700'
//                         }`}
//                     >
//                         Table View
//                     </button>
//                     <button
//                         onClick={() => setViewMode('cards')}
//                         className={`px-4 py-2 rounded  ${
//                             viewMode === 'cards'
//                                 ? 'bg-blue-600 text-white'
//                                 : 'bg-gray-200 text-gray-700'
//                         }`}
//                     >
//                         Card View
//                     </button>
//                 </div>
//             </div>
//
//             {viewMode === 'grid' ? (
//                 <BookGrid books={books} />
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
//                     {books.map((book) => (
//                         <BookCard key={book.id} book={book} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
"use client";

import { useState, useMemo } from "react";
import { Book } from "@/types";
import { BookGrid } from "@/components/BookGrid";
import { BookCard } from "@/components/BookCard";

interface BooksViewProps {
    books: Book[];
}

export function BooksView({ books }: BooksViewProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter books based on search query
    const filteredBooks = useMemo(() => {
        if (!searchQuery.trim()) return books;

        const query = searchQuery.toLowerCase();
        return books.filter(book =>
            (book.title && book.title.toLowerCase().includes(query)) ||
            (book.author && book.author.toLowerCase().includes(query))
        );
    }, [books, searchQuery]);

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

            {/* Search Bar */}
            <div className="w-full mb-6">
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredBooks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No books found matching your search.
                </div>
            ) : viewMode === 'grid' ? (
                <BookGrid books={filteredBooks} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}