// app/books/[id]/page.tsx
import Link from "next/link";
import { getBookById } from "@/lib/db";
import { format } from "date-fns";

export default function BookDetailPage({ params }: { params: { id: string } }) {
    const book = getBookById(params.id);

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

    return (
        <div className="max-w-3xl mx-auto">
            <Link href="/books" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                &larr; Back to books
            </Link>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="md:flex">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
                            <span className="text-gray-500">Cover Image</span>
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
                                <p className="font-medium">{book.isbn}</p>
                            </div>
                            {!book.available && book.dueDate && (
                                <div>
                                    <p className="text-gray-600">Due Date:</p>
                                    <p className="font-medium">{format(new Date(book.dueDate), "MMMM d, yyyy")}</p>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6">{book.description}</p>

                        <div>
                            {book.available ? (
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
        </div>
    );
}