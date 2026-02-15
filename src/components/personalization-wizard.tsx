"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Shield, Users, X, Sparkles } from "lucide-react";
import { useAuth, UserProfileType } from "@/lib/auth-context";

export function PersonalizationWizard() {
    const { updateProfile } = useAuth();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const [context, setContext] = useState<"individual" | "community" | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openWizard = () => setIsOpen(true);
    const closeWizard = () => setIsOpen(false);

    const handleProfileSelect = (p: UserProfileType) => {
        setProfile(p);
        setStep(2);
    };

    const handleContextSelect = (c: "individual" | "community") => {
        setContext(c);
        setStep(3);

        // Persist to Auth Context
        if (profile) {
            updateProfile({
                profileType: profile,
                resonanceContext: c
            });
        }

        setTimeout(() => {
            closeWizard();
            setStep(1); // Reset for next time
        }, 2000);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed bottom-8 right-8 z-40"
                    >
                        <button
                            onClick={openWizard}
                            className="group flex items-center gap-3 bg-fire-500 hover:bg-fire-400 text-white px-6 py-4 rounded-full shadow-glow transition-all active:scale-95"
                        >
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="font-bold tracking-wide">Customize Experience</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeWizard}
                            className="absolute inset-0 bg-forest-900/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="relative w-full max-w-2xl glass-panel bg-white/95 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={closeWizard}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-12">
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-4xl font-display font-bold text-forest-900 mb-4">Welcome Home</h2>
                                            <p className="text-gray-500 text-lg">Select your living situation to tailor the plan.</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => handleProfileSelect("homeowner")}
                                                className="group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-forest-500/30 hover:bg-forest-50/50 transition-all text-left flex flex-col items-center gap-4 hover:shadow-lg"
                                            >
                                                <div className="w-16 h-16 rounded-2xl bg-forest-100 text-forest-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Home className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-xl text-forest-900 mb-1">Homeowner</h3>
                                                    <p className="text-sm text-gray-500">I own and manage my property structure.</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => handleProfileSelect("renter")}
                                                className="group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-forest-500/30 hover:bg-forest-50/50 transition-all text-left flex flex-col items-center gap-4 hover:shadow-lg"
                                            >
                                                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Building2 className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-xl text-forest-900 mb-1">Renter</h3>
                                                    <p className="text-sm text-gray-500">I rent and focus on personal preparedness.</p>
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <h2 className="text-4xl font-display font-bold text-forest-900 mb-4">Your Priority</h2>
                                            <p className="text-gray-500 text-lg">What drives your wildfire prevention goals?</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => handleContextSelect("individual")}
                                                className="group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-fire-500/30 hover:bg-fire-50/50 transition-all text-left flex flex-col items-center gap-4 hover:shadow-lg"
                                            >
                                                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Shield className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-xl text-forest-900 mb-1">Asset Protection</h3>
                                                    <p className="text-sm text-gray-500">Focus on insurance and structural safety.</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => handleContextSelect("community")}
                                                className="group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-fire-500/30 hover:bg-fire-50/50 transition-all text-left flex flex-col items-center gap-4 hover:shadow-lg"
                                            >
                                                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Users className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-xl text-forest-900 mb-1">Community Care</h3>
                                                    <p className="text-sm text-gray-500">Focus on neighbors and nature-based solutions.</p>
                                                </div>
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full text-center text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                                        >
                                            Go Back
                                        </button>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-24 h-24 bg-gradient-to-tr from-forest-500 to-fire-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-glow animate-pulse">
                                            <Sparkles className="w-12 h-12 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-display font-bold text-forest-900 mb-2">Generating Plan...</h2>
                                        <p className="text-gray-500">Tailoring insights for a {profile} focused on {context}.</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-forest-500 to-fire-500"
                                    initial={{ width: "33%" }}
                                    animate={{ width: `${(step / 3) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
