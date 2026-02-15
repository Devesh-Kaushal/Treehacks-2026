"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";
import Link from "next/link";
import { UserProfileType, User } from "@/lib/auth-context";

export default function SignupPage() {
    const router = useRouter();
    // const { login } = useAuth(); // We'll manually handle login redirect after signup
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "Palo Alto", // Default
        profileType: "resident_general" as UserProfileType,
        password: "",
        confirmPassword: ""
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create User Object (Simulating backend creation)
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            profileType: formData.profileType,
            location: { lat: 37.4, lng: -122.1 } // Default lat/long for now
        };

        // Store in localStorage 'db' to simulate persistence for the Login page to find
        const users = JSON.parse(localStorage.getItem("cwpp_users_db") || "[]");
        users.push({ ...newUser, password: formData.password });
        localStorage.setItem("cwpp_users_db", JSON.stringify(users));

        // Redirect to Login Page as requested
        router.push("/login?registered=true");
    };

    return (
        <div className="min-h-screen bg-sand-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-900 text-white mb-6">
                        <Shield className="w-5 h-5 fill-fire-500 text-fire-500" />
                        <span className="font-bold tracking-wide">Resonant CWPP</span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-forest-900 mb-2">
                        Create Account
                    </h1>
                    <p className="text-forest-800/60">
                        Join your community&apos;s wildfire defense network.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-glass border border-forest-900/5 p-8 md:p-10"
                >
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-forest-900 uppercase ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-forest-900 uppercase ml-1">Phone</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                    placeholder="(555) 123-4567"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-forest-900 uppercase ml-1">City (CA)</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                >
                                    <option value="Palo Alto">Palo Alto</option>
                                    <option value="Menlo Park">Menlo Park</option>
                                    <option value="Mountain View">Mountain View</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="San Francisco">San Francisco</option>
                                    <option value="San Diego">San Diego</option>
                                    <option value="Redding">Redding</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-forest-900 uppercase ml-1">Role</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 outline-none font-medium"
                                value={formData.profileType}
                                onChange={e => setFormData({ ...formData, profileType: e.target.value as UserProfileType })}
                            >
                                <option value="resident_general">Resident</option>
                                <option value="first_responder">First Responder (Fire/Police)</option>
                                <option value="resident_afn">Access & Functional Needs</option>
                                <option value="youth_student">Student / Youth</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-forest-900 uppercase ml-1">Confirm</label>
                                <input
                                    required
                                    type="password"
                                    className={clsx(
                                        "w-full px-4 py-3 rounded-xl bg-gray-50 border-2 focus:border-fire-500 outline-none font-medium",
                                        error ? "border-red-300 bg-red-50" : "border-gray-100"
                                    )}
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-forest-900 text-white rounded-xl font-bold py-4 text-lg flex items-center justify-center gap-2 hover:bg-forest-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 mt-4"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                        </button>

                        <p className="text-center text-gray-500 mt-6">
                            Already have an account? <Link href="/login" className="font-bold text-forest-900 hover:underline">Sign In</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

// Utility for classNames
function clsx(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}
