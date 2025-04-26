// components/DashboardGrid.tsx
"use client";

import { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Book } from '@/types';
import Link from 'next/link';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface DashboardGridProps {
    books: Book[];
    type: 'borrowed' | 'available';
}

// Cell renderer for actions column
const ActionsCellRenderer = (params: ICellRendererParams) => {
    return (
        <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
            View
        </Link>
    );
};

export function DashboardGrid({ books, type }: DashboardGridProps) {
    // Column definitions for borrowed books
    const borrowedColumnDefs = useMemo<ColDef[]>(() => [
        {
            field: 'title',
            headerName: 'Title',
            flex: 2,
            filter: true,
            sortable: true
        },
        {
            field: 'author',
            headerName: 'Author',
            flex: 1.5,
            filter: true,
            sortable: true
        },
        {
            field: 'borrowedBy',
            headerName: 'Borrowed By',
            flex: 1.5,
            filter: true,
            sortable: true
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            flex: 1.5,
            filter: true,
            sortable: true
        },
        {
            headerName: 'Actions',
            flex: 1,
            cellRenderer: ActionsCellRenderer,
            sortable: false,
            filter: false
        }
    ], []);

    // Column definitions for available books
    const availableColumnDefs = useMemo<ColDef[]>(() => [
        {
            field: 'title',
            headerName: 'Title',
            flex: 2,
            filter: true,
            sortable: true
        },
        {
            field: 'author',
            headerName: 'Author',
            flex: 1.5,
            filter: true,
            sortable: true
        },
        {
            field: 'genre',
            headerName: 'Genre',
            flex: 1,
            filter: true,
            sortable: true
        },
        {
            field: 'isbn',
            headerName: 'ISBN',
            flex: 1.5,
            filter: true,
            sortable: true
        },
        {
            headerName: 'Actions',
            flex: 1,
            cellRenderer: ActionsCellRenderer,
            sortable: false,
            filter: false
        }
    ], []);

    // Default column properties
    const defaultColDef = useMemo(() => ({
        resizable: true,
    }), []);

    // Grid ready handler
    const onGridReady = useCallback((params: any) => {
        params.api.sizeColumnsToFit();
    }, []);

    return (
        <div className="ag-theme-alpine w-full h-[400px]">
            <AgGridReact
                rowData={books}
                columnDefs={type === 'borrowed' ? borrowedColumnDefs : availableColumnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={5}
                onGridReady={onGridReady}
                animateRows={true}
                rowSelection="single"
            />
        </div>
    );
}
