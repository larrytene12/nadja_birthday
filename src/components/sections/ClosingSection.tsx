"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CLOSING_MESSAGE, BIRTHDAY_GIRL_NAME } from "@/lib/content";
import { MessageCircle, Heart } from "lucide-react";
import MusicPlayer from "@/components/ui/MusicPlayer";
import Image from "next/image";

const FLOWERS = ["/flowers/flower-1-clean.png", "/flowers/flower-2-clean.png"];

function useTypewriter(text: string, speed = 25, start = false) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!start) return;
        setDisplayed("");
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                setDone(true);
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, start]);

    return { displayed, done };
}

export default function ClosingSection() {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setVisible(true);
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const { displayed, done } = useTypewriter(CLOSING_MESSAGE, 22, visible);

    return (
        <section
            id="section-closing"
            className="section-base py-20 relative"
        >
            {/* Decorative floating flowers — real images */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none select-none"
                    style={{
                        left: `${[10, 85, 20, 75, 50][i]}%`,
                        top: `${[15, 25, 80, 75, 10][i]}%`,
                        width: `${[50, 45, 55, 40, 48][i]}px`,
                        height: `${[50, 45, 55, 40, 48][i]}px`,
                        opacity: 0.2,
                        filter: "drop-shadow(1px 2px 4px rgba(0,0,0,0.1))",
                    }}
                    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                    <Image
                        src={FLOWERS[i % 2]}
                        alt="decor"
                        width={55}
                        height={55}
                        style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                </motion.div>
            ))}

            <motion.div
                className="text-center mb-8 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-5xl md:text-6xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Untuk {BIRTHDAY_GIRL_NAME} 💗
                </h2>
                <p className="text-pink-400 text-sm">Dari hati yang paling tulus</p>
            </motion.div>

            {/* Typewriter letter */}
            <motion.div
                ref={ref}
                className="z-10 max-w-sm mx-auto px-4 w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div
                    className="glass-card rounded-3xl p-6 shadow-dreamy relative"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(252,231,243,0.8))",
                    }}
                >
                    {/* Letter decoration */}
                    <div className="text-3xl text-center mb-4">💌</div>

                    <pre
                        className="font-serif-display text-gray-600 text-sm leading-relaxed whitespace-pre-wrap"
                    >
                        {displayed}
                        {!done && (
                            <span className="cursor-blink text-pink-400 font-bold">|</span>
                        )}
                    </pre>

                    {/* Seal decoration at bottom — flower image */}
                    {done && (
                        <motion.div
                            className="flex justify-center mt-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Image
                                src={FLOWERS[0]}
                                alt="flower seal"
                                width={36}
                                height={36}
                                style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                            />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Reply button */}
            {done && (
                <motion.div
                    className="z-10 text-center mt-10 flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="font-script text-2xl text-pink-400">
                        Selamat ulang tahun, Nadja! 🎂
                    </p>

                    <motion.a
                        href="https://wa.me/?text=Terima kasih kado digitalnya!! 💕✨"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium shadow-lg"
                        style={{ border: 'none', outline: 'none' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle size={20} />
                        Balas Pesan Ini 💕
                    </motion.a>

                    {/* Floating flowers instead of emoji hearts */}
                    <div className="flex gap-3 mt-4">
                        {[...Array(7)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.1))",
                                }}
                                animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                            >
                                {[0, 2, 4, 6].includes(i) ? (
                                    <Image
                                        src={FLOWERS[i % 2]}
                                        alt="flower"
                                        width={22}
                                        height={22}
                                        style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                                    />
                                ) : (
                                    <span className="text-xl">{["", "💕", "", "✨", "", "💖", ""][i]}</span>
                                )}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Music player */}
            <MusicPlayer />
        </section>
    );
}
