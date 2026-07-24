"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LETTER_PAGES, FLOWER_MEANINGS, FLOWER_TRAIT, WISH_TEXT } from "@/lib/content";
import { CheckCircle, Mail, Flower2, Cake } from "lucide-react";
import Image from "next/image";

const FLOWERS = ["/flowers/flower-1-clean.png", "/flowers/flower-2-clean.png"];

type MenuType = "message" | "flower" | "cake" | null;

export default function MenuSection() {
    const [opened, setOpened] = useState<Set<MenuType>>(new Set());
    const [activeModal, setActiveModal] = useState<MenuType>(null);
    const [letterPage, setLetterPage] = useState(0);
    const [petalCount, setPetalCount] = useState(0);
    const [candleLit, setCandleLit] = useState(false);
    const [wishMade, setWishMade] = useState(false);

    const allUnlocked = opened.size >= 3;

    const openCard = (type: MenuType) => {
        setActiveModal(type);
        if (type) {
            setOpened((prev) => new Set([...prev, type]));
        }
    };

    const closeModal = () => setActiveModal(null);

    const CARD_CONFIG = [
        {
            type: "message" as MenuType,
            emoji: "💌",
            label: "Message",
        },
        {
            type: "flower" as MenuType,
            emoji: "💐",
            label: "Flower",
        },
        {
            type: "cake" as MenuType,
            emoji: "🍰",
            label: "Cake",
        },
    ];

    return (
        <section
            id="section-menu"
            className="section-base min-h-screen relative flex flex-col items-center justify-center p-8 z-20"
            style={{ background: "linear-gradient(135deg, #a81c24 0%, #7b1017 100%)" }}
        >
            <div className="absolute top-20 right-10 opacity-10 select-none pointer-events-none" style={{ width: '60px', height: '60px' }}>
                <Image src={FLOWERS[0]} alt="decor" width={60} height={60} style={{ objectFit: 'contain' }} />
            </div>
            <div className="absolute bottom-20 left-10 opacity-10 select-none pointer-events-none" style={{ width: '60px', height: '60px' }}>
                <Image src={FLOWERS[1]} alt="decor" width={60} height={60} style={{ objectFit: 'contain' }} />
            </div>

            <motion.div
                className="text-center mb-16 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-script italic text-5xl md:text-7xl text-white mb-2 tracking-wide drop-shadow-md bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    These are for you
                </h2>
                <p className="text-red-200 text-sm italic font-serif-display mt-2 opacity-80">
                    {3 - opened.size > 0 ? `Please open ${3 - opened.size} more box${3 - opened.size > 1 ? 'es' : ''}` : "✅ You've checked everything!"}
                </p>

                {/* Progress indicators hidden to match the clean reference design, but preserved functionality */}
            </motion.div>

            {/* Icons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 max-w-4xl w-full px-4 z-10">
                {CARD_CONFIG.map((card, i) => (
                    <motion.div
                        key={card.type}
                        className="relative flex flex-col items-center gap-4 cursor-pointer group"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        whileHover={{ scale: 1.1, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openCard(card.type)}
                    >
                        <div className="relative">
                            <span className="text-[100px] filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:rotate-6 inline-block select-none pointer-events-none">
                                {card.emoji}
                            </span>

                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {opened.has(card.type) && (
                                <motion.div
                                    className="absolute -top-2 -right-2 bg-white rounded-full shadow-md"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <CheckCircle className="text-green-500 w-8 h-8" />
                                </motion.div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <h3 className="font-serif-display text-white text-lg tracking-wide shadow-sm">
                                {card.label}
                            </h3>
                            {/* Dot indicator matching reference */}
                            <div className="w-2 h-2 rounded-full bg-white opacity-80" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Unlock all */}
            <AnimatePresence>
                {allUnlocked && (
                    <motion.div
                        className="mt-16 text-center z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="font-script text-3xl text-white mb-2 drop-shadow-md">Everything is opened! ✨</p>
                        <p className="text-red-200 text-sm animate-bounce mt-4">Scroll down to continue ↓</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODALS */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className={`bg-white rounded-3xl shadow-2xl w-full max-h-[85vh] overflow-y-auto relative ${activeModal === "flower" ? "max-w-4xl" : "max-w-md"}`}
                            initial={{ scale: 0.8, opacity: 0, y: 60 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 60 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-pink-300 hover:text-pink-500 text-2xl font-light z-10"
                                aria-label="Close"
                            >
                                ×
                            </button>

                            {/* MESSAGE MODAL — Letter card design */}
                            {activeModal === "message" && (
                                <div
                                    className="relative overflow-hidden"
                                    style={{
                                        background: "linear-gradient(160deg, #fff5f8 0%, #fff0f5 100%)",
                                        borderRadius: "24px",
                                        minHeight: "420px",
                                    }}
                                >
                                    {/* Heart watermarks */}
                                    <div className="absolute top-32 left-4 text-pink-100 text-7xl select-none pointer-events-none" style={{ transform: 'rotate(-15deg)' }}>💕</div>
                                    <div className="absolute bottom-8 right-8 text-pink-100 text-6xl select-none pointer-events-none" style={{ transform: 'rotate(10deg)' }}>💌</div>

                                    {/* Top row: calendar + location */}
                                    <div className="flex items-start justify-between px-7 pt-6 pb-2">
                                        {/* Calendar widget */}
                                        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-md w-20" style={{ border: '2px solid #f9a8d4' }}>
                                            {/* Calendar header (month tab) */}
                                            <div className="bg-pink-400 text-white text-center py-1 text-xs font-bold tracking-widest uppercase">
                                                July
                                            </div>
                                            {/* Calendar date */}
                                            <div
                                                className="bg-white text-center py-2"
                                                style={{
                                                    fontFamily: '"Times New Roman", Times, serif',
                                                    fontSize: '2.8rem',
                                                    fontWeight: 800,
                                                    lineHeight: 1,
                                                    color: '#be185d',
                                                }}
                                            >
                                                24
                                            </div>
                                        </div>

                                        {/* Location + title */}
                                        <div className="text-right ml-4 pt-1">
                                            <p className="text-pink-300 text-xs font-medium tracking-wide">24 July 2026</p>
                                            <h3 className="font-script text-2xl text-pink-500 mt-1">Pesan Untukmu 💌</h3>
                                        </div>
                                    </div>

                                    {/* Divider line */}
                                    <div className="mx-7 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-4" />

                                    {/* Letter body */}
                                    <div className="px-7 pb-2" style={{ minHeight: '200px' }}>
                                        {/* Lined paper effect */}
                                        <div className="relative">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={letterPage}
                                                    initial={{ opacity: 0, x: 40 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -40 }}
                                                    transition={{ duration: 0.35 }}
                                                >
                                                    <p
                                                        className="leading-8 whitespace-pre-line"
                                                        style={{
                                                            fontFamily: '"Georgia", serif',
                                                            fontSize: '0.95rem',
                                                            color: '#9d174d',
                                                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #fce7f3 31px, #fce7f3 32px)',
                                                            backgroundSize: '100% 32px',
                                                            lineHeight: '32px',
                                                        }}
                                                    >
                                                        {LETTER_PAGES[letterPage].text}
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between items-center px-7 py-4">
                                        <button
                                            onClick={() => setLetterPage((p) => Math.max(0, p - 1))}
                                            disabled={letterPage === 0}
                                            className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30 transition-all"
                                            style={{ background: '#fce7f3', color: '#be185d' }}
                                        >
                                            ← Sebelumnya
                                        </button>
                                        <span className="text-xs font-semibold text-pink-300">
                                            {letterPage + 1} / {LETTER_PAGES.length}
                                        </span>
                                        <button
                                            onClick={() => setLetterPage((p) => Math.min(LETTER_PAGES.length - 1, p + 1))}
                                            disabled={letterPage === LETTER_PAGES.length - 1}
                                            className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30 transition-all"
                                            style={{ background: '#f472b6', color: 'white' }}
                                        >
                                            Berikutnya →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* FLOWER MODAL — Petal assembly */}
                            {activeModal === "flower" && (
                                <div className="p-8">
                                    <div className="text-center mb-6">
                                        <div className="text-5xl mb-2">🌺</div>
                                        <h3 className="font-script text-3xl text-purple-500">Bunga Untukmu</h3>
                                        <div className="w-full h-px bg-purple-100 mt-3" />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        {/* Left Side: Image */}
                                        <div className="w-full md:w-1/3 flex justify-center sticky top-8">
                                            <div className="relative w-64 h-64 md:w-full md:h-80 drop-shadow-lg rounded-2xl overflow-hidden bg-purple-50 flex items-center justify-center p-4">
                                                <Image
                                                    src="/flowers/flower.png"
                                                    alt="Bunga untuk Nadja"
                                                    fill
                                                    className="object-contain p-4"
                                                    onError={(e) => {
                                                        // if the image doesn't exist, show a placeholder
                                                        (e.target as HTMLImageElement).src = FLOWERS[0];
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Right Side: Meanings */}
                                        <div className="w-full md:w-2/3">
                                            <p className="text-purple-400 font-script text-2xl mb-4">Arti Bunga Untukmu ✨</p>
                                            <div className="space-y-4">
                                                {FLOWER_MEANINGS.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 text-left shadow-sm"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.15 }}
                                                    >
                                                        <span className="font-bold text-purple-700 text-base block mb-1 drop-shadow-sm">{item.flower}</span>
                                                        <p className="text-gray-600 text-sm leading-relaxed">{item.meaning}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <motion.div
                                                className="mt-6 font-serif-display text-pink-700 text-base leading-relaxed bg-pink-50 p-5 rounded-2xl shadow-sm border border-pink-100"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                {FLOWER_TRAIT.split(':').map((part, index) => (
                                                    <span key={index}>
                                                        {index === 0 ? <strong className="block mb-2 font-script text-2xl drop-shadow-sm">{part}:</strong> : part}
                                                    </span>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CAKE MODAL — Polaroid */}
                            {activeModal === "cake" && (
                                <div className="p-8 pb-12 flex flex-col items-center overflow-hidden">
                                    <h3 className="font-script text-4xl text-pink-600 mb-10 text-center">Happy birthday, my baby!</h3>

                                    <motion.div
                                        className="relative w-full max-w-[280px] md:max-w-sm mx-auto"
                                        initial={{ scale: 0.5, opacity: 0, rotate: -15, y: 50 }}
                                        animate={{ scale: 1, opacity: 1, rotate: -2, y: 0 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                    >
                                        <div className="bg-pink-50 p-3 md:p-4 pb-12 md:pb-16 rounded-xl shadow-2xl border-4 border-white relative w-full">
                                            {/* Washi Tape */}
                                            <div className="absolute -top-5 -left-5 z-30 w-24 h-8" style={{
                                                background: "repeating-linear-gradient(-45deg, #f9a8d4, #f9a8d4 10px, transparent 10px, transparent 20px)",
                                                backgroundColor: "rgba(255,255,255,0.7)",
                                                transform: "rotate(-12deg)",
                                                boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
                                            }}></div>

                                            {/* Safety Pin */}
                                            <div className="absolute -top-6 right-4 z-30 text-5xl drop-shadow-md" style={{ transform: 'rotate(25deg)' }}>🧷</div>

                                            {/* Photo Wrapper */}
                                            <div className="relative w-full aspect-[4/5] bg-pink-100 rounded-lg overflow-hidden border border-pink-200">
                                                <Image
                                                    src="/photos/main-photo.jpg"
                                                    alt="Nadja"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 384px"
                                                />
                                            </div>

                                            {/* Sticky Note Banner */}
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] bg-[#fff7d6] px-2 py-2 border border-yellow-200 shadow-md" style={{ transform: 'rotate(3deg)' }}>
                                                <p className="font-script text-pink-700 text-lg md:text-xl text-center">may your day be as special as you are!</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="mt-14 mb-4 text-pink-400 font-serif italic text-lg drop-shadow-sm">
                                        make a wish.. ♥
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
