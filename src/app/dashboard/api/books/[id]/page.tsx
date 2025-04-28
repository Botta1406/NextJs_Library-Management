// 2. Page Component file - src/app/books/[id]/page.tsx
// This is where the error is happening
import { getBookById } from "@/lib/db";

export default async function BookDetailPage({ params }: { params: { id: string } }) {
    // The key fix: making this an async component and awaiting the DB call
    const book = await getBookById(params.id);

    if (!book) {
        return <div className="error-container">
            <h2>Book Not Found</h2>
            <p>The requested book could not be found.</p>
        </div>;
    }

    return (
        <div className="book-detail">
            <h1>{book.title}</h1>
            <div className="book-info">
                <p className="author">By: {book.author}</p>
                <p className="description">{book.description}</p>
                {book.publishedYear && <p>Published: {book.publishedYear}</p>}
                {book.genre && <p>Genre: {book.genre}</p>}
            </div>

            {/* Add more book details as needed */}
        </div>
    );
}

