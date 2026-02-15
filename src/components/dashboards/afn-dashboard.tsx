"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Phone, Pill, Battery, UserCheck } from "lucide-react";

// Access & Functional Needs Dashboard
// Design Goals: High contrast, large touch targets, simplified actions
// AFN Dashboard
export function AFNDashboard() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 border-2 border-forest-100 shadow-xl"
            >
                <h2 className="text-3xl font-bold text-forest-900 mb-6 flex items-center gap-3">
                    <HeartHandshake className="w-10 h-10 text-fire-500" />
                    Priority Assistance
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="bg-fire-50 hover:bg-fire-100 border-2 border-fire-200 p-6 rounded-2xl text-left transition-colors group">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-fire-500 text-white p-3 rounded-full group-hover:scale-110 transition-transform">
                                <UserCheck className="w-8 h-8" />
                            </div>
                            <span className="text-lg font-bold text-fire-900 uppercase tracking-wide">Status Check</span>
                        </div>
                        <p className="text-fire-800 text-lg font-medium">I am safe for now.</p>
                        <p className="text-sm text-fire-700 mt-2">Last updated: Today, 8:00 AM</p>
                    </button>

                    <button className="bg-white hover:bg-forest-50 border-2 border-forest-200 p-6 rounded-2xl text-left transition-colors group">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-forest-500 text-white p-3 rounded-full group-hover:scale-110 transition-transform">
                                <Phone className="w-8 h-8" />
                            </div>
                            <span className="text-lg font-bold text-forest-900 uppercase tracking-wide">Care Network</span>
                        </div>
                        <p className="text-forest-800 text-lg font-medium">Alert my 3 caregivers.</p>
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusCard icon={<Pill />} label="Medications" value="3 Days Left" status="ok" />
                <StatusCard icon={<Battery />} label="Power Backup" value="100%" status="good" />
                <StatusCard icon={<Phone />} label="Emerg. Contact" value="Verified" status="good" />
                <StatusCard icon={<UserCheck />} label="Evac Plan" value="Review Needed" status="warn" />
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">Accessibility Note</h3>
                <p className="text-blue-800">
                    Your location is shared with Fire Dept Station 42 because you have marked &quot;Mobility Assistance&quot; in your profile.
                </p>
            </div>
        </div>
    );
}

function StatusCard({ icon, label, value, status }: { icon: React.ReactNode, label: string, value: string, status: "good" | "ok" | "warn" }) {
    const colors = {
        good: "bg-green-50 border-green-200 text-green-700",
        ok: "bg-blue-50 border-blue-200 text-blue-700",
        warn: "bg-amber-50 border-amber-200 text-amber-700",
    };

    return (
        <div className={`p-4 rounded-xl border ${colors[status as keyof typeof colors]} flex flex-col items-center text-center gap-2`}>
            <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
            <div>
                <div className="text-xs font-bold uppercase opacity-70">{label}</div>
                <div className="font-bold text-lg">{value}</div>
            </div>
        </div>
    )
}
