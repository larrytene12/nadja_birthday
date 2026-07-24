"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TRAITS } from "@/lib/content";

function StarRating({ count, active }: { count: number; active: boolean }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <motion.span
                    key={i}
                    className="text-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={active ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                        delay: active ? i * 0.12 : 0,
                        type: "spring",
                        stiffness: 400,
                    }}
                    style={{ filter: i < count ? "none" : "grayscale(100%)", opacity: i < count ? 1 : 0.25 }}
                >
                    ⭐
                </motion.span>
            ))}
        </div>
    );
}

export default function StarRatingSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="section-stars"
            className="section-base"
        >
            <motion.div
                className="text-center mb-10 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Rating Sifat Baikmu ⭐
                </h2>
                <p className="text-pink-400 text-sm">Semua nilaimu sempurna di mataku!</p>
            </motion.div>

            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto px-4 z-10 w-full">
                {TRAITS.map((trait, i) => (
                    <motion.div
                        key={i}
                        className="glass-card rounded-3xl p-4 shadow-pink flex items-center gap-4"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                            {trait.emoji}
                        </div>
                        <div>
                            <p className="font-medium text-gray-700 text-sm mb-1">{trait.trait}</p>
                            <StarRating count={trait.stars} active={isInView} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p
                className="font-script text-2xl text-pink-400 text-center mt-8 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
            >
                Rating tertinggi untukmu! 💖
            </motion.p>
        </section>
    );
}
