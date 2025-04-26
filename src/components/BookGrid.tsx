// components/BookGrid.tsx
"use client";

import { useEffect, useState } from 'react';
import { Book } from '@/types';
import Link from 'next/link';

// Import styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface BookGridProps {
    books: Book[];
}

// Create a simple loading placeholder
function LoadingGrid() {
    return (
        <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
            <p className="text-gray-600">Loading data grid...</p>
        </div>
    );
}

// Create a standalone table view as fallback
function SimpleBookTable({ books }: BookGridProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Author</th>
                    <th className="py-2 px-4 text-left">Genre</th>
                    <th className="py-2 px-4 text-left">Year</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id} className="border-b">
                        <td className="py-2 px-4">{book.title}</td>
                        <td className="py-2 px-4">{book.author}</td>
                        <td className="py-2 px-4">{book.genre}</td>
                        <td className="py-2 px-4">{book.publicationYear}</td>
                        <td className="py-2 px-4">
                <span
                    className={`px-2 py-1 text-xs rounded-full ${
                        book.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                  {book.available ? "Available" : "Borrowed"}
                </span>
                        </td>
                        <td className="py-2 px-4">
                            <Link href={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                                View Details
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// Main component with error handling
export function BookGrid({ books }: BookGridProps) {
    const [AgGrid, setAgGrid] = useState<any>(null);
    const [gridError, setGridError] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const loadGrid = async () => {
            try {
                // Use dynamic import with error handling
                const AgGridModule = await import('ag-grid-react');
                const { AgGridReact } = AgGridModule;

                // Only update state if component is still mounted
                if (isMounted) {
                    setAgGrid(() => AgGridReact);
                }
            } catch (error) {
                console.error("Failed to load AG Grid:", error);
                if (isMounted) {
                    setGridError(true);
                }
            }
        };

        loadGrid();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        };
    }, []);

    // If there was an error loading AG Grid, fall back to simple table
    if (gridError) {
        return <SimpleBookTable books={books} />;
    }

    // Show loading state while AG Grid is being loaded
    if (!AgGrid) {
        return <LoadingGrid />;
    }

    // Status cell renderer as a plain function
    const StatusCellRenderer = (params: any) => {
        const available = params.value;
        return (
            <span
                className={`px-2 py-1 text-xs rounded-full ${
                    available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
        {available ? 'Available' : 'Borrowed'}
      </span>
        );
    };

    // Actions cell renderer as a plain function
    const ActionsCellRenderer = (params: any) => {
        return (
            <Link
                href={`/books/${params.data?.id}`}
                className="text-blue-600 hover:text-blue-800"
            >
                View Details
            </Link>
        );
    };

    const columnDefs = [
        { field: 'title', headerName: 'Title', flex: 2, filter: true, sortable: true },
        { field: 'author', headerName: 'Author', flex: 1.5, filter: true, sortable: true },
        { field: 'genre', headerName: 'Genre', flex: 1, filter: true, sortable: true },
        { field: 'publicationYear', headerName: 'Year', flex: 0.8, filter: 'agNumberColumnFilter', sortable: true },
        {
            field: 'available',
            headerName: 'Status',
            flex: 1,
            cellRenderer: StatusCellRenderer,
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
    ];

    const defaultColDef = {
        resizable: true
    };

    const onGridReady = (params: any) => {
        // Use setTimeout to ensure the grid is fully rendered
        setTimeout(() => {
            if (params.api) {
                params.api.sizeColumnsToFit();
            }
        }, 300);
    };

    return (
        <div className="ag-theme-alpine w-full h-[400px]">
            <AgGrid
                rowData={books}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                animateRows={true}
                rowSelection="single"
                suppressReactUi={true}
                domLayout="normal"
                suppressMovableColumns={true}
                containerStyle={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}