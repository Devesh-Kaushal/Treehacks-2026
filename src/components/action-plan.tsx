"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Shield, TreePine, Users, Zap, Trophy, X } from "lucide-react";
import clsx from "clsx";

type ActionItem = {
    id: string;
    title: string;
    description: string;
    category: "structure" | "landscape" | "community" | "emergency";
    difficulty: "easy" | "medium" | "hard";
    completed: boolean;
};

const INITIAL_ACTIONS: ActionItem[] = [
    {
        id: "1",
        title: "Clear Dead Vegetation",
        description: "Remove dry leaves and pine needles from roof and gutters.",
        category: "landscape",
        difficulty: "easy",
        completed: false,
    },
    {
        id: "2",
        title: "Create Defensible Space",
        description: "Maintain a lean, clean, and green zone (30ft) around your home.",
        category: "landscape",
        difficulty: "medium",
        completed: false,
    },
    {
        id: "3",
        title: "Prepare Emergency Kit",
        description: "Pack water, food, first aid, and documents for evacuation.",
        category: "emergency",
        difficulty: "easy",
        completed: false,
    },
    {
        id: "4",
        title: "Harden Your Home",
        description: "Install ember-resistant vents and fire-rated roofing materials.",
        category: "structure",
        difficulty: "hard",
        completed: false,
    },
    {
        id: "5",
        title: "Join Firewise Group",
        description: "Connect with neighbors to leverage community resources.",
        category: "community",
        difficulty: "medium",
        completed: false,
    },
];

const categoryIcons = {
    structure: <Shield className="w-5 h-5" />,
    landscape: <TreePine className="w-5 h-5" />,
    community: <Users className="w-5 h-5" />,
    emergency: <Zap className="w-5 h-5" />,
};

const difficultyColors = {
    easy: "bg-blue-100 text-blue-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
};

export function ActionPlan() {
    const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
    const [showConfetti, setShowConfetti] = useState(false);

    const completedCount = actions.filter(a => a.completed).length;
    const progress = (completedCount / actions.length) * 100;

    useEffect(() => {
        if (progress === 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    }, [progress]);

    const toggleAction = (id: string) => {
        setActions(prev => prev.map(a =>
            a.id === id ? { ...a, completed: !a.completed } : a
        ));
    };

    return (
        <section className="py-24 px-6 bg-sand-50 relative overflow-hidden" id="action-plan">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#2d5a27 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-forest-900 mb-4"
                    >
                        Your Mission Control
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-forest-800/70 text-lg max-w-2xl mx-auto"
                    >
                        Track your progress towards a safer home and community. Every step counts.
                    </motion.p>
                </div>

                {/* Progress Dashboard */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 shadow-glass border border-forest-900/5 mb-12 flex flex-col md:flex-row items-center gap-8 sticky top-6 z-30 backdrop-blur-md bg-white/90"
                >
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className="text-4xl font-bold text-forest-500">{Math.round(progress)}%</span>
                                <span className="text-gray-400 font-medium ml-2 uppercase text-sm tracking-wider">Readiness Score</span>
                            </div>
                            <div className="text-right">
                                <span className="font-bold text-forest-900">{completedCount}</span>
                                <span className="text-gray-400"> / {actions.length} Missions</span>
                            </div>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-forest-500 to-fire-500 relative"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "circOut" }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gray-200" />

                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className={clsx(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                            progress === 100 ? "bg-fire-100 text-fire-500" : "bg-gray-100 text-gray-400"
                        )}>
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-400 font-medium uppercase">Current Status</div>
                            <div className="font-bold text-forest-900">
                                {progress === 100 ? "Community Hero" : progress > 50 ? "Rising Guardian" : "Apprentice"}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {actions.map((action, index) => (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                layout
                                onClick={() => toggleAction(action.id)}
                                className={clsx(
                                    "group relative p-6 rounded-2xl border transition-all cursor-pointer h-full flex flex-col",
                                    action.completed
                                        ? "bg-forest-50 border-forest-200 shadow-inner"
                                        : "bg-white border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-fire-200"
                                )}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={clsx(
                                        "p-2 rounded-lg transition-colors",
                                        action.completed ? "bg-forest-200 text-forest-700" : "bg-gray-100 text-gray-500 group-hover:bg-fire-50 group-hover:text-fire-500"
                                    )}>
                                        {categoryIcons[action.category]}
                                    </div>
                                    <div className={clsx(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        action.completed ? "bg-forest-500 border-forest-500 text-white" : "border-gray-300 group-hover:border-fire-400"
                                    )}>
                                        {action.completed && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                </div>

                                <h3 className={clsx(
                                    "text-xl font-bold mb-2 transition-colors",
                                    action.completed ? "text-forest-800 line-through decoration-forest-800/30" : "text-forest-900"
                                )}>
                                    {action.title}
                                </h3>

                                <p className="text-forest-900/60 text-sm mb-6 flex-grow">
                                    {action.description}
                                </p>

                                <div className="flex items-center gap-2 mt-auto">
                                    <span className={clsx("text-xs font-bold px-2 py-1 rounded-full uppercase", difficultyColors[action.difficulty])}>
                                        {action.difficulty}
                                    </span>
                                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide ml-auto">
                                        {action.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="bg-white rounded-3xl p-12 text-center shadow-2xl"
                    >
                        <div className="text-8xl mb-6">🎉</div>
                        <h2 className="text-4xl font-display font-bold text-forest-900 mb-2">Mission Complete!</h2>
                        <p className="text-xl text-forest-600">You are officially a Wildfire Guard.</p>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
