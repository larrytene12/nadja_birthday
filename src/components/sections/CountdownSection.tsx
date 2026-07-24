"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PinkMatrixRain from "@/components/ui/PinkMatrixRain";

interface CountdownSectionProps {
    onComplete: () => void;
}

const NUMBERS = [5, 4, 3, 2, 1];

export default function CountdownSection({ onComplete }: CountdownSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (currentIndex < NUMBERS.length) {
            const timer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            const finishTimer = setTimeout(() => {
                setDone(true);
                setTimeout(onComplete, 600);
            }, 400);
            return () => clearTimeout(finishTimer);
        }
    }, [currentIndex, onComplete]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-50 overflow-hidden"
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                >
                    <PinkMatrixRain />

                    {/* Decorative top text */}
                    <motion.p
                        className="font-script text-pink-400 text-xl mb-8 text-center px-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Sebuah kejutan spesial menantimu...
                    </motion.p>

                    {/* Countdown number */}
                    <div className="relative w-full h-80 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {currentIndex < NUMBERS.length ? (
                                <motion.div
                                    key={NUMBERS[currentIndex]}
                                    className="absolute font-serif-display text-[15rem] md:text-[22rem] font-bold"
                                    style={{
                                        background: "linear-gradient(135deg, #f472b6, #c084fc)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        filter: "drop-shadow(0 4px 12px rgba(244,114,182,0.4))",
                                    }}
                                    initial={{ y: -120, opacity: 0, scale: 0.3 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: 60, opacity: 0, scale: 0.5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    {NUMBERS[currentIndex]}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="burst"
                                    className="text-6xl"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.4, 1] }}
                                    transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" }}
                                >
                                    🎉
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="flex gap-2 mt-10">
                        {NUMBERS.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full"
                                animate={{
                                    backgroundColor: i < currentIndex ? "#f472b6" : "#fce7f3",
                                    scale: i === currentIndex - 1 ? [1, 1.4, 1] : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
