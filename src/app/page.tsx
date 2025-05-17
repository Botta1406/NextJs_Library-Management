
// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, User, Clock, BarChart2 } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // No user is signed in, redirect to auth page
                router.push("/auth");
            } else {
                // User is signed in, show home page
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

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
            </div>
        </div>
    );
}