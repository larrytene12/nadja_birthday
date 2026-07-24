"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BIRTHDAY_GIRL_NAME } from "@/lib/content";

interface ScrapbookPageProps {
    onClose: () => void;
}

export default function ScrapbookPage({ onClose }: ScrapbookPageProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto font-serif"
            initial={{ opacity: 0, y: "100vh", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: "100vh" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            style={{
                backgroundColor: "#fff0f5",
                // Pink checkerboard pattern
                backgroundImage: "conic-gradient(at 50% 50%, #fce7f3 25%, transparent 25%, transparent 50%, #fce7f3 50%, #fce7f3 75%, transparent 75%, transparent)",
                backgroundSize: "160px 160px"
            }}
        >
            {/* Background elements scattered */}
            <div className="absolute top-[10%] left-[5%] text-4xl select-none animate-bounce">🎈</div>
            <div className="absolute top-[20%] right-[10%] text-6xl select-none opacity-80" style={{ transform: 'rotate(15deg)' }}>💖</div>
            <div className="absolute top-[45%] left-[8%] text-5xl select-none opacity-80" style={{ transform: 'rotate(-10deg)' }}>🎁</div>
            <div className="absolute bottom-[20%] right-[15%] text-6xl select-none" style={{ transform: 'rotate(-25deg)' }}>🍰</div>
            <div className="absolute top-[60%] left-[15%] text-3xl select-none text-pink-300">✨</div>
            <div className="absolute top-[35%] right-[25%] text-3xl select-none text-pink-300">⭐</div>
            <div className="absolute bottom-[30%] left-[25%] text-4xl select-none">🌸</div>

            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[110] bg-white text-pink-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold text-xl hover:scale-110 transition-transform"
                style={{ boxShadow: "0 4px 14px rgba(236,72,153,0.3)" }}
            >
                ✕
            </button>

            <div className="max-w-3xl w-full mx-auto relative px-4 pt-16 pb-32">

                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="font-script text-5xl md:text-7xl text-pink-700" style={{ transform: 'rotate(-2deg)' }}>Happy birthday, my baby!</h1>
                </motion.div>

                {/* Photo Frame Container 1 */}
                <motion.div
                    className="relative w-full max-w-sm mx-auto mb-20"
                    initial={{ opacity: 0, rotate: 10, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: -4, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                    {/* Frame styling */}
                    <div className="bg-pink-800 p-2 rounded-xl shadow-2xl relative">
                        {/* Washi tape top left */}
                        <div className="absolute -top-4 -left-6 z-10 w-24 h-8" style={{
                            background: "repeating-linear-gradient(45deg, #fbcfe8, #fbcfe8 10px, transparent 10px, transparent 20px)",
                            backgroundColor: "rgba(255,255,255,0.8)",
                            transform: "rotate(-15deg)",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                        }}></div>

                        {/* Safety pin placeholder */}
                        <div className="absolute -top-10 right-4 z-10 text-6xl drop-shadow-md" style={{ transform: 'rotate(25deg)' }}>🧷</div>

                        {/* Inner photo area */}
                        <div className="bg-white p-3 rounded-lg border-2 border-dashed border-pink-300">
                            <div className="relative w-full h-80 bg-pink-100 rounded overflow-hidden">
                                <Image
                                    src="/photos/main-photo.jpg"
                                    alt="Scrapbook photo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 384px"
                                    priority
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                        (e.target as HTMLImageElement).parentElement!.style.background = "#fbcfe8";
                                    }}
                                />
                                {/* Overlay if photo fails */}
                                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">💕</div>
                            </div>
                        </div>
                    </div>

                    {/* Doodles near frame */}
                    <div className="absolute -bottom-8 -right-8 text-5xl transform rotate-12 drop-shadow-lg">✨</div>
                    <div className="absolute top-1/2 -left-16 text-4xl transform -rotate-12 drop-shadow-lg">🎀</div>
                </motion.div>

                {/* Note snippets */}
                <motion.div
                    className="flex justify-between items-center mb-16 px-4"
                >
                    <div className="bg-white/90 px-4 py-2 shadow-sm italic text-pink-700 text-lg transform rotate-3 inline-block font-serif">
                        make a wish.. ♥
                    </div>
                    <div className="bg-white/90 px-5 py-2 shadow-sm italic text-pink-700 text-lg transform -rotate-2 inline-block font-serif">
                        may your day be as special as you are!
                    </div>
                </motion.div>

                {/* Text Frame Container 2 */}
                <motion.div
                    className="relative w-full max-w-xl mx-auto"
                    initial={{ opacity: 0, rotate: -10, y: 50 }}
                    animate={{ opacity: 1, rotate: 2, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                >
                    {/* Frame styling */}
                    <div className="bg-pink-800 p-2 rounded-xl shadow-2xl relative">
                        {/* Washi tape top right */}
                        <div className="absolute -top-5 right-10 z-10 w-32 h-10" style={{
                            background: "repeating-linear-gradient(45deg, #f9a8d4, #f9a8d4 12px, transparent 12px, transparent 24px)",
                            backgroundColor: "rgba(255,255,255,0.7)",
                            transform: "rotate(10deg)",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                        }}></div>

                        {/* Safety pin placeholder */}
                        <div className="absolute -top-10 -left-6 z-10 text-6xl drop-shadow-md" style={{ transform: 'rotate(-25deg)' }}>🧷</div>

                        {/* Inner text area */}
                        <div className="bg-orange-50 p-6 md:p-10 rounded-lg border-2 border-dashed border-pink-400">
                            <h2 className="font-script text-4xl text-pink-700 mb-6">Happy birthday, baby!</h2>
                            <p className="text-pink-900 leading-relaxed font-serif text-lg text-justify" style={{ lineHeight: '1.8' }}>
                                I hope your day is filled with love, laughter, and all your favorite little things. You deserve every bit of happiness coming your way and more—today is all about celebrating you and how amazing you are. May this year bring you closer to your dreams, give you countless reasons to smile, and wrap you in the warmth of knowing how deeply you are loved.
                            </p>
                        </div>
                    </div>

                    {/* Doodles near text frame */}
                    <div className="absolute -bottom-6 -right-4 flex text-3xl drop-shadow">
                        <div>🎈</div><div>💖</div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
