"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Home, CheckCircle2, AlertTriangle, CloudRain } from "lucide-react";

export function ResidentDashboard() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Clean Gutters", category: "Property", completed: false },
        { id: 2, title: "Update Emergency Contacts", category: "Family", completed: false },
        { id: 3, title: "Check Smoke Detectors", category: "Property", completed: true },
    ]);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-glass border border-forest-900/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-32 bg-forest-50 rounded-full -mr-16 -mt-16 pointer-events-none" />

                <h2 className="text-2xl font-display font-bold text-forest-900 mb-6 flex items-center gap-2">
                    <Home className="w-6 h-6 text-forest-500" /> My Property Protection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Defensible Space Score</div>
                        <div className="text-5xl font-bold text-forest-900 mb-2">72<span className="text-2xl text-gray-400">/100</span></div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-forest-500 w-[72%]" />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            You are safer than 65% of neighbors. Clear 10ft of dry brush to reach 85/100.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {tasks.map(task => (
                            <div
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${task.completed ? 'bg-forest-50 border-forest-100 opacity-70' : 'bg-white border-gray-100 hover:border-forest-300'}`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-forest-500 border-forest-500 text-white' : 'border-gray-300'}`}>
                                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <span className={task.completed ? "line-through text-gray-400" : "font-medium text-forest-900"}>{task.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-fire-50 border border-fire-100 rounded-2xl p-6">
                    <AlertTriangle className="w-8 h-8 text-fire-500 mb-4" />
                    <h3 className="font-bold text-fire-900 mb-2">High Wind Alert</h3>
                    <p className="text-sm text-fire-800/80">Secure patio furniture and trash bins. Embers can travel miles.</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <CloudRain className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="font-bold text-blue-900 mb-2">Rain Forecast</h3>
                    <p className="text-sm text-blue-800/80">Incoming storm next Tuesday. Clear gutters now to prevent mudslides.</p>
                </div>

                <div className="bg-forest-50 border border-forest-100 rounded-2xl p-6">
                    <Shield className="w-8 h-8 text-forest-500 mb-4" />
                    <h3 className="font-bold text-forest-900 mb-2">Zone 4 Status</h3>
                    <p className="text-sm text-forest-800/80">No active threats in your immediate zone. Stay vigilant.</p>
                </div>
            </motion.div>
        </div>
    );
}
