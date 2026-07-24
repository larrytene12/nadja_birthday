"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useState } from "react";

export default function MusicPlayer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const { isPlaying, pauseMusic, resumeMusic } = useMusic();

    const togglePlay = () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            resumeMusic();
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <motion.div
                className="flex items-center gap-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
            >
                {/* Vinyl disc */}
                <motion.button
                    onClick={() => { setIsExpanded(!isExpanded); }}
                    className="relative w-14 h-14 rounded-full glass-card shadow-pink flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle music player"
                >
                    {/* Vinyl graphic */}
                    <motion.div
                        className="w-12 h-12 rounded-full"
                        style={{
                            background: "radial-gradient(circle at 50% 50%, #1a1a2e 30%, #4a1942 50%, #1a1a2e 70%, #ec4899 85%, #1a1a2e 100%)",
                        }}
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-pink-200 z-10" />
                        </div>
                    </motion.div>
                    {/* Music note icon overlay */}
                    <Music className="absolute text-pink-300 opacity-80" size={14} />
                </motion.button>

                {/* Controls panel */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="glass-card rounded-2xl px-4 py-2 flex items-center gap-3"
                            initial={{ x: -20, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: -20, opacity: 0, scale: 0.8 }}
                        >
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 bg-pink-400 hover:bg-pink-500 rounded-full flex items-center justify-center text-white transition-colors"
                                aria-label={isPlaying ? "Pause music" : "Play music"}
                            >
                                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                            </button>
                            <span className="text-xs text-pink-400 font-medium whitespace-nowrap">
                                🎵 {isPlaying ? "Sedang Putar..." : "Paused"}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
