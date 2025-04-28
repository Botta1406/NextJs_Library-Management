// components/CustomDashboardTable.tsx
"use client";

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import Link from 'next/link';

interface CustomDashboardTableProps {
    books: Book[];
    type: 'borrowed' | 'available';
}

export function CustomDashboardTable({ books, type }: CustomDashboardTableProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');

    const itemsPerPage = 5;

    // Set mounted state after component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Apply filters to books
    const filteredBooks = books.filter(book => {
        if (!filterText) return true;

        const searchText = filterText.toLowerCase();
        return (
            (book.title?.toLowerCase().includes(searchText)) ||
            (book.author?.toLowerCase().includes(searchText)) ||
            (type === 'borrowed' && book.borrowedBy?.toLowerCase().includes(searchText)) ||
            (type === 'available' && book.genre?.toLowerCase().includes(searchText)) ||
            (type === 'available' && book.isbn?.toLowerCase().includes(searchText))
        );
    });

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    // Handle page changes
    const goToPage = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
    };

    // If not mounted yet, show placeholder
    if (!isMounted) {
        return (
            <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading table...</div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200">
            {/* Search filter */}
            <div className="p-4 border-b border-gray-200">
                <input
                    type="text"
                    value={filterText}
                    onChange={(e) => {
                        setFilterText(e.target.value);
                        setCurrentPage(1); // Reset to first page on filter
                    }}
                    placeholder="Search..."
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                        </th>
                        {type === 'borrowed' ? (
                            <>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Borrowed By
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                            </>
                        ) : (
                            <>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Genre
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ISBN
                                </th>
                            </>
                        )}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBooks.length > 0 ? (
                        paginatedBooks.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{book.author}</div>
                                </td>
                                {type === 'borrowed' ? (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{book.borrowedBy}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{book.dueDate}</div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{book.genre}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{book.isbn}</div>
                                        </td>
                                    </>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                No books found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                            currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredBooks.length)}</span> of{' '}
                            <span className="font-medium">{filteredBooks.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                                    currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <span className="sr-only">Previous</span>
                                &larr;
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;

                                // Simple logic to show relevant page numbers
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => goToPage(pageNum)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                            currentPage === pageNum
                                                ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                                                : 'bg-white text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                                    currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <span className="sr-only">Next</span>
                                &rarr;
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}