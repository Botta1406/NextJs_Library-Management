
// // app/books/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBookById, loadBooksFromLocalStorage } from "@/lib/db";
import { useBookStore } from "@/lib/store";
import { BorrowModal } from "@/components/BorrowModal";
import { useRouter } from "next/navigation";

export default function BookDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const bookId = params.id; // Store book ID from params
    const [book, setBook] = useState(() => getBookById(bookId));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { borrowBook } = useBookStore();

    useEffect(() => {
        // Load books from localStorage and get the current one
        loadBooksFromLocalStorage();
        const currentBook = getBookById(bookId);
        if (currentBook) {
            setBook(currentBook);
        }
    }, [bookId]);

    if (!book) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Book not found</h1>
                <Link href="/books" className="text-blue-600 hover:text-blue-800">
                    Back to books
                </Link>
            </div>
        );
    }

    const handleBorrowClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmBorrow = () => {
        try {
            // Borrow the book using ID from params instead of book.id
            borrowBook(bookId, "Current User");

            // Get the updated book details
            const updatedBook = getBookById(bookId);

            // Update local state
            if (updatedBook) {
                setBook(updatedBook);
            }
            setIsModalOpen(false);

            // Show success message (removed due date reference)
            setSuccessMessage("Book borrowed successfully!");

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);

            // Refresh the dashboard data
            router.refresh();
        } catch (error) {
            console.error("Error borrowing book:", error);
            setSuccessMessage("Error borrowing book. Please try again.");
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col  mb-2">
            <Link href="/books" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                &larr; Back to books
            </Link>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                &larr; Back to Dashboard
            </Link>
            </div>

            {successMessage && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="md:flex">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="relative h-64 w-full rounded overflow-hidden">
                            <Image
                                src={book.coverImage || '/images/default-book.jpg'}
                                alt={`Cover of ${book.title}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded"
                                priority
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 md:pl-6">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                        <div className="mb-4">
                            <span
                                className={`px-3 py-1 text-sm rounded-full ${
                                    book.available
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {book.available ? "Available" : "Borrowed"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-gray-600">Genre:</p>
                                <p className="font-medium">{book.genre || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Publication Year:</p>
                                <p className="font-medium">{book.publicationYear || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">ISBN:</p>
                                <p className="font-medium">{book.isbn || 'N/A'}</p>
                            </div>
                            {!book.available && book.borrowedBy && (
                                <div>
                                    <p className="text-gray-600">Borrowed By:</p>
                                    <p className="font-medium">{book.borrowedBy}</p>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6">{book.description || 'No description available.'}</p>

                        <div>
                            {book.available ? (
                                <button
                                    onClick={handleBorrowClick}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Borrow this book
                                </button>
                            ) : (
                                <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed">
                                    Currently unavailable
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {book && (
                <BorrowModal
                    book={{...book, id: bookId}} // Ensure ID is passed correctly
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmBorrow}
                />
            )}
        </div>
    );
}