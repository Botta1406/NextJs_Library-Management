// lib/types/index.ts
export interface Book {
    id:  string | number;
    title: string;
    author: string;
    coverImage: string;
    description: string;
    isbn: string;
    available: boolean;
    dueDate?: string;
    borrowedBy?: string;
    genre?: string;
    publicationYear?: number;
}