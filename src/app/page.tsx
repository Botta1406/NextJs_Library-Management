// // app/page.tsx
// import Link from "next/link";
//
// export default function Home() {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
//             <h1 className="text-4xl text-gray-700 font-bold mb-6 text-center">
//                 A Modern Library Management System with Next.js
//             </h1>
//             <p className="text-xl text-gray-700 mb-6 text-center max-w-2xl">
//                 Welcome to our Library Management System. Browse our vast collection of books,
//                 manage your borrowings, and stay updated with the latest arrivals — all in one place.
//             </p>
//
//             <div className="flex gap-4 mb-10">
//                 <Link
//                     href="/books"
//                     className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
//                 >
//                     Browse Books
//                 </Link>
//                 <Link
//                     href="/dashboard"
//                     className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
//                 >
//                     Dashboard
//                 </Link>
//             </div>
//
//             <section className="w-full max-w-4xl text-center">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
//                 <ul className="text-gray-600 space-y-2">
//                     <li>📚 Easy book search and filter</li>
//                     <li>🗓 Borrow and return tracking with due date reminders</li>
//                     <li>📈 Admin dashboard for inventory and member management</li>
//                     <li>🔐 Secure user login and role-based access</li>
//                 </ul>
//             </section>
//
//             <section className="mt-12 max-w-2xl text-center">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Our Users Say</h2>
//                 <blockquote className="italic text-gray-600">
//                     "This system has made managing our college library effortless. The interface is clean,
//                     and tracking book borrowings is super easy!" – Librarian, City College
//                 </blockquote>
//             </section>
//
//             <footer className="mt-16 text-gray-500 text-sm">
//                 &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
//             </footer>
//         </div>
//     );
// }

//--------------------------------------------------------------------------------------

//
//third one
// app/page.tsx
import Link from "next/link";
import { BookOpen, User, Clock, BarChart2 } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header with decorative elements */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 opacity-10 -skew-y-6 transform origin-top-right h-64"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                A Modern Library Management System with Next.js
              </span>
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto my-6 rounded-full"></div>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
                            Welcome to our modern library platform. Discover books, manage your borrowings,
                            and explore new literary worlds with ease.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
                {/* Action buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <Link
                        href="/books"
                        className="flex items-center justify-center bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 group"
                    >
                        <div className="mr-4 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                            <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-800">Browse Books</h3>
                            <p className="text-gray-600">Explore our vast collection of titles</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 group"
                    >
                        <div className="mr-4 bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors">
                            <User className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold text-gray-800">My Dashboard</h3>
                            <p className="text-gray-600">Manage your account and borrowings</p>
                        </div>
                    </Link>
                </div>

                {/* Features section */}
                <div className="py-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What You Can Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Browse Collection</h3>
                            <p className="text-gray-600">Explore thousands of books across various genres and authors.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Track Borrowings</h3>
                            <p className="text-gray-600">Keep track of your current loans and return dates.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                <BarChart2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Reading Analytics</h3>
                            <p className="text-gray-600">View insights about your reading habits and preferences.</p>
                        </div>
                    </div>
                </div>

                {/* Quick access bar */}

            </div>
        </div>
    );
}

