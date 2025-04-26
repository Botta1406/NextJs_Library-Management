// // components/DashboardGridInternal.tsx
// "use client";
//
// import { useCallback, useMemo, useRef, useEffect } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import {
//     ColDef,
//     ICellRendererParams,
//     GridReadyEvent,
//     GridApi
// } from 'ag-grid-community';
// import { Book } from '@/types';
// import Link from 'next/link';
//
// // Import AG Grid styles
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
//
// interface DashboardGridInternalProps {
//     books: Book[];
//     type: 'borrowed' | 'available';
// }
//
// // Define a proper type for cell renderer params
// interface BookCellRendererParams extends ICellRendererParams {
//     data: Book;
// }
//
// // Cell renderer for actions column
// const ActionsCellRenderer = (params: BookCellRendererParams) => {
//     return (
//         <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
//             View
//         </Link>
//     );
// };
//
// export function DashboardGridInternal({ books, type }: DashboardGridInternalProps) {
//     // Ref for the container div
//     const gridContainerRef = useRef<HTMLDivElement>(null);
//
//     // Grid API reference with proper typing
//     const gridApiRef = useRef<GridApi<Book> | null>(null);
//
//     // Column definitions for borrowed books
//     const borrowedColumnDefs = useMemo<ColDef<Book>[]>(() => [
//         {
//             field: 'title',
//             headerName: 'Title',
//             flex: 2,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'author',
//             headerName: 'Author',
//             flex: 1.5,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'borrowedBy',
//             headerName: 'Borrowed By',
//             flex: 1.5,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'dueDate',
//             headerName: 'Due Date',
//             flex: 1.5,
//             filter: true,
//             sortable: true
//         },
//         {
//             headerName: 'Actions',
//             flex: 1,
//             cellRenderer: ActionsCellRenderer,
//             sortable: false,
//             filter: false
//         }
//     ], []);
//
//     // Column definitions for available books
//     const availableColumnDefs = useMemo<ColDef<Book>[]>(() => [
//         {
//             field: 'title',
//             headerName: 'Title',
//             flex: 2,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'author',
//             headerName: 'Author',
//             flex: 1.5,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'genre',
//             headerName: 'Genre',
//             flex: 1,
//             filter: true,
//             sortable: true
//         },
//         {
//             field: 'isbn',
//             headerName: 'ISBN',
//             flex: 1.5,
//             filter: true,
//             sortable: true
//         },
//         {
//             headerName: 'Actions',
//             flex: 1,
//             cellRenderer: ActionsCellRenderer,
//             sortable: false,
//             filter: false
//         }
//     ], []);
//
//     // Default column properties
//     const defaultColDef = useMemo<ColDef<Book>>(() => ({
//         resizable: true,
//     }), []);
//
//     // Grid ready handler with proper typing
//     const onGridReady = useCallback((params: GridReadyEvent<Book>) => {
//         // Store API reference
//         gridApiRef.current = params.api;
//
//         // Size columns after a brief delay
//         setTimeout(() => {
//             if (gridApiRef.current) {
//                 gridApiRef.current.sizeColumnsToFit();
//             }
//         }, 200);
//     }, []);
//
//     // Handle resize events
//     useEffect(() => {
//         const handleResize = () => {
//             if (gridApiRef.current) {
//                 gridApiRef.current.sizeColumnsToFit();
//             }
//         };
//
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     return (
//         <div
//             ref={gridContainerRef}
//             className="ag-theme-alpine w-full h-[400px]"
//         >
//             <AgGridReact<Book>
//                 rowData={books}
//                 columnDefs={type === 'borrowed' ? borrowedColumnDefs : availableColumnDefs}
//                 defaultColDef={defaultColDef}
//                 pagination={true}
//                 paginationPageSize={5}
//                 onGridReady={onGridReady}
//                 animateRows={true}
//                 rowSelection="single"
//                 domLayout="autoHeight"
//             />
//         </div>
//     );
// }

// components/DashboardGridInternal.tsx
"use client";

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ICellRendererParams,
    GridReadyEvent,
    GridApi
} from 'ag-grid-community';
import { Book } from '@/types';
import Link from 'next/link';

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface DashboardGridInternalProps {
    books: Book[];
    type: 'borrowed' | 'available';
}

// Define a proper type for cell renderer params
interface BookCellRendererParams extends ICellRendererParams {
    data: Book;
}

// Cell renderer for actions column
const ActionsCellRenderer = (params: BookCellRendererParams) => {
    return (
        <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
            View
        </Link>
    );
};

export function DashboardGridInternal({ books, type }: DashboardGridInternalProps) {
    // Add state to control grid rendering
    const [gridReady, setGridReady] = useState(false);

    // Ref for the container div
    const gridContainerRef = useRef<HTMLDivElement>(null);

    // Grid API reference with proper typing
    const gridApiRef = useRef<GridApi<Book> | null>(null);

    // Column definitions for borrowed books
    const borrowedColumnDefs = useMemo<ColDef<Book>[]>(() => [
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
    const availableColumnDefs = useMemo<ColDef<Book>[]>(() => [
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
    const defaultColDef = useMemo<ColDef<Book>>(() => ({
        resizable: true,
    }), []);

    // Grid ready handler with proper typing
    const onGridReady = useCallback((params: GridReadyEvent<Book>) => {
        // Store API reference
        gridApiRef.current = params.api;

        // Mark grid as ready
        setGridReady(true);

        // Size columns after ensuring the DOM is ready
        requestAnimationFrame(() => {
            if (gridApiRef.current && gridContainerRef.current) {
                gridApiRef.current.sizeColumnsToFit();
            }
        });
    }, []);

    // Handle resize events - but only after grid is ready
    useEffect(() => {
        if (!gridReady) return;

        const handleResize = () => {
            if (gridApiRef.current && gridContainerRef.current) {
                requestAnimationFrame(() => {
                    gridApiRef.current?.sizeColumnsToFit();
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [gridReady]);

    // Effect to ensure we have a valid DOM element before rendering AG Grid
    useEffect(() => {
        // This gives the DOM time to properly establish refs
        const timer = setTimeout(() => {
            setGridReady(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={gridContainerRef}
            className="ag-theme-alpine w-full h-[400px]"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {gridReady && (
                <AgGridReact<Book>
                    rowData={books}
                    columnDefs={type === 'borrowed' ? borrowedColumnDefs : availableColumnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={5}
                    onGridReady={onGridReady}
                    animateRows={true}
                    rowSelection="single"
                    // Use normal layout instead of autoHeight which can cause issues
                    domLayout="normal"
                    // Add these props to help with SSR/CSR transitions
                    suppressMovableColumns={true}
                    suppressCellFocus={false}
                    enableCellTextSelection={true}
                />
            )}
        </div>
    );
}