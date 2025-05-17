// app/books/layout.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Library Books | NextJs Library Management',
    description: 'Browse our collection of books',
};

export default function BooksLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
}