//----------------------------------------------------------------------------------------------------------
// // app/page.tsx
// import Link from "next/link";
// import { BookOpen, User, Clock, BarChart2, Search, Book, Star, CalendarDays, MessageSquare } from "lucide-react";
//
// export default function Home() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//             {/* Hero Section with Animated Elements */}
//             <div className="relative overflow-hidden">
//                 <div className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
//                     <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
//                 </div>
//
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="relative pt-16 pb-12 sm:pt-24 sm:pb-16">
//                         <div className="text-center">
//                             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
//                   Library Management System
//                 </span>
//                             </h1>
//                             <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto my-6 rounded-full"></div>
//                             <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
//                                 Discover, borrow, and explore our extensive collection. Your gateway to knowledge and imagination.
//                             </p>
//
//                             {/* Search Bar */}
//                             <div className="mt-8 flex items-center justify-center">
//                                 <div className="relative max-w-md w-full">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <Search className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="text"
//                                         className="block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 shadow-sm"
//                                         placeholder="Search for books, authors, or genres..."
//                                     />
//                                     <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
//                                         Search
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Main Content */}
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4">
//                 {/* Primary Actions */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//                     <Link
//                         href="/books"
//                         className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group"
//                     >
//                         <div className="mb-4 bg-blue-100 p-4 rounded-full group-hover:bg-blue-600 transition-colors">
//                             <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">Browse Books</h3>
//                         <p className="text-gray-500 text-sm text-center">Explore our collection</p>
//                     </Link>
//
//                     <Link
//                         href="/dashboard"
//                         className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group"
//                     >
//                         <div className="mb-4 bg-green-100 p-4 rounded-full group-hover:bg-green-600 transition-colors">
//                             <User className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">My Dashboard</h3>
//                         <p className="text-gray-500 text-sm text-center">Manage your account</p>
//                     </Link>
//
//                     <Link
//                         href="/new-arrivals"
//                         className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group"
//                     >
//                         <div className="mb-4 bg-purple-100 p-4 rounded-full group-hover:bg-purple-600 transition-colors">
//                             <Book className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">New Arrivals</h3>
//                         <p className="text-gray-500 text-sm text-center">Latest additions</p>
//                     </Link>
//
//                     <Link
//                         href="/events"
//                         className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group"
//                     >
//                         <div className="mb-4 bg-amber-100 p-4 rounded-full group-hover:bg-amber-600 transition-colors">
//                             <CalendarDays className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">Events</h3>
//                         <p className="text-gray-500 text-sm text-center">Upcoming activities</p>
//                     </Link>
//                 </div>
//
//                 {/* Featured Books Section */}
//                 <div className="mb-16">
//                     <div className="flex items-center justify-between mb-8">
//                         <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
//                         <Link href="/books" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
//                             View all <span className="ml-1">→</span>
//                         </Link>
//                     </div>
//
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {[1, 2, 3, 4].map((book) => (
//                             <div key={book} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group">
//                                 <div className="h-48 bg-gray-200 relative overflow-hidden">
//                                     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20"></div>
//                                 </div>
//                                 <div className="p-4">
//                                     <div className="flex items-center mb-2">
//                                         <div className="flex text-amber-400">
//                                             <Star className="w-4 h-4 fill-current" />
//                                             <Star className="w-4 h-4 fill-current" />
//                                             <Star className="w-4 h-4 fill-current" />
//                                             <Star className="w-4 h-4 fill-current" />
//                                             <Star className="w-4 h-4" />
//                                         </div>
//                                         <span className="text-xs text-gray-500 ml-1">(4.0)</span>
//                                     </div>
//                                     <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Book Title Here</h3>
//                                     <p className="text-gray-500 text-sm">Author Name</p>
//                                     <div className="mt-3 flex justify-between items-center">
//                                         <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Available</span>
//                                         <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Details</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* Features & Benefits */}
//                 <div className="mb-16">
//                     <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Library Services</h2>
//
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//                             <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                                 <Clock className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <h3 className="font-bold text-lg text-gray-800 mb-2">24/7 Digital Access</h3>
//                             <p className="text-gray-600">Access e-books and digital resources anytime from anywhere.</p>
//                             <ul className="mt-4 space-y-2">
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
//                                     E-books & audiobooks
//                                 </li>
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
//                                     Research databases
//                                 </li>
//                             </ul>
//                         </div>
//
//                         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//                             <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                                 <BarChart2 className="w-6 h-6 text-purple-600" />
//                             </div>
//                             <h3 className="font-bold text-lg text-gray-800 mb-2">Reading Analytics</h3>
//                             <p className="text-gray-600">Track your reading habits and discover new recommendations.</p>
//                             <ul className="mt-4 space-y-2">
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
//                                     Reading history
//                                 </li>
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
//                                     Personalized suggestions
//                                 </li>
//                             </ul>
//                         </div>
//
//                         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//                             <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                                 <MessageSquare className="w-6 h-6 text-green-600" />
//                             </div>
//                             <h3 className="font-bold text-lg text-gray-800 mb-2">Community Groups</h3>
//                             <p className="text-gray-600">Join book clubs and discussion forums with fellow readers.</p>
//                             <ul className="mt-4 space-y-2">
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
//                                     Book clubs & forums
//                                 </li>
//                                 <li className="flex items-center text-sm text-gray-500">
//                                     <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
//                                     Author events
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Stats Section */}
//                 <div className="bg-white rounded-xl shadow-sm p-8 mb-16 border border-gray-100">
//                     <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Library in Numbers</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                         {[
//                             { number: "50,000+", label: "Books" },
//                             { number: "10,000+", label: "E-Books" },
//                             { number: "5,000+", label: "Members" },
//                             { number: "500+", label: "Events/Year" }
//                         ].map((stat, index) => (
//                             <div key={index} className="text-center">
//                                 <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
//                                 <p className="text-gray-600">{stat.label}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//
//                 {/* CTA Section */}
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 mb-16">
//                     <div className="md:flex items-center justify-between">
//                         <div className="mb-6 md:mb-0">
//                             <h2 className="text-2xl font-bold text-white mb-2">Ready to start reading?</h2>
//                             <p className="text-blue-100">Join our library today and get access to thousands of books.</p>
//                         </div>
//                         <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//                             <Link href="/signup" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium rounded-lg bg-white text-blue-700 hover:bg-blue-50">
//                                 Sign Up
//                             </Link>
//                             <Link href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium rounded-lg border border-blue-200 text-white hover:bg-blue-700">
//                                 Log In
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Footer */}
//             <footer className="bg-gray-50 border-t border-gray-200">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div>
//                             <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Library Hours</h3>
//                             <ul className="space-y-2">
//                                 <li className="text-gray-600 text-sm">Monday - Friday: 9AM - 8PM</li>
//                                 <li className="text-gray-600 text-sm">Saturday: 10AM - 6PM</li>
//                                 <li className="text-gray-600 text-sm">Sunday: 12PM - 5PM</li>
//                             </ul>
//                         </div>
//
//                         <div>
//                             <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Contact Us</h3>
//                             <ul className="space-y-2">
//                                 <li className="text-gray-600 text-sm">123 Library Street</li>
//                                 <li className="text-gray-600 text-sm">City, State 12345</li>
//                                 <li className="text-gray-600 text-sm">email@library.com</li>
//                                 <li className="text-gray-600 text-sm">(123) 456-7890</li>
//                             </ul>
//                         </div>
//
//                         <div>
//                             <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
//                             <ul className="space-y-2">
//                                 <li><Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">About Us</Link></li>
//                                 <li><Link href="/faq" className="text-gray-600 hover:text-blue-600 text-sm">FAQ</Link></li>
//                                 <li><Link href="/policies" className="text-gray-600 hover:text-blue-600 text-sm">Policies</Link></li>
//                                 <li><Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Contact</Link></li>
//                             </ul>
//                         </div>
//                     </div>
//
//                     <div className="mt-8 pt-8 border-t border-gray-200">
//                         <p className="text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

