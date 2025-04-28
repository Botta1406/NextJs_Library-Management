// // components/BorrowBookModal.tsx
// "use client";
//
// import { useState } from 'react';
// import { Book } from '@/types';
//
// interface BorrowBookModalProps {
//     book: Book;
//     isOpen: boolean;
//     onClose: () => void;
//     onSubmit: (borrowData: BorrowFormData) => void;
// }
//
// interface BorrowFormData {
//     borrowerName: string;
//     borrowerEmail: string;
//     borrowDate: string;
//     dueDate: string;
// }
//
// export function BorrowBookModal({ book, isOpen, onClose, onSubmit }: BorrowBookModalProps) {
//     // Calculate today's date and due date (10 days from now)
//     const today = new Date();
//     const dueDate = new Date(today);
//     dueDate.setDate(dueDate.getDate() + 10);
//
//     const formatDate = (date: Date) => {
//         return date.toISOString().split('T')[0];
//     };
//
//     const [formData, setFormData] = useState<BorrowFormData>({
//         borrowerName: '',
//         borrowerEmail: '',
//         borrowDate: formatDate(today),
//         dueDate: formatDate(dueDate)
//     });
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-medium text-gray-900">Borrow Book</h3>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-500"
//                         aria-label="Close"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//
//                 <div className="mb-4 p-4 bg-blue-50 rounded-md">
//                     <p className="font-medium text-gray-800">{book.title}</p>
//                     <p className="text-sm text-gray-600">by {book.author}</p>
//                 </div>
//
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
//                                 Your Name
//                             </label>
//                             <input
//                                 type="text"
//                                 id="borrowerName"
//                                 name="borrowerName"
//                                 value={formData.borrowerName}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//
//                         <div>
//                             <label htmlFor="borrowerEmail" className="block text-sm font-medium text-gray-700">
//                                 Email Address
//                             </label>
//                             <input
//                                 type="email"
//                                 id="borrowerEmail"
//                                 name="borrowerEmail"
//                                 value={formData.borrowerEmail}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
//                                     Borrow Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     id="borrowDate"
//                                     name="borrowDate"
//                                     value={formData.borrowDate}
//                                     onChange={handleChange}
//                                     disabled
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
//                                 />
//                             </div>
//
//                             <div>
//                                 <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
//                                     Due Date
//                                 </label>
//                                 <input
//                                     type="date"
//                                     id="dueDate"
//                                     name="dueDate"
//                                     value={formData.dueDate}
//                                     onChange={handleChange}
//                                     disabled
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
//                                 />
//                             </div>
//                         </div>
//
//                         <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
//                             <p className="text-sm text-yellow-800">
//                                 <span className="font-medium">Important:</span> Books must be returned by the due date. A fine will be charged for overdue books.
//                             </p>
//                         </div>
//                     </div>
//
//                     <div className="mt-6 flex justify-end">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                             Confirm Borrowing
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// components/BorrowBookModal.tsx
"use client";

import { useState } from 'react';
import { Book } from '@/types';

interface BorrowBookModalProps {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (borrowData: BorrowFormData) => void;
}

export interface BorrowFormData { // Export the BorrowFormData interface
    borrowerName: string;
    borrowerEmail: string;
    borrowDate: string;
    dueDate: string;
}

export function BorrowBookModal({ book, isOpen, onClose, onSubmit }: BorrowBookModalProps) {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 10);

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState<BorrowFormData>({
        borrowerName: '',
        borrowerEmail: '',
        borrowDate: formatDate(today),
        dueDate: formatDate(dueDate)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Borrow Book</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-4 p-4 bg-blue-50 rounded-md">
                    <p className="font-medium text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="borrowerName"
                                name="borrowerName"
                                value={formData.borrowerName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="borrowerEmail" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="borrowerEmail"
                                name="borrowerEmail"
                                value={formData.borrowerEmail}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="borrowDate" className="block text-sm font-medium text-gray-700">
                                    Borrow Date
                                </label>
                                <input
                                    type="date"
                                    id="borrowDate"
                                    name="borrowDate"
                                    value={formData.borrowDate}
                                    onChange={handleChange}
                                    disabled
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                            </div>

                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    disabled
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                            <p className="text-sm text-yellow-800">
                                <span className="font-medium">Important:</span> Books must be returned by the due date. A fine will be charged for overdue books.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Confirm Borrowing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}