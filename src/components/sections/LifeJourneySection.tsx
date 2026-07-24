"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { LIFE_JOURNEY } from "@/lib/content";

export default function LifeJourneySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            id="section-journey"
            className="py-20 px-4 relative overflow-hidden"
            ref={containerRef}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl opacity-10 select-none">
                🌱
            </div>

            <motion.div
                className="text-center mb-16 z-10 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Perjalanan Hidupmu 🌟
                </h2>
                <p className="text-pink-400 text-sm">Dari dulu sampai sekarang yang luar biasa</p>
            </motion.div>

            <div className="relative max-w-lg mx-auto">
                {/* Growing timeline line */}
                <motion.div
                    className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300 rounded-full origin-top"
                    style={{
                        height: "100%",
                        scaleY: scrollYProgress,
                    }}
                />

                <div className="space-y-16">
                    {LIFE_JOURNEY.map((phase, i) => (
                        <motion.div
                            key={i}
                            className={`flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-6 relative`}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Content card */}
                            <div className="flex-1">
                                <div className="glass-card rounded-3xl p-5 shadow-pink">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-2xl">{phase.emoji}</span>
                                        <span className="text-xs font-medium text-pink-400 bg-pink-50 px-2 py-0.5 rounded-full">
                                            {phase.year}
                                        </span>
                                    </div>
                                    <h3 className="font-serif-display font-semibold text-gray-700 mb-2">
                                        {phase.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {phase.description}
                                    </p>
                                    {/* Photo placeholder note */}
                                    <div className="mt-4 w-full aspect-[3/4] md:aspect-square rounded-xl overflow-hidden relative shadow-sm border border-pink-100">
                                        <Image src={phase.photo} alt={phase.title} fill className="object-cover object-[center_15%]" sizes="(max-width: 768px) 100vw, 500px" />
                                    </div>
                                </div>
                            </div>

                            {/* Center node */}
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-xl shadow-lg flex-shrink-0 z-10"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
                            >
                                {phase.emoji}
                            </motion.div>

                            {/* Empty spacer for alternating layout */}
                            <div className="flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
