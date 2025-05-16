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
    },
    {
        id: "7",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        coverImage: "/images/catcher.jpg",
        description: "A story about teenage rebellion and alienation.",
        isbn: "9780316769488",
        available: true,
        genre: "Fiction",
        publicationYear: 1951
    },
    {
        id: "8",
        title: "Brave New World",
        author: "Aldous Huxley",
        coverImage: "/images/bravenewworld.jpg",
        description: "A dystopian novel about a futuristic society driven by technology and control.",
        isbn: "9780060850524",
        available: false,
        dueDate: "2025-06-01",
        borrowedBy: "Alice Johnson",
        genre: "Dystopian",
        publicationYear: 1932
    },
    {
        id: "9",
        title: "The Alchemist",
        author: "Paulo Coelho",
        coverImage: "/images/alchemist.jpg",
        description: "A philosophical story about following your dreams.",
        isbn: "9780061122415",
        available: true,
        genre: "Adventure",
        publicationYear: 1988
    },
    {
        id: "10",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        coverImage: "/images/lotr.jpg",
        description: "An epic high fantasy novel about the quest to destroy the One Ring.",
        isbn: "9780261102385",
        available: false,
        dueDate: "2025-05-20",
        borrowedBy: "Mark Lee",
        genre: "Fantasy",
        publicationYear: 1954
    },
    {
        id: "11",
        title: "The Book Thief",
        author: "Markus Zusak",
        coverImage: "/images/bookthief.jpg",
        description: "A story of a girl living in Nazi Germany, narrated by Death.",
        isbn: "9780375842207",
        available: true,
        genre: "Historical Fiction",
        publicationYear: 2005
    },
    {
        id: "12",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        coverImage: "/images/janeeyre.jpg",
        description: "A coming-of-age novel about the emotions and experiences of Jane Eyre.",
        isbn: "9780141441146",
        available: true,
        genre: "Classic",
        publicationYear: 1847
    },
    {
        id: "13",
        title: "Frankenstein",
        author: "Mary Shelley",
        coverImage: "/images/frankenstein.jpg",
        description: "A gothic novel about the consequences of playing God.",
        isbn: "9780141439471",
        available: false,
        dueDate: "2025-06-05",
        borrowedBy: "Ethan Kim",
        genre: "Horror",
        publicationYear: 1818
    },
    {
        id: "14",
        title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        coverImage: "/images/narnia.jpg",
        description: "Four children enter a magical world and help save it from evil.",
        isbn: "9780064471046",
        available: true,
        genre: "Fantasy",
        publicationYear: 1950
    },
    {
        id: "15",
        title: "Animal Farm",
        author: "George Orwell",
        coverImage: "/images/animalfarm.jpg",
        description: "An allegorical novella criticizing totalitarianism through a farmyard rebellion.",
        isbn: "9780451526342",
        available: true,
        genre: "Political Satire",
        publicationYear: 1945
    },
    {
        id: "16",
        title: "Moby-Dick",
        author: "Herman Melville",
        coverImage: "/images/mobydick.jpg",
        description: "A sailor narrates the obsessive quest of Ahab for revenge on a white whale.",
        isbn: "9780142437247",
        available: false,
        dueDate: "2025-06-08",
        borrowedBy: "Laura White",
        genre: "Adventure",
        publicationYear: 1851
    },
    {
        id: "17",
        title: "Wuthering Heights",
        author: "Emily Brontë",
        coverImage: "/images/wuthering.jpg",
        description: "A tragic story of love and revenge set on the Yorkshire moors.",
        isbn: "9780141439556",
        available: true,
        genre: "Gothic",
        publicationYear: 1847
    },
    {
        id: "18",
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        coverImage: "/images/fahrenheit451.jpg",
        description: "A dystopian novel about a future where books are outlawed and burned.",
        isbn: "9781451673319",
        available: true,
        genre: "Dystopian",
        publicationYear: 1953
    },
    {
        id: "19",
        title: "Little Women",
        author: "Louisa May Alcott",
        coverImage: "/images/littlewomen.jpg",
        description: "The story of four sisters growing up during the Civil War.",
        isbn: "9780147514011",
        available: true,
        genre: "Classic",
        publicationYear: 1868
    },
    {
        id: "20",
        title: "Dracula",
        author: "Bram Stoker",
        coverImage: "/images/dracula.jpg",
        description: "A gothic horror novel introducing Count Dracula and vampire lore.",
        isbn: "9780141439846",
        available: false,
        dueDate: "2025-06-12",
        borrowedBy: "Nina Garcia",
        genre: "Horror",
        publicationYear: 1897
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