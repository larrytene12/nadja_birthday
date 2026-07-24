"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REASONS } from "@/lib/content";

export default function ReasonsWallSection() {
    const [flipped, setFlipped] = useState<Set<number>>(new Set());

    const toggleFlip = (id: number) => {
        setFlipped((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // Slightly random rotations for organic feel
    const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5];
    const bgColors = [
        "from-pink-100 to-rose-50",
        "from-purple-100 to-pink-50",
        "from-amber-50 to-orange-50",
        "from-pink-50 to-fuchsia-50",
        "from-lavender to-pink-50",
        "from-rose-50 to-pink-100",
        "from-fuchsia-50 to-purple-50",
    ];

    return (
        <section
            id="section-reasons"
            className="section-base py-20"
        >
            <motion.div
                className="text-center mb-10 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Alasan Kamu Spesial 💖
                </h2>
                <p className="text-pink-400 text-sm">Tap kartu untuk lihat lebih lanjut</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto px-4 z-10 relative">
                {REASONS.map((reason, i) => (
                    <motion.div
                        key={reason.id}
                        className="flip-card h-40 cursor-pointer"
                        style={{ rotate: rotations[i % rotations.length] }}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
                        onClick={() => toggleFlip(reason.id)}
                    >
                        <div
                            className={`flip-card-inner w-full h-full rounded-2xl ${flipped.has(reason.id) ? "flipped" : ""}`}
                            style={{ position: "relative", width: "100%", height: "100%" }}
                        >
                            {/* Front */}
                            <div
                                className={`flip-card-front w-full h-full rounded-2xl bg-gradient-to-br ${bgColors[i % bgColors.length]} border border-pink-100 shadow-md flex flex-col items-center justify-center p-3 text-center`}
                                style={{
                                    backfaceVisibility: "hidden",
                                    position: "absolute",
                                    inset: 0,
                                }}
                            >
                                <div className="text-3xl mb-2">💌</div>
                                <p className="text-pink-500 font-medium text-sm leading-tight">{reason.front}</p>
                                <p className="text-pink-300 text-xs mt-1">tap untuk buka ↺</p>
                            </div>
                            {/* Back */}
                            <div
                                className="flip-card-back w-full h-full rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center p-3 text-center"
                                style={{
                                    backfaceVisibility: "hidden",
                                    position: "absolute",
                                    inset: 0,
                                    transform: "rotateY(180deg)",
                                }}
                            >
                                <p className="text-white text-xs leading-relaxed">{reason.back}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
