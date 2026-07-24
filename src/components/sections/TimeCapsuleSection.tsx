"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TIME_CAPSULE_LETTERS } from "@/lib/content";
import { Lock, Unlock, Clock } from "lucide-react";

function getCountdown(openDate: string) {
    const target = new Date(openDate).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
}

export default function TimeCapsuleSection() {
    const [openedLetters, setOpenedLetters] = useState<Set<number>>(new Set());
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(interval);
    }, []);

    const toggleLetter = (id: number, isUnlocked: boolean) => {
        if (!isUnlocked) return;
        setOpenedLetters((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <section
            id="section-capsule"
            className="section-base"
        >
            <motion.div
                className="text-center mb-10 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-purple-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Time Capsule 🕰️
                </h2>
                <p className="text-purple-400 text-sm">Pesan-pesan yang menunggu untuk dibuka</p>
            </motion.div>

            <div className="space-y-5 max-w-sm mx-auto px-4 z-10 w-full">
                {TIME_CAPSULE_LETTERS.map((letter, i) => {
                    const countdown = getCountdown(letter.openDate);
                    const isUnlocked = countdown === null;
                    const isOpened = openedLetters.has(letter.id);

                    return (
                        <motion.div
                            key={letter.id}
                            className="w-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <motion.div
                                className={`glass-card rounded-3xl shadow-pink overflow-hidden cursor-pointer ${!isUnlocked ? "opacity-75" : ""
                                    }`}
                                whileHover={isUnlocked ? { scale: 1.02 } : { scale: 1 }}
                                onClick={() => toggleLetter(letter.id, isUnlocked)}
                            >
                                <div className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            {isUnlocked ? (
                                                <Unlock size={24} className="text-green-400" />
                                            ) : (
                                                <Lock size={24} className="text-purple-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-serif-display font-semibold text-gray-700 text-sm mb-1 pr-2">
                                                {letter.title}
                                            </h3>
                                            {isUnlocked ? (
                                                <p className="text-xs text-green-500 mb-2">✅ Siap untuk dibuka!</p>
                                            ) : (
                                                <div className="flex items-center gap-1 text-xs text-purple-400 mb-2">
                                                    <Clock size={12} />
                                                    <span>Buka pada {new Date(letter.openDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                                                </div>
                                            )}
                                            <p className="text-gray-400 text-xs italic">{letter.preview}</p>

                                            {/* Countdown chips */}
                                            {!isUnlocked && countdown && (
                                                <div className="flex gap-2 mt-3">
                                                    {[
                                                        { val: countdown.days, label: "hari" },
                                                        { val: countdown.hours, label: "jam" },
                                                        { val: countdown.minutes, label: "menit" },
                                                    ].map((unit) => (
                                                        <div
                                                            key={unit.label}
                                                            className="bg-purple-50 rounded-xl px-2 py-1 text-center"
                                                        >
                                                            <div className="font-bold text-purple-500 text-sm">{unit.val}</div>
                                                            <div className="text-purple-300 text-xs">{unit.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Content reveal */}
                                            <AnimatePresence>
                                                {isOpened && isUnlocked && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 pt-4 border-t border-pink-100">
                                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                                {letter.content}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
