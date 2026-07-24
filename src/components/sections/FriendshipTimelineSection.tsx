"use client";


import Iridescence from "@/components/ui/Iridescence";
import { motion } from "framer-motion";
import Image from "next/image";
import { FRIENDSHIP_TIMELINE } from "@/lib/content";

export default function FriendshipTimelineSection() {
    return (
        <section
            id="section-friendship"
            className="py-20 px-4 relative overflow-hidden"
        >
            <div className="absolute right-4 top-20 text-6xl opacity-10 select-none">💕</div>

            <motion.div
                className="text-center mb-16 z-10 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Kisah Kita Berdua 🌸
                </h2>
                <p className="text-pink-400 text-sm">Momen-momen yang selalu kuingat bersamamu</p>
            </motion.div>

            <div className="relative max-w-lg mx-auto space-y-12">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-200 via-pink-300 to-pink-200 -translate-x-1/2" />

                {FRIENDSHIP_TIMELINE.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`flex ${item.side === "left" ? "flex-row" : "flex-row-reverse"} items-center gap-4 relative`}
                        initial={{ opacity: 0, x: item.side === "left" ? -60 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                        {/* Card */}
                        <div className="flex-1 z-10">
                            <div className="glass-card rounded-3xl p-4 shadow-pink hover:shadow-dreamy transition-shadow duration-300">
                                {/* Photo placeholder */}
                                <div className="h-32 rounded-2xl mb-3 overflow-hidden relative">
                                    <Image
                                        src={item.photo}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 flex items-center justify-center text-4xl"
                                        style={{
                                            background: `linear-gradient(135deg, hsl(${330 + i * 15}, 70%, 85%), hsl(${270 + i * 12}, 60%, 87%))`,
                                        }}
                                    >
                                        {item.emoji}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-pink-400 font-medium bg-pink-50 px-2 py-0.5 rounded-full">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className="font-serif-display font-semibold text-gray-700 mb-1 text-sm">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                            </div>
                        </div>

                        {/* Timeline node */}
                        <motion.div
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center flex-shrink-0 z-10 shadow-md"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 400, delay: 0.15 }}
                        >
                            <span className="text-sm">{item.emoji}</span>
                        </motion.div>

                        {/* Empty side */}
                        <div className="flex-1" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
