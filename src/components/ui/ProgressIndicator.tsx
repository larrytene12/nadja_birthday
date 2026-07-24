"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProgressIndicatorProps {
    total: number;
    current: number;
}

const FLOWERS = ["/flowers/flower-1.png", "/flowers/flower-2.png"];

export default function ProgressIndicator({ total, current }: ProgressIndicatorProps) {
    return (
        <div
            className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5"
            aria-label="Section progress"
        >
            {Array.from({ length: total }, (_, i) => (
                <motion.div
                    key={i}
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <motion.div
                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${i <= current
                            ? "bg-pink-400 shadow-lg shadow-pink-300"
                            : "bg-pink-100 border border-pink-200"
                            }`}
                        animate={i === current ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5, repeat: i === current ? Infinity : 0, repeatDelay: 2 }}
                        title={`Section ${i + 1}`}
                    >
                        {i <= current ? (
                            <Image
                                src={FLOWERS[i % 2]}
                                alt="progress"
                                width={12}
                                height={12}
                                style={{ objectFit: 'contain' }}
                                quality={60}
                            />
                        ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                        )}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
