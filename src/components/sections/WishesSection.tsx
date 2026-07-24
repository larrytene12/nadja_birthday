"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WISHES } from "@/lib/content";

interface Balloon {
    id: number;
    wish: string;
    x: number;
    color: string;
    duration: number;
    delay: number;
}

const BALLOON_COLORS = [
    "#f9a8d4", "#c084fc", "#f472b6", "#a78bfa", "#fb7185",
];

export default function WishesSection() {
    const [balloons, setBalloons] = useState<Balloon[]>([]);
    const [launched, setLaunched] = useState(false);

    const launch = () => {
        const newBalloons = WISHES.map((wish, i) => ({
            id: i,
            wish,
            x: 10 + (i / (WISHES.length - 1)) * 80,
            color: BALLOON_COLORS[i % BALLOON_COLORS.length],
            duration: 5 + Math.random() * 3,
            delay: i * 0.6,
        }));
        setBalloons(newBalloons);
        setLaunched(true);
    };

    return (
        <section
            id="section-wishes"
            className="section-base overflow-hidden"
        >
            <motion.div
                className="text-center mb-8 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-purple-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Harapan Untukmu 🎈
                </h2>
                <p className="text-purple-400 text-sm mb-6">Harapan-harapan yang aku kirimkan ke langit</p>

                {!launched && (
                    <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium shadow-pink"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={launch}
                    >
                        🎈 Lepaskan Balon Harapan!
                    </motion.button>
                )}
            </motion.div>

            {/* Balloon container */}
            <div className="relative w-full max-w-lg mx-auto" style={{ height: "500px" }}>
                <AnimatePresence>
                    {balloons.map((balloon) => (
                        <motion.div
                            key={balloon.id}
                            className="absolute bottom-0 flex flex-col items-center"
                            style={{ left: `${balloon.x}%`, transform: "translateX(-50%)" }}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                                y: -480,
                                opacity: [0, 1, 1, 0.7, 0],
                            }}
                            transition={{
                                duration: balloon.duration,
                                delay: balloon.delay,
                                ease: "easeOut",
                            }}
                        >
                            {/* Balloon */}
                            <div
                                className="flex flex-col items-center"
                                style={{
                                    animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                                }}
                            >
                                <div
                                    className="w-16 h-20 rounded-full flex items-center justify-center shadow-lg relative"
                                    style={{ backgroundColor: balloon.color }}
                                >
                                    <p className="text-white text-[9px] text-center px-1 leading-tight font-medium">
                                        {balloon.wish.substring(0, 40)}...
                                    </p>
                                    {/* Balloon knot */}
                                    <div
                                        className="absolute -bottom-2 w-3 h-3 rounded-full"
                                        style={{ backgroundColor: balloon.color }}
                                    />
                                </div>
                                {/* String */}
                                <div
                                    className="w-px h-12"
                                    style={{ backgroundColor: balloon.color, opacity: 0.7 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Wishes list below */}
            <div className="z-10 max-w-md mx-auto px-4 space-y-3 mt-4">
                {WISHES.map((wish, i) => (
                    <motion.div
                        key={i}
                        className="glass-card rounded-2xl px-4 py-3 flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <span className="text-lg flex-shrink-0">🎀</span>
                        <p className="text-gray-600 text-sm leading-relaxed">{wish}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
