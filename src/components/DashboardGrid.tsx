// // // components/DashboardGrid.tsx
// // "use client";
// //
// // import { useCallback, useMemo } from 'react';
// // import { AgGridReact } from 'ag-grid-react';
// // import { ColDef, ICellRendererParams } from 'ag-grid-community';
// // import { Book } from '@/types';
// // import Link from 'next/link';
// //
// // // Import AG Grid styles
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// //
// // interface DashboardGridProps {
// //     books: Book[];
// //     type: 'borrowed' | 'available';
// // }
// //
// // // Cell renderer for actions column
// // const ActionsCellRenderer = (params: ICellRendererParams) => {
// //     return (
// //         <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
// //             View
// //         </Link>
// //     );
// // };
// //
// // export function DashboardGrid({ books, type }: DashboardGridProps) {
// //     // Column definitions for borrowed books
// //     const borrowedColumnDefs = useMemo<ColDef[]>(() => [
// //         {
// //             field: 'title',
// //             headerName: 'Title',
// //             flex: 2,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'author',
// //             headerName: 'Author',
// //             flex: 1.5,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'borrowedBy',
// //             headerName: 'Borrowed By',
// //             flex: 1.5,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'dueDate',
// //             headerName: 'Due Date',
// //             flex: 1.5,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             headerName: 'Actions',
// //             flex: 1,
// //             cellRenderer: ActionsCellRenderer,
// //             sortable: false,
// //             filter: false
// //         }
// //     ], []);
// //
// //     // Column definitions for available books
// //     const availableColumnDefs = useMemo<ColDef[]>(() => [
// //         {
// //             field: 'title',
// //             headerName: 'Title',
// //             flex: 2,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'author',
// //             headerName: 'Author',
// //             flex: 1.5,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'genre',
// //             headerName: 'Genre',
// //             flex: 1,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             field: 'isbn',
// //             headerName: 'ISBN',
// //             flex: 1.5,
// //             filter: true,
// //             sortable: true
// //         },
// //         {
// //             headerName: 'Actions',
// //             flex: 1,
// //             cellRenderer: ActionsCellRenderer,
// //             sortable: false,
// //             filter: false
// //         }
// //     ], []);
// //
// //     // Default column properties
// //     const defaultColDef = useMemo(() => ({
// //         resizable: true,
// //     }), []);
// //
// //     // Grid ready handler
// //     const onGridReady = useCallback((params: any) => {
// //         params.api.sizeColumnsToFit();
// //     }, []);
// //
// //     return (
// //         <div className="ag-theme-alpine w-full h-[400px]">
// //             <AgGridReact
// //                 rowData={books}
// //                 columnDefs={type === 'borrowed' ? borrowedColumnDefs : availableColumnDefs}
// //                 defaultColDef={defaultColDef}
// //                 pagination={true}
// //                 paginationPageSize={5}
// //                 onGridReady={onGridReady}
// //                 animateRows={true}
// //                 rowSelection="single"
// //             />
// //         </div>
// //     );
// // }
// // components/DashboardGrid.tsx
// // components/DashboardGrid.tsx
// "use client";
//
// import { useCallback, useMemo, useState, useEffect } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef, ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
// import { Book } from '@/types';
// import Link from 'next/link';
//
// // Import AG Grid styles
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
//
// interface DashboardGridProps {
//     books: Book[];
//     type: 'borrowed' | 'available';
// }
//
// // Cell renderer for actions column
// const ActionsCellRenderer = (params: ICellRendererParams) => {
//     return (
//         <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
//             View
//         </Link>
//     );
// };
//
// export function DashboardGrid({ books, type }: DashboardGridProps) {
//     // State to control grid rendering
//     const [isClient, setIsClient] = useState(false);
//
//     // Column definitions for borrowed books
//     const borrowedColumnDefs = useMemo<ColDef[]>(() => [
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
//     const availableColumnDefs = useMemo<ColDef[]>(() => [
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
//     const defaultColDef = useMemo(() => ({
//         resizable: true,
//     }), []);
//
//     // Grid ready handler - with proper safeguards
//     const onGridReady = useCallback((params: GridReadyEvent) => {
//         if (typeof window !== 'undefined') {
//             // Wait for the DOM to be fully rendered
//             window.requestAnimationFrame(() => {
//                 if (params.api) {
//                     params.api.sizeColumnsToFit();
//                 }
//             });
//         }
//     }, []);
//
//     // Handle window resize events
//     const handleResize = useCallback(() => {
//         // This helps avoid ResizeObserver issues
//         if (document.querySelector('.ag-theme-alpine')) {
//             window.dispatchEvent(new Event('resize'));
//         }
//     }, []);
//
//     // This effect ensures we only render the grid on the client side
//     useEffect(() => {
//         setIsClient(true);
//
//         // Add resize handler
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [handleResize]);
//
//     // If not client-side yet, show a placeholder
//     if (!isClient) {
//         return <div className="w-full h-[400px] bg-gray-50 animate-pulse"></div>;
//     }
//
//     return (
//         <div className="ag-theme-alpine w-full h-[400px]">
//             <AgGridReact
//                 rowData={books}
//                 columnDefs={type === 'borrowed' ? borrowedColumnDefs : availableColumnDefs}
//                 defaultColDef={defaultColDef}
//                 pagination={true}
//                 paginationPageSize={5}
//                 onGridReady={onGridReady}
//                 animateRows={true}
//                 rowSelection="single"
//                 suppressColumnVirtualisation={true}
//                 // Removed suppressFailedFit as it's not a valid prop
//             />
//         </div>
//     );
// }

// components/DashboardGrid.tsx
"use client";

import { useState, useEffect } from 'react';
import { Book } from '@/types';

interface DashboardGridProps {
    books: Book[];
    type: 'borrowed' | 'available';
}

// Define a proper type for dynamically imported components
type DynamicComponent = React.ComponentType<{
    books: Book[];
    type: 'borrowed' | 'available';
}>;

export function DashboardGrid({ books, type }: DashboardGridProps) {
    const [GridComponent, setGridComponent] = useState<DynamicComponent | null>(null);

    useEffect(() => {
        // Only import AG Grid on the client side
        import('./DashboardGridInternal').then((module) => {
            setGridComponent(() => module.DashboardGridInternal);
        });
    }, []);

    // Show loading state while the grid is being imported
    if (!GridComponent) {
        return (
            <div className="w-full h-[400px] bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading grid...</div>
            </div>
        );
    }

    // Render the grid once it's loaded
    return <GridComponent books={books} type={type} />;
}