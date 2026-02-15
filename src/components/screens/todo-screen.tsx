"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, Plus, Calendar } from "lucide-react";
import clsx from "clsx";

interface Task {
    id: string;
    text: string;
    completed: boolean;
    category: "structure" | "landscape" | "community" | "emergency";
    difficulty: "easy" | "medium" | "hard";
    dueDate?: Date;
}

const INITIAL_TASKS: Task[] = [
    { id: "1", text: "Clear dead vegetation within 10ft of home", completed: false, category: "landscape", difficulty: "medium", dueDate: new Date(Date.now() + 86400000 * 2) },
    { id: "2", text: "Clean gutters and roof of debris", completed: true, category: "structure", difficulty: "hard" },
    { id: "3", text: "Create a family evacuation plan", completed: false, category: "emergency", difficulty: "easy" },
    { id: "4", text: "Sign up for community alerts", completed: false, category: "community", difficulty: "easy" },
    { id: "5", text: "Install 1/8 inch mesh over vents", completed: false, category: "structure", difficulty: "hard" },
    { id: "6", text: "Trim tree branches hanging over roof", completed: false, category: "landscape", difficulty: "medium" },
];

export function TodoScreen() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [newTaskText, setNewTaskText] = useState("");

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            text: newTaskText,
            completed: false,
            category: "structure",
            difficulty: "medium"
        };
        setTasks([newTask, ...tasks]);
        setNewTaskText("");
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-4xl font-display font-bold mb-2">
                        <span className="bg-gradient-to-r from-forest-900 to-forest-600 bg-clip-text text-transparent">
                            Wildfire Preparedness
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Complete these tasks to verify your safety compliance
                    </p>
                </div>

                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                    {(["all", "active", "completed"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                                filter === f
                                    ? "bg-forest-900 text-white shadow-md glow-sm"
                                    : "text-gray-500 hover:text-forest-900 hover:bg-gray-50"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-forest-900 to-forest-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-forest-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-forest-200 uppercase tracking-widest text-xs font-bold">
                            <Calendar className="w-4 h-4" />
                            <span>Weekly Goal</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">You&apos;re making great progress!</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-3 bg-forest-950/50 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-fire-400 to-fire-500 rounded-full shadow-[0_0_10px_rgba(255,107,53,0.5)]"
                                />
                            </div>
                            <span className="text-2xl font-bold font-mono">{progress}%</span>
                        </div>
                        <p className="mt-2 text-forest-200 text-sm">
                            {progress === 100 ? "All tasks completed! Great job." : `${tasks.length - tasks.filter(t => t.completed).length} more tasks to reach 100% compliance.`}
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <div className="w-24 h-24 rounded-full bg-forest-700/50 border border-forest-600 flex items-center justify-center backdrop-blur-md shadow-inner">
                            <Check className="w-10 h-10 text-fire-400" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Add Task Input */}
            <form onSubmit={addTask} className="relative group">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new preparedness task..."
                    className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white border border-gray-200 focus:border-forest-500 focus:ring-4 focus:ring-forest-500/10 outline-none transition-all shadow-sm group-hover:shadow-md text-lg placeholder:text-gray-400"
                />
                <button
                    type="submit"
                    disabled={!newTaskText.trim()}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-forest-900 text-white rounded-xl flex items-center justify-center hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </form>

            {/* Task List */}
            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 text-gray-400"
                        >
                            <p>No tasks found in this view.</p>
                        </motion.div>
                    ) : (
                        filteredTasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className={clsx(
                                    "group flex items-start gap-4 p-5 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-0.5",
                                    task.completed
                                        ? "bg-gray-50/80 border-gray-100 opacity-75"
                                        : "bg-white border-gray-100 shadow-sm"
                                )}
                            >
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={clsx(
                                        "mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                                        task.completed
                                            ? "bg-green-500 border-green-500 text-white shadow-sm"
                                            : "border-gray-300 hover:border-forest-500 hover:bg-forest-50"
                                    )}
                                >
                                    {task.completed && <Check className="w-4 h-4" />}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <div className={clsx(
                                        "text-lg font-medium transition-all mb-1",
                                        task.completed ? "text-gray-400 line-through decoration-2 decoration-gray-300" : "text-gray-900"
                                    )}>
                                        {task.text}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={clsx(
                                            "px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide",
                                            task.difficulty === "hard" ? "bg-red-50 text-red-600 border border-red-100" :
                                                task.difficulty === "medium" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                                                    "bg-green-50 text-green-600 border border-green-100"
                                        )}>
                                            {task.difficulty}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-500 border border-gray-200">
                                            {task.category}
                                        </span>
                                        {task.dueDate && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                Due {task.dueDate.toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    title="Delete task"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
