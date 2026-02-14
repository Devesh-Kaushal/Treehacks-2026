"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth, User } from "@/lib/auth-context";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const registered = searchParams.get("registered");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check "database"
        const users = JSON.parse(localStorage.getItem("cwpp_users_db") || "[]");
        const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);

        if (user) {
            // Remove password before session storage
            const safeUser = { ...user };
            delete safeUser.password;

            login(safeUser);
            router.push("/");
        } else {
            setError("Invalid email or password");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-sand-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-900 text-white mb-6">
                        <Shield className="w-5 h-5 fill-fire-500 text-fire-500" />
                        <span className="font-bold tracking-wide">Resonant CWPP</span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-forest-800/60">
                        Sign in to access your dashboard.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-glass border border-forest-900/5 p-8"
                >
                    {registered && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span className="font-bold text-sm">Account created! Please sign in.</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-forest-900 uppercase ml-1">Email</label>
                            <input
                                required
                                type="email"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-forest-900 uppercase ml-1">Password</label>
                            <input
                                required
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm font-bold justify-center">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-forest-900 text-white rounded-xl font-bold py-4 text-lg flex items-center justify-center gap-2 hover:bg-forest-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 mt-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                        </button>

                        <p className="text-center text-gray-500 mt-6">
                            Don't have an account? <Link href="/signup" className="font-bold text-forest-900 hover:underline">Create Account</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
