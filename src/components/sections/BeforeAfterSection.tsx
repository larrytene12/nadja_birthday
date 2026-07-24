"use client";

import Iridescence from "@/components/ui/Iridescence";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BEFORE_AFTER } from "@/lib/content";

export default function BeforeAfterSection() {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const getPosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setPosition((x / rect.width) * 100);
    }, []);

    const onMouseDown = () => { isDragging.current = true; };
    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) getPosition(e.clientX);
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onTouchMove = (e: React.TouchEvent) => getPosition(e.touches[0].clientX);

    return (
        <section
            id="section-beforeafter"
            className="section-base"
        >
            <motion.div
                className="text-center mb-8 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Dulu vs Sekarang ✨
                </h2>
                <p className="text-pink-400 text-sm">Geser untuk membandingkan — sama cantiknya! 💕</p>
            </motion.div>

            <motion.div
                className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-dreamy cursor-ew-resize z-10 select-none"
                style={{ aspectRatio: "3/4" }}
                ref={containerRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchMove={onTouchMove}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* After image (background) */}
                <div className="absolute inset-0">
                    <Image
                        src={BEFORE_AFTER.after.photo}
                        alt="After"
                        fill
                        className="object-cover object-top"
                    />
                </div>

                {/* Before image (clipped) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    <Image
                        src={BEFORE_AFTER.before.photo}
                        alt="Before"
                        fill
                        className="object-cover object-top"
                    />
                </div>

                {/* Slider divider line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-20 pointer-events-none"
                    style={{ left: `${position}%` }}
                />

                {/* Handle */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center z-30 cursor-ew-resize"
                    style={{ left: `${position}%` }}
                >
                    <div className="flex gap-0.5">
                        <div className="w-0.5 h-4 bg-pink-400 rounded" />
                        <div className="w-0.5 h-4 bg-pink-400 rounded" />
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 z-20 bg-white/80 rounded-full px-3 py-1 text-xs text-pink-500 font-medium shadow">
                    {BEFORE_AFTER.before.label}
                </div>
                <div className="absolute top-3 right-3 z-20 bg-white/80 rounded-full px-3 py-1 text-xs text-purple-500 font-medium shadow">
                    {BEFORE_AFTER.after.label}
                </div>
            </motion.div>

            <motion.p
                className="font-script text-xl text-pink-400 text-center mt-6 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                Dulu cantik, sekarang makin cantik! 🌸
            </motion.p>
        </section>
    );
}
