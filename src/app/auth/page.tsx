// app/auth/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to home page
                router.push("/");
            } else {
                // No user is signed in, stay on auth page
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                            Welcome to the Library Management System
                        </span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto my-6 rounded-full"></div>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
                        Please register or log in to access our library services.
                    </p>

                    <div className="flex flex-col items-center justify-center space-y-6 mt-10">
                        <AuthForm />
                    </div>
                </div>
            </div>
        </div>
    );
}