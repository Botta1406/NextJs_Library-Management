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

// // components/NavBar.tsx
// "use client";
//
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BookOpen, User, Search, Menu, X } from "lucide-react";
//
// export function NavBar() {
//     const pathname = usePathname();
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [searchFocused, setSearchFocused] = useState(false);
//
//     // Check scroll position to change navbar appearance
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };
//
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//
//     const navItems = [
//         { label: "Home", path: "/" },
//         { label: "Books", path: "/books", icon: <BookOpen className="w-4 h-4 mr-1" /> },
//         { label: "Dashboard", path: "/dashboard", icon: <User className="w-4 h-4 mr-1" /> },
//         { label: "Events", path: "/events" },
//         { label: "About", path: "/about" },
//     ];
//
//     return (
//         <nav
//             className={`fixed w-full z-10 transition-all duration-300 ${
//                 isScrolled
//                     ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
//                     : "bg-transparent py-4"
//             }`}
//         >
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-between items-center">
//                     {/* Logo */}
//                     <div className="flex items-center">
//                         <Link
//                             href="/"
//                             className="flex items-center group"
//                         >
//                             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg mr-2 transition-transform group-hover:scale-110">
//                                 <BookOpen className="w-5 h-5" />
//                             </div>
//                             <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
//                 LibraryApp
//               </span>
//                         </Link>
//                     </div>
//
//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center space-x-2">
//                         {/* Search Bar */}
//                         <div className="relative mr-4">
//                             <div
//                                 className={`flex items-center border transition-all duration-200 rounded-full px-3 py-1 ${
//                                     searchFocused
//                                         ? "border-blue-400 bg-blue-50 shadow-sm w-64"
//                                         : "border-gray-300 w-48"
//                                 }`}
//                             >
//                                 <Search className="w-4 h-4 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search books..."
//                                     className="ml-2 outline-none bg-transparent text-sm w-full"
//                                     onFocus={() => setSearchFocused(true)}
//                                     onBlur={() => setSearchFocused(false)}
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Nav Links */}
//                         <div className="flex space-x-1">
//                             {navItems.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     href={item.path}
//                                     className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all ${
//                                         pathname === item.path
//                                             ? "bg-blue-100 text-blue-700 shadow-sm"
//                                             : "text-gray-700 hover:bg-gray-100"
//                                     }`}
//                                 >
//                                     {item.icon && item.icon}
//                                     {item.label}
//                                 </Link>
//                             ))}
//                         </div>
//
//                         {/* User Profile Button */}
//                         <div className="ml-2">
//                             <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">
//                                 <User className="w-4 h-4 mr-1" />
//                                 Login
//                             </button>
//                         </div>
//                     </div>
//
//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden flex items-center">
//                         <button
//                             className="text-gray-700 focus:outline-none"
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                         >
//                             {isMenuOpen ? (
//                                 <X className="w-6 h-6" />
//                             ) : (
//                                 <Menu className="w-6 h-6" />
//                             )}
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Mobile Menu */}
//                 {isMenuOpen && (
//                     <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
//                         <div className="pt-2 pb-3 space-y-1">
//                             {/* Mobile Search */}
//                             <div className="px-3 py-2">
//                                 <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
//                                     <Search className="w-4 h-4 text-gray-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search books..."
//                                         className="ml-2 outline-none bg-transparent text-sm w-full"
//                                     />
//                                 </div>
//                             </div>
//
//                             {/* Mobile Nav Links */}
//                             {navItems.map((item) => (
//                                 <Link
//                                     key={item.path}
//                                     href={item.path}
//                                     className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
//                                         pathname === item.path
//                                             ? "bg-blue-100 text-blue-700"
//                                             : "text-gray-700 hover:bg-gray-100"
//                                     }`}
//                                     onClick={() => setIsMenuOpen(false)}
//                                 >
//                                     {item.icon && item.icon}
//                                     {item.label}
//                                 </Link>
//                             ))}
//
//                             {/* Mobile Login Button */}
//                             <div className="px-3 pt-2">
//                                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-base font-medium flex items-center justify-center">
//                                     <User className="w-4 h-4 mr-2" />
//                                     Login
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }