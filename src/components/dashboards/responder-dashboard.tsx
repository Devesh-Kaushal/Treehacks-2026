"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Truck, Bell } from "lucide-react";
import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("../interactive-map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center text-gray-500 font-mono">Loading Tactical Map...</div>
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResponderDashboard({ user }: any) {
    // Default to Palo Alto coordinates if user location unavailable
    const center: [number, number] = [user?.location?.lat || 37.4419, user?.location?.lng || -122.1430];
    const [alertSent, setAlertSent] = useState(false);

    // Simulated live units
    const markers: Array<{ pos: [number, number]; label: string }> = [
        { pos: [37.42, -122.15], label: "Unit 42 (Active)" },
        { pos: [center[0] + 0.01, center[1] - 0.01], label: "Hazard: Downed Line" }
    ];

    const handleDeploy = () => {
        setAlertSent(true);
        setTimeout(() => setAlertSent(false), 3000);
    };

    return (
        <div className="space-y-6 relative">
            <AnimatePresence>
                {alertSent && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 left-1/2 z-[9999] bg-fire-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold border border-fire-400"
                    >
                        <Bell className="w-5 h-5 animate-bounce" />
                        <span>ALERT BROADCAST SENT TO 142 RESIDENTS</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tactical Map (Interactive) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 h-[400px] relative z-0"
            >
                <div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-700 text-xs font-mono text-green-400 pointer-events-none">
                    LIVE FEED • SECTOR 4 • ASSETS DEPLOYED
                </div>

                <div className="w-full h-full filter invert-[.9] hue-rotate-180 contrast-125">
                    {/* CSS Filter hack to make OSM look "Dark Mode" / Tactical */}
                    <InteractiveMap center={center} markers={markers} />
                </div>

                <div className="absolute bottom-6 right-6 z-[400] flex gap-2">
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold border border-gray-600 shadow-lg">LAYERS</button>
                    <button onClick={handleDeploy} className="bg-fire-600 hover:bg-fire-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg animate-pulse active:scale-95 transition-transform">
                        DEPLOY UNIT & ALERT
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                        <Truck className="w-6 h-6 text-blue-400" />
                        <span className="text-xs font-mono text-gray-400">UNIT STATUS</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm"><span>Engine 42</span><span className="text-green-400">En Route</span></div>
                        <div className="flex justify-between text-sm"><span>Ladder 12</span><span className="text-gray-400">Station</span></div>
                        <div className="flex justify-between text-sm"><span>Brush 08</span><span className="text-yellow-400">On Scene</span></div>
                    </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                        <Users className="w-6 h-6 text-purple-400" />
                        <span className="text-xs font-mono text-gray-400">VULNERABLE POPULATIONS</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">142</div>
                    <p className="text-sm text-gray-400">Registered AFN residents in active Red Zone.</p>
                    <button className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-bold">VIEW LIST</button>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                        <Radio className="w-6 h-6 text-orange-400" />
                        <span className="text-xs font-mono text-gray-400">COMMS LOG</span>
                    </div>
                    <div className="space-y-2 text-xs font-mono text-gray-300">
                        <div className="border-l-2 border-green-500 pl-2 py-1">11:42 - Spot fire contained at Ridge Rd.</div>
                        <div className="border-l-2 border-red-500 pl-2 py-1">11:38 - High wind warning issued.</div>
                        <div className="border-l-2 border-blue-500 pl-2 py-1">11:15 - Engine 42 dispatched.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
