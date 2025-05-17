"use client";

import { useState } from "react";
import { Book } from "@/types";
import { DashboardGrid } from "./DashboardGrid";
import Link from "next/link";

interface BooksDashboardProps {
    allBooks: Book[];
}

export function BooksDashboard({ allBooks }: BooksDashboardProps) {
    const [activeTab, setActiveTab] = useState<"all" | "borrowed" | "available">(
        "all"
    );

    // Filter books based on active tab
    const borrowedBooks = allBooks.filter((book) => book.borrowedBy);
    const availableBooks = allBooks.filter((book) => !book.borrowedBy);

    // Determine which books to display
    const booksToDisplay =
        activeTab === "all"
            ? allBooks
            : activeTab === "borrowed"
                ? borrowedBooks
                : availableBooks;

    return (
        <div className="space-y-6">

                <div className="flex justify-start">
                    <Link href="/books" className="text-blue-600 hover:underline">
                        ← Back to Books
                    </Link>
                </div>


            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`py-4 px-6 font-medium text-sm ${
                        activeTab === "all"
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    All Books ({allBooks.length})
                </button>

            </div>

            {/* Table with appropriate books and type */}
            <DashboardGrid
                books={booksToDisplay}
                type={activeTab === "borrowed" ? "borrowed" : "available"}
            />
        </div>
    );
}
