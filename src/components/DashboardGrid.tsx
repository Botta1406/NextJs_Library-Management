
// components/DashboardGrid.tsx
"use client";

import { useState, useEffect } from "react";
import { Book } from "@/types";
import {CustomDashboardTable} from "@/components/CustomDashboardTable";

interface DashboardGridProps {
    books: Book[];
    type:string;
}

export function DashboardGrid({ books }: DashboardGridProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "borrowed" | "available" | null>(null);

    const borrowedBooks = books.filter((book) => book.borrowedBy);
    const availableBooks = books.filter((book) => !book.borrowedBy);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading dashboard...</div>
            </div>
        );
    }

    if (activeTab === null) {
        const dashboardCards = [
            {
                label: "All Books",
                count: books.length,
                color: "blue",
                description: "Click to view all books in the library",
                onClick: () => setActiveTab("all"),
                iconPath: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                ),
            },
            {
                label: "Borrowed Books",
                count: borrowedBooks.length,
                color: "red",
                description: "Click to view currently borrowed books",
                onClick: () => setActiveTab("borrowed"),
                iconPath: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                ),
            },
            {
                label: "Available Books",
                count: availableBooks.length,
                color: "green",
                description: "Click to view books available for borrowing",
                onClick: () => setActiveTab("available"),
                iconPath: (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                ),
            },
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {dashboardCards.map((card) => (
                    <div
                        key={card.label}
                        onClick={card.onClick}
                        className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{card.label}</h3>
                                <p className={`mt-1 text-3xl font-semibold text-${card.color}-600`}>{card.count}</p>
                            </div>
                            <div className={`p-3 bg-${card.color}-50 rounded-full`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-8 w-8 text-${card.color}-500`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {card.iconPath}
                                </svg>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">{card.description}</p>
                    </div>
                ))}
            </div>
        );
    }

    const booksToDisplay =
        activeTab === "all" ? books : activeTab === "borrowed" ? borrowedBooks : availableBooks;

    const tableType = activeTab === "borrowed" ? "borrowed" : "available";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                    {activeTab === "all" && "All Books"}
                    {activeTab === "borrowed" && "Borrowed Books"}
                    {activeTab === "available" && "Available Books"}
                </h2>
                <button
                    onClick={() => setActiveTab(null)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Dashboard
                </button>
            </div>

            <CustomDashboardTable books={booksToDisplay} type={tableType} />
        </div>
    );
}
