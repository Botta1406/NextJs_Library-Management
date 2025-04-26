// components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Books", path: "/books" },
        { label: "Dashboard", path: "/dashboard" },
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-xl text-blue-600">
                            LibraryApp
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:flex space-x-4">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        pathname === item.path
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}