// components/BooksDashboard.tsx
"use client";

import { useState } from 'react';
import { Book } from '@/types';
import { DashboardGrid } from './DashboardGrid';

interface BooksDashboardProps {
    allBooks: Book[];
}

export function BooksDashboard({ allBooks }: BooksDashboardProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'borrowed' | 'available'>('all');

    // Filter books based on active tab
    const borrowedBooks = allBooks.filter(book => book.borrowedBy);
    const availableBooks = allBooks.filter(book => !book.borrowedBy);

    // Determine which books to display
    const booksToDisplay = activeTab === 'all'
        ? allBooks
        : activeTab === 'borrowed'
            ? borrowedBooks
            : availableBooks;

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`py-4 px-6 font-medium text-sm ${
                        activeTab === 'all'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    All Books ({allBooks.length})
                </button>
                <button
                    onClick={() => setActiveTab('borrowed')}
                    className={`py-4 px-6 font-medium text-sm ${
                        activeTab === 'borrowed'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Borrowed Books ({borrowedBooks.length})
                </button>
                <button
                    onClick={() => setActiveTab('available')}
                    className={`py-4 px-6 font-medium text-sm ${
                        activeTab === 'available'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Available Books ({availableBooks.length})
                </button>
            </div>

            {/* Table with appropriate books and type */}
            <DashboardGrid
                books={booksToDisplay}
                type={activeTab === 'borrowed' ? 'borrowed' : 'available'}
            />
        </div>
    );
}


