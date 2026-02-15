"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-forest-900">
            {/* Background Video/Image Layer */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-forest-900/30 via-forest-900/60 to-forest-900 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1543328328-9f170af31648?q=80&w=2670&auto=format&fit=crop"
                    alt="California Wilderness"
                    fill
                    className="object-cover scale-110"
                    priority
                />
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-20 container mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-fire-500 animate-pulse" />
                    <span className="text-sm font-medium tracking-wide uppercase text-sand-50/90">TreeHacks 2026 Challenge</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Wildfire Safety, <br />
                    <span className="bg-gradient-to-r from-fire-400 via-fire-500 to-amber-500 bg-clip-text text-transparent italic">
                        Personaly Resonant.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-sand-200 mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Most wildfire plans are technical PDFs. We built a living platform that adapts to <span className="text-white font-bold">your</span> home, <span className="text-white font-bold">your</span> family, and <span className="text-white font-bold">your</span> neighborhood.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button className="group relative px-8 py-4 bg-fire-500 text-white rounded-full font-bold text-lg overflow-hidden shadow-glow hover:bg-fire-400 transition-all active:scale-95">
                        <span className="relative z-10 flex items-center gap-2">
                            Start Your Plan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button className="px-8 py-4 glass-panel rounded-full font-medium text-lg hover:bg-white/10 transition-all flex items-center gap-2">
                        Watch the Video
                        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[8px] border-l-white border-b-4 border-b-transparent ml-1" />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
}
