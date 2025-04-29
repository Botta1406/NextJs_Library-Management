
// app/dashboard/page.tsx
import { BooksDashboard } from '@/components/BooksDashboard';
import { getAllBooks } from '@/lib/db'; // Your data fetching function

export default async function DashboardPage() {
    const books = await getAllBooks();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Library Dashboard</h1>
            <BooksDashboard allBooks={books} />
        </div>
    );
}