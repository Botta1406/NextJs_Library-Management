// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-8">Library Management System</h1>
        <div className="text-center">
          <p className="text-xl mb-8">
            Welcome to our Library Management System. Browse our collection of books
            and manage your borrowings with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
                href="/books"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Browse Books
            </Link>
            <Link
                href="/dashboard"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
  );
}