"use client";

import Iridescence from "@/components/ui/Iridescence";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, Unlock, Play } from "lucide-react";
import { useMusic } from "@/context/MusicContext";


export default function VideoRevealSection() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const { pauseMusic, resumeMusic } = useMusic();

    const handleUnlock = () => {
        if (pin === "060724") {
            setIsUnlocked(true);
            setShowPin(false);
            setPin("");
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <section
            id="section-video"
            className="section-base overflow-hidden relative"
        >
            <div className="absolute top-10 left-10 text-5xl opacity-10 select-none">🔐</div>
            <div className="absolute bottom-10 right-10 text-5xl opacity-10 select-none">💌</div>

            <motion.div
                className="text-center mb-12 z-10 relative flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-5xl md:text-6xl text-purple-600 font-bold bg-white/90 backdrop-blur-md px-8 py-3 rounded-[2rem] inline-block shadow-lg border-2 border-purple-200">
                    Pesan Rahasia 🔮
                </h2>
                <p className="text-purple-500 font-medium text-base md:text-lg bg-white/70 px-4 py-1 rounded-full inline-block backdrop-blur-sm shadow-sm">
                    Ada pesan yang tersembunyi untukmu...
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!isUnlocked ? (
                    <motion.div
                        key="locked"
                        className="z-10 flex flex-col items-center gap-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        {showPin ? (
                            <motion.div
                                className="relative w-80 p-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-[2rem] flex flex-col items-center justify-center gap-6 shadow-2xl border-4 border-white/40"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring" }}
                            >
                                <p className="text-white font-bold text-xl drop-shadow-sm">Masukkan PIN Rahasia</p>
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    maxLength={6}
                                    className="w-full text-center text-3xl font-bold rounded-2xl py-3 text-purple-700 focus:outline-none focus:ring-4 focus:ring-white/50 bg-white"
                                    placeholder="******"
                                    autoFocus
                                />
                                <div className="h-6 -my-2 flex items-center justify-center">
                                    {error ? (
                                        <motion.p
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-red-100 bg-red-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-inner"
                                        >
                                            PIN Salah! Coba lagi.
                                        </motion.p>
                                    ) : null}
                                </div>
                                <div className="flex gap-3 w-full mt-2">
                                    <button
                                        onClick={() => {
                                            setShowPin(false);
                                            setPin("");
                                        }}
                                        className="flex-1 bg-black/20 text-white py-3 rounded-xl text-base font-semibold hover:bg-black/30 transition-colors"
                                    >Batal</button>
                                    <button
                                        onClick={handleUnlock}
                                        className="flex-1 bg-white text-purple-600 py-3 rounded-xl text-base font-bold hover:bg-pink-50 transition-colors shadow-md"
                                    >Buka 🔓</button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="relative w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-[2.5rem] flex flex-col items-center justify-center gap-5 cursor-pointer shadow-2xl border-4 border-white/40"
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(192,132,252,0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowPin(true)}
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <Lock size={72} className="text-white drop-shadow-md" />
                                </motion.div>
                                <p className="text-white text-lg font-bold text-center px-6 leading-relaxed drop-shadow-sm">
                                    Tap untuk buka pesan rahasia 🌟
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="unlocked"
                        className="z-10 w-full max-w-lg px-4 flex flex-col items-center gap-6"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <motion.div
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="bg-white p-4 rounded-full shadow-lg"
                        >
                            <Unlock size={48} className="text-green-500" />
                        </motion.div>

                        <p className="font-script text-4xl text-purple-600 font-bold text-center mb-2 bg-white/70 px-6 py-2 rounded-full inline-block backdrop-blur-md shadow-sm">
                            Terbuka! ✨
                        </p>

                        {/* Video */}
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-white max-w-[360px] md:max-w-lg mx-auto flex flex-col items-center justify-center relative aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/QeQiR3At0S8"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>

                        <p className="font-script text-2xl text-pink-500 font-bold text-center px-4 mt-2">
                            &quot;Untuk kamu yang selalu ada...&quot; 💗
                        </p>

                        {/* Friendship Photo */}
                        <motion.div
                            className="w-full max-w-lg mx-auto mt-6 relative"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.7 }}
                        >
                            {/* Luxury gradient frame */}
                            <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-pink-300 via-fuchsia-300 to-purple-400 shadow-2xl">
                                <div className="relative p-1 rounded-[1.8rem] bg-gradient-to-br from-white/60 to-pink-100/60 backdrop-blur-sm">
                                    <div className="relative w-full overflow-hidden rounded-[1.6rem]">
                                        <Image
                                            src="/photos/eyiincesibet.jpg"
                                            alt="Eyi, Nadja & Ibet"
                                            width={600}
                                            height={450}
                                            className="w-full h-auto object-cover"
                                        />
                                        {/* Pink shimmer overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-fuchsia-300/10 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Caption badge */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2.5 rounded-full shadow-xl text-sm font-bold tracking-wide whitespace-nowrap border-2 border-white/40">
                                ✨ Eyi · Nadja · Ibet ✨
                            </div>
                        </motion.div>

                        {/* Friendship caption */}
                        <motion.p
                            className="font-script text-2xl text-center mt-10 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-bold drop-shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            Tiga hati, satu persahabatan 💗
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-30 blur-3xl w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 opacity-30 blur-3xl w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply pointer-events-none" />
        </section>
    );
}
