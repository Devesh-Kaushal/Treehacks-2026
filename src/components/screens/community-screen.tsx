"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Megaphone, AlertCircle, Clock, MapPin, ExternalLink, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

interface CommunityUpdate {
    id: string;
    source: "fire_dept" | "police" | "emergency_services" | "local_gov";
    title: string;
    message: string;
    timestamp: Date;
    location?: string;
    priority: "low" | "medium" | "high" | "critical";
    link?: string;
}

const MOCK_UPDATES: CommunityUpdate[] = [
    {
        id: "1",
        source: "fire_dept",
        title: "Red Flag Warning Issued",
        message: "High winds and low humidity expected through Thursday. Avoid outdoor burning and secure loose items.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
        location: "Palo Alto, CA",
        priority: "critical",
    },
    {
        id: "2",
        source: "police",
        title: "Evacuation Route Update",
        message: "Highway 280 southbound is now the primary evacuation route. Highway 101 experiencing heavy traffic.",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        location: "Santa Clara County",
        priority: "high",
    },
    {
        id: "3",
        source: "local_gov",
        title: "Community Fire Safety Workshop",
        message: "Join us Saturday 10 AM at City Hall for a free workshop on home hardening and defensible space.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        location: "Palo Alto City Hall",
        priority: "medium",
        link: "https://example.com/workshop"
    },
    {
        id: "4",
        source: "fire_dept",
        title: "Spot Fire Contained",
        message: "Small vegetation fire on Ridge Road has been fully contained. No structures threatened. Crews monitoring for hotspots.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        location: "Ridge Road",
        priority: "low",
    },
    {
        id: "5",
        source: "emergency_services",
        title: "Emergency Alert System Test",
        message: "Scheduled test of the emergency alert system will occur tomorrow at 2 PM. No action required.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        location: "County-wide",
        priority: "low",
    },
];

const sourceInfo = {
    fire_dept: { label: "Fire Dept", icon: Flame, color: "red", gradient: "from-red-500 to-red-600" },
    police: { label: "Police Dept", icon: ShieldAlert, color: "blue", gradient: "from-blue-500 to-blue-600" },
    emergency_services: { label: "Emergency", icon: AlertCircle, color: "orange", gradient: "from-orange-500 to-orange-600" },
    local_gov: { label: "City Hall", icon: Megaphone, color: "green", gradient: "from-green-500 to-green-600" },
};

// Need to import Flame locally since it wasn't in original file
import { Flame } from "lucide-react";

export function CommunityScreen() {
    const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");

    const filteredUpdates = MOCK_UPDATES.filter(update => {
        if (filter === "all") return true;
        return update.priority === filter;
    });

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                            <Radio className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-forest-900">
                            Official Updates
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            const feedback = prompt("What feedback or question do you have for the local wildfire authorities?");
                            if (feedback) alert("Thank you! Your feedback has been sent to the Santa Clara County Fire Department. They will review it for the next CWPP update.");
                        }}
                        className="bg-forest-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-forest-800 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        <Megaphone className="w-5 h-5" />
                        Report a Concern
                    </button>
                </div>
                <p className="text-gray-600 text-lg ml-14">
                    Real-time intelligence from trusted authorities
                </p>
            </motion.div>

            {/* Active Alerts Banner */}
            <AnimatePresence>
                {MOCK_UPDATES.some(u => u.priority === "critical") && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-6 shadow-xl shadow-red-500/20 overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                                <AlertCircle className="w-8 h-8 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                                    Active Red Flag Warning
                                    <span className="px-2 py-0.5 bg-white text-red-600 text-xs font-black uppercase rounded-full tracking-wider">Live</span>
                                </h3>
                                <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                                    Extreme fire weather conditions in effect. Stay alert and follow all safety guidelines immediately.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">Filter Feed</h3>
                    <div className="flex flex-col gap-2">
                        {(["all", "critical", "high", "medium", "low"] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={clsx(
                                    "px-4 py-3 rounded-xl font-bold text-sm transition-all text-left flex items-center justify-between group",
                                    filter === f
                                        ? "bg-forest-900 text-white shadow-lg"
                                        : "bg-white text-gray-600 hover:bg-gray-50 hover:pl-5 shadow-sm border border-gray-100"
                                )}
                            >
                                <span className="capitalize">{f} Priority</span>
                                {filter === f && <motion.div layoutId="activeDot" className="w-2 h-2 bg-fire-500 rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Updates Feed */}
                <div className="lg:col-span-3 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredUpdates.map((update, index) => {
                            const source = sourceInfo[update.source];
                            const Icon = source.icon;

                            return (
                                <motion.div
                                    key={update.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden"
                                >
                                    {/* Priority Line Indicator */}
                                    <div className={clsx(
                                        "absolute left-0 top-0 bottom-0 w-1.5",
                                        update.priority === "critical" ? "bg-red-500" :
                                            update.priority === "high" ? "bg-orange-500" :
                                                update.priority === "medium" ? "bg-blue-500" : "bg-gray-300"
                                    )} />

                                    <div className="flex items-start gap-4 pl-2">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${source.gradient} shadow-lg shrink-0 text-white`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold text-forest-600 uppercase tracking-wide bg-forest-50 px-2 py-0.5 rounded-md border border-forest-100">
                                                            {source.label}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDistanceToNow(update.timestamp, { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-700 transition-colors">
                                                        {update.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {update.message}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-50">
                                                {update.location && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        <span className="font-semibold text-gray-700">{update.location}</span>
                                                    </div>
                                                )}
                                                {update.link && (
                                                    <a
                                                        href={update.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-fire-600 hover:text-fire-700 font-bold ml-auto hover:underline decoration-2 underline-offset-2"
                                                    >
                                                        <span>Official Source</span>
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {filteredUpdates.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
                                <ShieldAlert className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-400 text-lg font-medium">No updates found for this priority level.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
