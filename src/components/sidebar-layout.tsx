"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    CheckSquare,
    Users,
    User,
    Bell,
    Menu,
    X,
    LogOut,
    Shield,
    ChevronLeft,
    ChevronRight,
    Sparkles
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import clsx from "clsx";

interface SidebarLayoutProps {
    children: React.ReactNode;
    activeScreen: "dashboard" | "todo" | "community" | "alerts" | "profile" | "chat";
    onScreenChange: (screen: "dashboard" | "todo" | "community" | "alerts" | "profile" | "chat") => void;
}

export function SidebarLayout({ children, activeScreen, onScreenChange }: SidebarLayoutProps) {
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "chat", label: "AI Assistant", icon: Sparkles },
        { id: "todo", label: "To-Do List", icon: CheckSquare },
        { id: "community", label: "Community", icon: Users },
        { id: "alerts", label: "Alerts", icon: Bell },
        { id: "profile", label: "Profile", icon: User },
    ] as const;

    // Handle responsive behavior
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const sidebarVariants = {
        mobile: {
            x: isMobileOpen ? 0 : -300,
            width: 280,
            transition: { type: "spring" as const, damping: 20, stiffness: 100 }
        },
        desktop: {
            x: 0,
            width: isCollapsed ? 80 : 280,
            transition: { width: { duration: 0.3, ease: "easeInOut" as const } }
        }
    };

    return (
        <div className="h-screen w-full bg-sand-50 flex overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-forest-900 text-white rounded-xl shadow-lg"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={isDesktop ? "desktop" : "mobile"}
                variants={sidebarVariants}
                className={clsx(
                    "fixed lg:relative h-screen z-40 flex flex-col",
                    "bg-gradient-forest shadow-2xl"
                )}
                style={{
                    background: 'linear-gradient(180deg, #0a1810 0%, #0f281e 50%, #1a4231 100%)'
                }}
            >
                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-fire-500/10 via-transparent to-forest-500/10 pointer-events-none" />

                {/* Header */}
                <div className="relative p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <div className="p-2 bg-gradient-to-br from-fire-500 to-fire-600 rounded-xl shadow-lg">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-base text-white">Resonant</span>
                                    <div className="text-xs text-fire-400 font-semibold">CWPP</div>
                                </div>
                            </motion.div>
                        )}
                        {isCollapsed && (
                            <div className="p-2 bg-gradient-to-br from-fire-500 to-fire-600 rounded-xl shadow-lg mx-auto">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                        )}

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4 text-white" /> : <ChevronLeft className="w-4 h-4 text-white" />}
                        </button>
                    </div>
                </div>

                {/* User Info */}
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative p-6 border-b border-white/10"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fire-500 to-amber-500 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-forest-900" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold truncate text-white">{user?.name || "User"}</div>
                                <div className="text-xs text-white/60 truncate capitalize">
                                    {user?.profileType?.replace(/_/g, " ") || "Resident"}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Navigation */}
                <nav className="relative flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeScreen === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    onScreenChange(item.id);
                                    setIsMobileOpen(false);
                                }}
                                className={clsx(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group",
                                    isActive
                                        ? "bg-gradient-to-r from-fire-500 to-fire-600 text-white shadow-lg shadow-fire-500/30"
                                        : "hover:bg-white/10 text-white/70 hover:text-white",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-fire-500 to-fire-600"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <Icon className="w-5 h-5 shrink-0 relative z-10" />
                                {!isCollapsed && <span className="font-medium relative z-10">{item.label}</span>}
                                {!isCollapsed && !isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-fire-500/0 to-fire-500/0 group-hover:from-fire-500/10 group-hover:to-fire-600/10 transition-all" />
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className={clsx(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                            "hover:bg-red-500/20 text-white/80 hover:text-white",
                            isCollapsed && "justify-center"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
