
// components/DashboardGrid.tsx
"use client";

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { CustomDashboardTable } from './CustomDashboardTable';

interface DashboardGridProps {
    books: Book[];
    type: 'borrowed' | 'available';
}

export function DashboardGrid({ books, type }: DashboardGridProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Show loading state while component is mounting
    if (!isMounted) {
        return (
            <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading table...</div>
            </div>
        );
    }

    return <CustomDashboardTable books={books} type={type} />;
}