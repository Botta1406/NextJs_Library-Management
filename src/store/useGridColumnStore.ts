// store/useGridColumnStore.ts
import { sha256 } from 'js-sha256';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define column state types
interface ColumnState {
    field: string;
    width?: number;
    visible: boolean;
    order: number;
}

interface GridColumnState {
    columns: Record<string, ColumnState>;
    setColumnWidth: (field: string, width: number) => void;
    setColumnVisibility: (field: string, visible: boolean) => void;
    setColumnOrder: (field: string, order: number) => void;
    resetColumns: (defaultColumns: ColumnState[]) => void;
    initializeColumns: (defaultColumns: any[]) => void;
}

const generateGridStorageKey = (apiKey: string, gridId: string) => {
    if (!apiKey) {
        console.warn('No API key provided for generating unique grid storage key');
        return `grid-columns-${gridId}-fallback`;
    }
    const hashedKey = sha256(apiKey).slice(0, 16);
    return `grid-columns-${gridId}-${hashedKey}`;
};

const createGridColumnStore = (apiKey: string, gridId: string) => create(
    persist<GridColumnState>(
        (set, get) => ({
            columns: {},

            setColumnWidth: (field: string, width: number) => {
                const { columns } = get();
                set({
                    columns: {
                        ...columns,
                        [field]: { ...columns[field], width }
                    }
                });
            },

            setColumnVisibility: (field: string, visible: boolean) => {
                const { columns } = get();
                set({
                    columns: {
                        ...columns,
                        [field]: { ...columns[field], visible }
                    }
                });
            },

            setColumnOrder: (field: string, order: number) => {
                const { columns } = get();
                set({
                    columns: {
                        ...columns,
                        [field]: { ...columns[field], order }
                    }
                });
            },

            resetColumns: (defaultColumns: ColumnState[]) => {
                const columnsObj = defaultColumns.reduce((acc, column) => {
                    acc[column.field] = column;
                    return acc;
                }, {} as Record<string, ColumnState>);

                set({ columns: columnsObj });
            },

            initializeColumns: (defaultColumns: any[]) => {
                const { columns } = get();

                // Only initialize if columns are empty
                if (Object.keys(columns).length === 0) {
                    const initialColumns = defaultColumns.reduce((acc, col, index) => {
                        acc[col.field] = {
                            field: col.field,
                            visible: true,
                            order: index,
                            width: col.width,
                        };
                        return acc;
                    }, {} as Record<string, ColumnState>);

                    set({ columns: initialColumns });
                }
            },
        }),
        {
            name: generateGridStorageKey(apiKey, gridId),
            getStorage: () => localStorage,
        }
    )
);

// Store cache to prevent multiple store instances
const gridStoreCache = new Map();

const useGridColumnStore = (apiKey: string, gridId: string) => {
    const cacheKey = `${apiKey}-${gridId}`;

    if (!gridStoreCache.has(cacheKey)) {
        const newStore = createGridColumnStore(apiKey, gridId);
        gridStoreCache.set(cacheKey, newStore);
    }

    return gridStoreCache.get(cacheKey);
};

export default useGridColumnStore;