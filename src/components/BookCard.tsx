// components/BookCard.tsx
import Link from "next/link";
import { Book } from "@/types";

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500">Cover Image</div>
            </div>
            <div className="p-4 ">
                <h3 className="text-xl font-semibold mb-2 ">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <div className="mb-4">
          <span
              className={`px-2 py-1 text-xs rounded-full ${
                  book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
              }`}
          >
            {book.available ? "Available" : "Borrowed"}
          </span>
                </div>
                <Link
                    href={`/books/${book.id}`}
                    className="text-blue-600 hover:text-blue-800"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
