
// components/DashboardGrid.tsx
"use client";

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { CustomDashboardTable } from './CustomDashboardTable';

interface DashboardGridProps {
    books: Book[];
}

export function DashboardGrid({ books }: DashboardGridProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'borrowed' | 'available' | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Filter books based on active tab
    const borrowedBooks = books.filter(book => book.borrowedBy);
    const availableBooks = books.filter(book => !book.borrowedBy);


    // Show loading state while component is mounting
    if (!isMounted) {
        return (
            <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading dashboard...</div>
            </div>
        );
    }

    // If no tab is selected yet, show the cards
    if (activeTab === null) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* All Books Card */}
                <div
                    onClick={() => setActiveTab('all')}
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">All Books</h3>
                            <p className="mt-1 text-3xl font-semibold text-blue-600">{books.length}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Click to view all books in the library</p>
                </div>

                {/* Borrowed Books Card */}
                <div
                    onClick={() => setActiveTab('borrowed')}
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Borrowed Books</h3>
                            <p className="mt-1 text-3xl font-semibold text-amber-600">{borrowedBooks.length}</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Click to view currently borrowed books</p>
                </div>

                {/* Available Books Card */}
                <div
                    onClick={() => setActiveTab('available')}
                    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Available Books</h3>
                            <p className="mt-1 text-3xl font-semibold text-green-600">{availableBooks.length}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">Click to view books available for borrowing</p>
                </div>
            </div>
        );
    }

    // If a tab is selected, show the corresponding table
    // Determine which books to display
    const booksToDisplay = activeTab === 'all'
        ? books
        : activeTab === 'borrowed'
            ? borrowedBooks
            : availableBooks;

    // Determine table type
    const tableType = activeTab === 'borrowed' ? 'borrowed' : 'available';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                    {activeTab === 'all' && 'All Books'}
                    {activeTab === 'borrowed' && 'Borrowed Books'}
                    {activeTab === 'available' && 'Available Books'}
                </h2>
                <button
                    onClick={() => setActiveTab(null)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>

            <CustomDashboardTable books={booksToDisplay} type={tableType} />
        </div>
    );
}