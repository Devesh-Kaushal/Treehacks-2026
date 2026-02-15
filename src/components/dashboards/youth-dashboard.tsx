"use client";

import { motion } from "framer-motion";
import { Trophy, Star, BookOpen } from "lucide-react";

export function YouthDashboard() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none blur-3xl" />

                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <div className="text-indigo-200 font-bold uppercase tracking-wider text-sm mb-1">Current Rank</div>
                        <h2 className="text-4xl font-black italic flex items-center gap-3">
                            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            Junior Ranger
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-indigo-200 font-bold uppercase tracking-wider text-sm mb-1">XP Points</div>
                        <div className="text-4xl font-black">450 <span className="text-lg text-indigo-300">/ 500</span></div>
                    </div>
                </div>

                <div className="mt-8 bg-black/20 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-yellow-400 w-[90%] shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                </div>
                <p className="mt-2 text-sm text-indigo-200 font-medium">50 XP until next rank: &quot;Ember Watcher&quot;</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border-2 border-gray-100">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-500" /> Top Missions
                    </h3>
                    <div className="space-y-4">
                        <MissionItem title="Clean up Leaves" xp={50} bg="bg-green-100" text="text-green-700" />
                        <MissionItem title="Watch Safety Video" xp={20} bg="bg-blue-100" text="text-blue-700" />
                        <MissionItem title="Quiz: Fire Triangle" xp={100} bg="bg-purple-100" text="text-purple-700" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border-2 border-gray-100">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                            <div className="flex items-center gap-3">
                                <span className="font-black text-yellow-600">1</span>
                                <div className="w-8 h-8 bg-yellow-200 rounded-full" />
                                <span className="font-bold text-gray-900">Alex M.</span>
                            </div>
                            <span className="font-bold text-yellow-700">1200 XP</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <span className="font-black text-gray-400">2</span>
                                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                <span className="font-bold text-gray-900">You</span>
                            </div>
                            <span className="font-bold text-gray-600">450 XP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MissionItemProps {
    title: string;
    xp: number;
    bg: string;
    text: string;
}

function MissionItem({ title, xp, bg, text }: MissionItemProps) {
    return (
        <button className={`w-full flex items-center justify-between p-4 rounded-xl ${bg} ${text} font-bold hover:scale-[1.02] transition-transform`}>
            <span>{title}</span>
            <span className="bg-white/50 px-3 py-1 rounded-lg text-sm">+{xp} XP</span>
        </button>
    )
}
