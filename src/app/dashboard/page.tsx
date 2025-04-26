// app/dashboard/page.tsx
"use client";

import { getAllBooks } from "@/lib/db";
import { DashboardGrid } from "@/components/DashboardGrid";

export default function DashboardPage() {
    const books = getAllBooks();
    const availableBooks = books.filter(book => book.available);
    const borrowedBooks = books.filter(book => !book.available);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Library Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Books</h2>
                    <p className="text-4xl font-bold text-blue-600">{books.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Available</h2>
                    <p className="text-4xl font-bold text-green-600">{availableBooks.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Borrowed</h2>
                    <p className="text-4xl font-bold text-red-600">{borrowedBooks.length}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Borrowed Books</h2>
                {borrowedBooks.length > 0 ? (
                    <DashboardGrid books={borrowedBooks} type="borrowed" />
                ) : (
                    <p className="text-gray-500">No books are currently borrowed.</p>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Available Books</h2>
                </div>
                {availableBooks.length > 0 ? (
                    <DashboardGrid books={availableBooks} type="available" />
                ) : (
                    <p className="text-gray-500">No books are currently available.</p>
                )}
            </div>
        </div>
    );
}
