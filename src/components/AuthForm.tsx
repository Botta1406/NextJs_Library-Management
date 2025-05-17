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
    const [showPassword, setShowPassword] = useState(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mb-4">
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

            {/* Switch between login and register */}
            <div className="text-center border-t border-gray-200 pt-4">
                {authMode === "login" ? (
                    <p className="text-gray-600">
                        Don't have an account yet?{" "}
                        <button
                            onClick={() => setAuthMode("register")}
                            className="text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                            Create one here
                        </button>
                    </p>
                ) : (
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => setAuthMode("login")}
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            Sign in here
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}