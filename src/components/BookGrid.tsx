// // components/BookGrid.tsx
// "use client";
//
// import { useCallback, useMemo, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { Book } from '@/types';
// import Link from 'next/link';
//
// // Import AG Grid styles
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
//
// interface BookGridProps {
//     books: Book[];
// }
//
// // Cell renderer for the status column
// const StatusCellRenderer = (params: ICellRendererParams) => {
//     const available = params.value;
//     return (
//         <span
//             className={`px-2 py-1 text-xs rounded-full ${
//                 available
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//             }`}
//         >
//       {available ? "Available" : "Borrowed"}
//     </span>
//     );
// };
//
// // Cell renderer for the actions column
// const ActionsCellRenderer = (params: ICellRendererParams) => {
//     return (
//         <Link href={`/books/${params.data.id}`} className="text-blue-600 hover:text-blue-800">
//             View Details
//         </Link>
//     );
// };
//
// export function BookGrid({ books }: BookGridProps) {
//     const [gridApi, setGridApi] = useState(null);
//
//     // Column definitions
//     const columnDefs = useMemo<ColDef[]>(() => [
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
//             field: 'publicationYear',
//             headerName: 'Year',
//             flex: 0.8,
//             filter: 'agNumberColumnFilter',
//             sortable: true
//         },
//         {
//             field: 'available',
//             headerName: 'Status',
//             flex: 1,
//             cellRenderer: StatusCellRenderer,
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
//     // Grid ready handler
//     const onGridReady = useCallback((params: any) => {
//         setGridApi(params.api);
//         params.api.sizeColumnsToFit();
//     }, []);
//
//     return (
//         <div className="ag-theme-alpine w-full h-[600px]">
//             <AgGridReact
//                 rowData={books}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 pagination={true}
//                 paginationPageSize={10}
//                 onGridReady={onGridReady}
//                 animateRows={true}
//                 rowSelection="single"
//             />
//         </div>
//     );
// }

// components/BookGrid.tsx
/// components/BookGrid.tsx
import { useCallback, useMemo, useRef } from 'react';
import { Book } from '@/types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import {
    ColDef,
    GridReadyEvent,
    ICellRendererParams
} from 'ag-grid-community';

import type { AgGridReactProps } from 'ag-grid-react';

// Dynamically import AgGridReact with proper typing
const AgGridReact = dynamic<AgGridReactProps<Book>>(
    () => import('ag-grid-react').then(mod => mod.AgGridReact),
    { ssr: false }
);

// Import AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface BookGridProps {
    books: Book[];
}

const StatusCellRenderer = (params: ICellRendererParams<Book>) => {
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

const ActionsCellRenderer = (params: ICellRendererParams<Book>) => {
    return (
        <Link
            href={`/books/${params.data?.id}`}
            className="text-blue-600 hover:text-blue-800"
        >
            View Details
        </Link>
    );
};

export function BookGrid({ books }: BookGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    const columnDefs = useMemo<ColDef<Book>[]>(() => [
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
    ], []);

    // No need to type this, just keep it generic
    const defaultColDef = useMemo(() => ({
        resizable: true
    }), []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        if (gridRef.current) {
            params.api.sizeColumnsToFit();
        }
    }, []);

    return (
        <div ref={gridRef} className="ag-theme-alpine w-full h-[600px]">
            <AgGridReact
                rowData={books}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                onGridReady={onGridReady}
                animateRows={true}
                rowSelection="single"
            />
        </div>
    );
}
