"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RANDOM_SURPRISES } from "@/lib/content";
import { Sparkles } from "lucide-react";

export default function RandomSurpriseSection() {
    const [current, setCurrent] = useState<number | null>(null);
    const [key, setKey] = useState(0);

    const surprise = () => {
        let next: number;
        do {
            next = Math.floor(Math.random() * RANDOM_SURPRISES.length);
        } while (next === current && RANDOM_SURPRISES.length > 1);
        setCurrent(next);
        setKey((k) => k + 1);
    };

    const item = current !== null ? RANDOM_SURPRISES[current] : null;

    return (
        <section
            id="section-surprise"
            className="section-base"
        >
            <motion.div
                className="text-center mb-8 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Kejutan Lagi? 🎲
                </h2>
                <p className="text-pink-400 text-sm">Tiap kali tap, ada kejutan berbeda untukmu!</p>
            </motion.div>

            {/* Content area */}
            <div className="z-10 w-full max-w-sm mx-auto px-4">
                <AnimatePresence mode="wait">
                    {item && (
                        <motion.div
                            key={key}
                            className="glass-card rounded-3xl p-6 shadow-dreamy text-center mb-6"
                            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <div className="text-4xl mb-3">
                                {item.type === "quote" ? "💭" : "🧠"}
                            </div>
                            <p className="font-serif-display text-gray-600 text-sm leading-relaxed">
                                {item.content}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Surprise button */}
                <motion.button
                    className="w-full py-4 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 text-white rounded-3xl font-medium text-base shadow-dreamy flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(244,114,182,0.4)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={surprise}
                >
                    <motion.div
                        animate={{ rotate: [0, 20, -20, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                        <Sparkles size={20} />
                    </motion.div>
                    {current === null ? "✨ Tap untuk Kejutan!" : "🎲 Kejutan Lagi!"}
                </motion.button>

                {current !== null && (
                    <p className="text-pink-300 text-xs text-center mt-3">
                        {current + 1} dari {RANDOM_SURPRISES.length} kejutan ditemukan
                    </p>
                )}
            </div>
        </section>
    );
}
