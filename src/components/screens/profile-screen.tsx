"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Mail, Phone, MapPin, Shield, Edit2, Save, Award, LogOut, Clock } from "lucide-react";
import clsx from "clsx";

export function ProfileScreen() {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <h1 className="text-4xl font-display font-bold text-forest-900 mb-2">
                    My Account
                </h1>
                <p className="text-gray-600 text-lg">
                    Manage your personal information and safety profile
                </p>
            </motion.div>

            {/* Main Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-forest-800 to-forest-600" />

                <div className="relative z-10 flex flex-col md:flex-row items-end gap-6 mb-8 mt-12">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-fire-500 to-amber-500 flex items-center justify-center text-white text-5xl font-bold">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
                            <Shield className="w-5 h-5 fill-current" />
                        </div>
                    </div>

                    <div className="flex-1 mb-2">
                        <h2 className="text-3xl font-bold text-gray-900">{user?.name || "User"}</h2>
                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <span className="capitalize">{user?.profileType?.replace(/_/g, " ") || "Resident"}</span>
                            <span>•</span>
                            <span>Palo Alto, CA</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md mb-2",
                            isEditing ? "bg-forest-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        )}
                    >
                        {isEditing ? (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                        icon={<Mail className="w-5 h-5" />}
                        label="Email Address"
                        value={user?.email || "Not set"}
                        editable={isEditing}
                    />
                    <ProfileField
                        icon={<Phone className="w-5 h-5" />}
                        label="Phone Number"
                        value={user?.phone || "(555) 123-4567"}
                        editable={isEditing}
                    />
                    <ProfileField
                        icon={<MapPin className="w-5 h-5" />}
                        label="Primary Residence"
                        value={user?.city || "Palo Alto"}
                        editable={isEditing}
                    />
                    <ProfileField
                        icon={<Shield className="w-5 h-5" />}
                        label="Account Status"
                        value="Verified Resident"
                        editable={false}
                        highlight
                    />
                </div>
            </motion.div>

            {/* Impact Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <StatBox
                    label="Days Active"
                    value="47"
                    icon={<Clock className="w-6 h-6" />}
                    color="blue"
                />
                <StatBox
                    label="Tasks Completed"
                    value="12"
                    icon={<Award className="w-6 h-6" />}
                    color="amber"
                />
                <StatBox
                    label="Safety Score"
                    value="85"
                    icon={<Shield className="w-6 h-6" />}
                    color="green"
                />
            </motion.div>

            {/* Logout Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
            >
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </motion.div>
        </div>
    );
}

interface ProfileFieldProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    editable: boolean;
    highlight?: boolean;
}

function ProfileField({ icon, label, value, editable, highlight }: ProfileFieldProps) {
    return (
        <div className={clsx(
            "p-4 rounded-2xl border transition-all",
            highlight ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-100"
        )}>
            <div className="flex items-center gap-3 mb-2">
                <div className={clsx("p-2 rounded-lg", highlight ? "bg-green-100 text-green-600" : "bg-white text-gray-400 shadow-sm")}>
                    {icon}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    {label}
                </div>
            </div>
            {editable ? (
                <input
                    type="text"
                    defaultValue={value}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-900 font-medium focus:ring-2 focus:ring-forest-500 focus:border-transparent outline-none"
                />
            ) : (
                <div className={clsx("font-bold text-lg", highlight ? "text-green-700" : "text-gray-900")}>
                    {value}
                </div>
            )}
        </div>
    );
}

interface StatBoxProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: "blue" | "amber" | "green";
}

function StatBox({ label, value, icon, color }: StatBoxProps) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600",
        green: "bg-green-50 text-green-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:-translate-y-1 transition-transform duration-300">
            <div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                <div className="text-4xl font-black text-forest-900">{value}</div>
            </div>
            <div className={clsx("p-4 rounded-2xl", colors[color as keyof typeof colors])}>
                {icon}
            </div>
        </div>
    );
}
