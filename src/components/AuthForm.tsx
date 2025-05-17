// components/AuthForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export function AuthForm() {
    const [authMode, setAuthMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Listen for custom events to open login/register forms
        const handleOpenLogin = () => setAuthMode("login");
        const handleOpenRegister = () => setAuthMode("register");

        document.addEventListener('open-login', handleOpenLogin);
        document.addEventListener('open-register', handleOpenRegister);

        return () => {
            document.removeEventListener('open-login', handleOpenLogin);
            document.removeEventListener('open-register', handleOpenRegister);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            router.push("/");
        } catch (err) {
            setError("Failed to log in. Please check your credentials.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            router.push("/");
        } catch (err) {
            setError("Failed to create account. Email may be in use.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 max-w-md w-full">
            <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setAuthMode("login")}
                        className={`px-4 py-2 font-medium rounded-md transition-colors ${
                            authMode === "login"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuthMode("register")}
                        className={`px-4 py-2 font-medium rounded-md transition-colors ${
                            authMode === "register"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Register
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">
                {authMode === "login" ? "Login to your account" : "Create a new account"}
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={authMode === "login" ? handleLogin : handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full ${
                            authMode === "login" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                        } text-white px-4 py-3 rounded-md transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Processing..." : authMode === "login" ? "Login" : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}