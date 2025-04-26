// app/layout.tsx
import "../app/globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata = {
    title: "Library Management System",
    description: "A simple library management system built with Next.js 15",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-gray-50">
        <NavBar />
        <main className="container mx-auto px-4 py-8">{children}</main>
        </body>
        </html>
    );
}