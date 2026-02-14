"use client";

import { motion } from "framer-motion";
import { Map, Radio, Users, Truck, AlertOctagon } from "lucide-react";

export function ResponderDashboard({ user, weather, riskLevel }: any) {
    return (
        <div className="space-y-6">
            {/* Tactical Map Placeholder */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 h-[400px] relative"
            >
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.1,37.4,12,0/800x400?access_token=pk.eyJ1IjoidHJlZWhhY2tzIiwiYSI6ImNsZ3J6b3J6czBzbzEzZXB5eXJ6b3J6czAifQ.placeholder')] bg-cover bg-center opacity-50" />

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-700 text-xs font-mono text-green-400">
                    LIVE FEED • SECTOR 4 • ASSETS DEPLOYED
                </div>

                {/* Simulated Map Markers */}
                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(239,68,68,0.8)]" />

                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full border border-white" />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full border border-white" />

                <div className="absolute bottom-6 right-6 flex gap-2">
                    <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold border border-gray-600">LAYERS</button>
                    <button className="bg-fire-600 hover:bg-fire-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg animate-pulse">DEPLOY UNIT</button>
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
