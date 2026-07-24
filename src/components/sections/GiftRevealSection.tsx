"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BIRTHDAY_GIRL_NAME, GIFT_REVEAL_SUBTITLE } from "@/lib/content";
import Image from "next/image";
import Lightfall from "@/components/ui/Lightfall";
import { useMusic } from "@/context/MusicContext";

interface GiftRevealSectionProps {
    onRevealed?: () => void;
}

interface Particle {
    id: number;
    destX: number;
    destY: number;
    image: string;
    rotation: number;
    size: number; // explicit pixel size 40-140
    delay: number;
    duration: number;
}

const FLOWERS = ["/flowers/flower-1-clean.png", "/flowers/flower-2-clean.png"];

const playMagicSound = () => {
    if (typeof window === "undefined") return;
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        for (let i = 0; i < 15; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            const freq = 400 + Math.random() * 2000;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + i * 0.08 + 0.3);
            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.08 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 1.2);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 1.2);
        }
    } catch (e) { }
};

export default function GiftRevealSection({ onRevealed }: GiftRevealSectionProps) {
    const [phase, setPhase] = useState<"idle" | "opening" | "exploded" | "revealed">("idle");
    const [particles, setParticles] = useState<Particle[]>([]);
    const { startMusic } = useMusic();

    const handleTap = () => {
        if (phase !== "idle") return;
        setPhase("opening");
        playMagicSound();
        startMusic();

        const newParticles = Array.from({ length: 50 }, (_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 300 + Math.random() * (typeof window !== "undefined" && window.innerWidth > 768 ? 900 : 500);
            return {
                id: i,
                destX: Math.cos(angle) * distance,
                destY: Math.sin(angle) * distance,
                image: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
                rotation: Math.random() * 360,
                size: 40 + Math.random() * 100, // 40-140px
                delay: Math.random() * 0.3,
                duration: 3.5 + Math.random() * 1.5,
            };
        });

        setTimeout(() => {
            setParticles(newParticles);
            setPhase("exploded");
            setTimeout(() => {
                setPhase("revealed");
                onRevealed?.();
            }, 5500);
        }, 800);
    };

    return (
        <section
            id="section-gift"
            className="section-base min-h-screen relative flex flex-col items-center justify-center"
        >
            {/* Lightfall animated background — exclusive to this section */}
            <div className="absolute inset-0 z-0">
                <Lightfall
                    colors={['#ff80b5', '#ff4da6', '#d946ef', '#fb7185', '#f472b6', '#fba4c0']}
                    backgroundColor="#fff0f6"
                    speed={0.4}
                    density={0.5}
                    streakCount={6}
                    streakWidth={1.5}
                    streakLength={1.2}
                    glow={1.2}
                    twinkle={1.2}
                    backgroundGlow={0.05}
                    zoom={4.5}
                />
            </div>
            {/* Decorative bg circles */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-pink-100 rounded-full opacity-50 blur-3xl z-[1]" />
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-100 rounded-full opacity-40 blur-3xl z-[1]" />

            {/* Particle explosion container */}
            <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
                <AnimatePresence>
                    {phase === "exploded" && (
                        <motion.div
                            className="absolute inset-0 bg-white z-40"
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    )}
                    {phase === "exploded" && particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute z-50 will-change-transform select-none"
                            style={{
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.18))",
                            }}
                            initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
                            animate={{
                                scale: [0, 1, 0.9],
                                x: [0, p.destX],
                                y: [0, p.destY - 80, p.destY + 120],
                                opacity: [1, 1, 1, 0],
                                rotate: [0, p.rotation * 2, p.rotation * 4],
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                times: [0, 0.4, 1],
                                ease: ["easeOut", "easeInOut"]
                            }}
                        >
                            <Image
                                src={p.image}
                                alt="flower"
                                width={Math.round(p.size)}
                                height={Math.round(p.size)}
                                style={{ objectFit: 'contain', width: '100%', height: '100%', mixBlendMode: 'multiply' }}

                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
                {phase !== "revealed" ? (
                    <motion.div
                        key="gift"
                        className="flex flex-col items-center gap-6 z-10"
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <motion.p
                            className="font-script text-pink-400 text-2xl text-center px-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Tap untuk buka hadiahmu! 🎁
                        </motion.p>

                        {/* Gift Box */}
                        <motion.div
                            className="cursor-pointer select-none"
                            initial={{ scale: 0, y: 60 }}
                            animate={{
                                scale: phase === "opening" ? [1, 1.2, 0.9, 1.1, 1] : [1, 1.04, 1],
                                y: phase === "opening" ? [0, -20, 0] : 0,
                                rotate: phase === "opening" ? [0, -5, 5, -3, 0] : 0,
                            }}
                            transition={{
                                scale: phase === "idle" ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 },
                                rotate: { duration: 0.4 },
                                y: { duration: 0.4 },
                            }}
                            onClick={handleTap}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                        >
                            <div className="text-[120px] leading-none drop-shadow-2xl select-none">
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Box base */}
                                    <rect x="10" y="55" width="100" height="58" rx="6" fill="#f472b6" />
                                    <rect x="10" y="55" width="100" height="58" rx="6" fill="url(#boxGrad)" />
                                    {/* Lid */}
                                    <rect x="5" y="40" width="110" height="22" rx="5" fill="#ec4899" />
                                    <rect x="5" y="40" width="110" height="22" rx="5" fill="url(#lidGrad)" />
                                    {/* Ribbon vertical */}
                                    <rect x="50" y="40" width="20" height="73" fill="#be185d" />
                                    {/* Ribbon horizontal */}
                                    <rect x="5" y="46" width="110" height="10" fill="#be185d" />
                                    {/* Bow left loop */}
                                    <ellipse cx="42" cy="30" rx="18" ry="12" fill="#ec4899" transform="rotate(-20 42 30)" />
                                    <ellipse cx="42" cy="30" rx="12" ry="7" fill="#f9a8d4" transform="rotate(-20 42 30)" />
                                    {/* Bow right loop */}
                                    <ellipse cx="78" cy="30" rx="18" ry="12" fill="#ec4899" transform="rotate(20 78 30)" />
                                    <ellipse cx="78" cy="30" rx="12" ry="7" fill="#f9a8d4" transform="rotate(20 78 30)" />
                                    {/* Bow center */}
                                    <ellipse cx="60" cy="38" rx="10" ry="8" fill="#be185d" />
                                    <ellipse cx="60" cy="38" rx="6" ry="5" fill="#f472b6" />
                                    {/* Shine */}
                                    <ellipse cx="85" cy="68" rx="8" ry="5" fill="white" opacity="0.2" transform="rotate(-20 85 68)" />
                                    <defs>
                                        <linearGradient id="boxGrad" x1="10" y1="55" x2="110" y2="113" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#fce7f3" />
                                            <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient id="lidGrad" x1="5" y1="40" x2="115" y2="62" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#fbcfe8" />
                                            <stop offset="1" stopColor="#db2777" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </motion.div>

                        <motion.p
                            className="text-pink-300 text-sm font-medium"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {phase === "idle" ? "✨ Tap kotak hadiahnya ✨" : "💕 Membuka..."}
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="revealed"
                        className="flex flex-col items-center gap-4 z-10 px-6 text-center"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Sparkle ring with flower images */}
                        <div className="relative">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        transformOrigin: "0 0",
                                        width: "24px",
                                        height: "24px",
                                        filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.12))",
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                        x: Math.cos((i / 8) * Math.PI * 2) * 60 - 12,
                                        y: Math.sin((i / 8) * Math.PI * 2) * 60 - 12,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.2, 0],
                                    }}
                                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                                >
                                    <Image
                                        src={FLOWERS[i % 2]}
                                        alt="flower"
                                        width={24}
                                        height={24}
                                        style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}

                                    />
                                </motion.div>
                            ))}
                            <motion.h1
                                className="relative z-10 tracking-widest text-center px-4"
                                style={{
                                    fontFamily: '"Times New Roman", Times, serif',
                                    fontSize: '3rem', // Ukuran besar untuk nama full
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    lineHeight: '1.2',
                                    color: '#c0162a',
                                    textShadow: '0 2px 16px rgba(192,22,42,0.4)',
                                    marginBottom: '10px'
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                            >
                                NADJA ANJANI ROMBE
                            </motion.h1>
                        </div>

                        <motion.p
                            className="font-script text-3xl md:text-4xl"
                            style={{ color: '#c0162a', textShadow: '0 2px 12px rgba(192,22,42,0.25)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Happy Birthday! 🎂✨
                        </motion.p>



                        <motion.p
                            className="text-lg md:text-xl max-w-xs font-medium"
                            style={{ color: '#c0162a' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {GIFT_REVEAL_SUBTITLE}
                        </motion.p>

                        <motion.p
                            className="text-base mt-2 font-medium"
                            style={{ color: '#e8184d' }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Scroll ke bawah untuk mulai perjalanan istimewamu ↓
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
