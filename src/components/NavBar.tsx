// components/NavBar.tsx
"use client";

import Link from "next/link";
export function NavBar() {

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-extrabold text-xl text-blue-600">
                            LibraryApp
                        </Link>
                    </div>


                </div>
            </div>
        </nav>
    );
}
