"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";

export function FeedbackLoop() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="py-24 px-6 relative" id="feedback">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-forest-900/10 to-transparent" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 text-forest-800 text-sm font-bold mb-6"
                    >
                        <MessageSquare className="w-4 h-4" /> Community Voice
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-forest-900 mb-6"
                    >
                        Shape Our Future
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-forest-800/70 text-lg max-w-2xl mx-auto"
                    >
                        This plan adapts to your needs. Share your on-the-ground experience to help local policymakers improve wildfire safety strategies.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel-white bg-white rounded-3xl p-1 shadow-2xl"
                >
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-forest-50/50 rounded-[22px] p-16 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-display font-bold text-forest-900 mb-4">Feedback Received</h3>
                                <p className="text-forest-700 text-lg max-w-lg mx-auto mb-8">
                                    Thank you for contributing. Your insights have been securely transmitted to the TreeHacks Wildfire Data/Policy team.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-forest-600 font-bold hover:text-forest-800 transition-colors border-b-2 border-forest-600/20 hover:border-forest-600"
                                >
                                    Submit another report
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="bg-white rounded-[22px] p-8 md:p-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-2">
                                        <label htmlFor="topic" className="block text-sm font-bold text-forest-900 uppercase tracking-wide">Topic</label>
                                        <select id="topic" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 focus:ring-0 outline-none transition-all text-forest-900">
                                            <option>Report a Hazard</option>
                                            <option>Share Success Story</option>
                                            <option>Request Resources</option>
                                            <option>Policy Suggestion</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="location" className="block text-sm font-bold text-forest-900 uppercase tracking-wide">Location (Optional)</label>
                                        <input type="text" id="location" placeholder="e.g. Palo Alto, 94305" className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 focus:ring-0 outline-none transition-all text-forest-900" />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <label htmlFor="message" className="block text-sm font-bold text-forest-900 uppercase tracking-wide">Your Insight</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-fire-500 focus:ring-0 outline-none transition-all text-forest-900 resize-none"
                                        placeholder="Describe your experience or suggestion..."
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-400">
                                        Protected by <span className="font-semibold text-gray-600">TreeHacks Secure</span>
                                    </p>
                                    <button
                                        type="submit"
                                        className="bg-forest-900 hover:bg-forest-800 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-3"
                                    >
                                        Submit Report <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
