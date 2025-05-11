// lib/db.ts
import { Book } from "@/types";

let books: Book[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage: "/images/gatsby.jpg", // Remove "public/"
        description: "A story of wealth, love, and tragedy in the Jazz Age.",
        isbn: "9780743273565",
        available: true,
        genre: "Classic",
        publicationYear: 1925
    },
    {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        coverImage: "/images/mockingbird.jpg", // Remove "public/"
        description: "A story of racial injustice and childhood innocence in the American South.",
        isbn: "9780061120084",
        available: false,
        dueDate: "2025-05-10",
        borrowedBy: "John Doe",
        genre: "Classic",
        publicationYear: 1960
    },
    {
        id: "3",
        title: "1984",
        author: "George Orwell",
        coverImage: "/images/1984.jpg", // Remove "public/"
        description: "A dystopian novel about totalitarianism and surveillance.",
        isbn: "9780451524935",
        available: true,
        genre: "Dystopian",
        publicationYear: 1949
    },
    {
        id: "4",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        coverImage: "/images/hobbit.jpg", // Remove "public/"
        description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
        isbn: "9780547928227",
        available: true,
        genre: "Fantasy",
        publicationYear: 1937
    },
    {
        id: "5",
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        coverImage: "/images/harrypotter.jpg", // Remove "public/"
        description: "The first book in the Harry Potter series.",
        isbn: "9780747532699",
        available: false,
        dueDate: "2025-05-15",
        borrowedBy: "Jane Smith",
        genre: "Fantasy",
        publicationYear: 1997
    },
    {
        id: "6",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        coverImage: "/images/pride.jpg", // Remove "public/"
        description: "A romantic novel of manners set in rural England.",
        isbn: "9780141439518",
        available: true,
        genre: "Romance",
        publicationYear: 1813
    }
];

export const getAllBooks = () => {
    return books;
};

export const getBookById = (id: string) => {
    return books.find(book => book.id === id);
};

export const updateBook = (id: string, updates: Partial<Book>) => {
    books = books.map(book => book.id === id ? { ...book, ...updates } : book);
    return getBookById(id);
};

export const addBook = (book: Omit<Book, "id">) => {
    const newBook = { ...book, id: Date.now().toString() };
    books.push(newBook);
    return newBook;
};