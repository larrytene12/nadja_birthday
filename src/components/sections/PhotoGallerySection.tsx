"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import OrbitImages from "@/components/ui/OrbitImages";

export default function PhotoGallerySection() {
    // We will use 6 photos for the orbit
    const images = [
        "/photos/foto1.jpg",
        "/photos/foto2.jpg",
        "/photos/foto3.jpg",
        "/photos/foto4.jpg",
        "/photos/foto5.jpg",
        "/photos/foto6.jpg",
    ];

    return (
        <section
            id="section-gallery"
            className="py-20 px-4 relative overflow-hidden"
        >
            <motion.div
                className="text-center mb-16 z-10 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm">
                    Kenangan Kita 💕
                </h2>
                <p className="text-pink-400 text-sm">Berputar indah di ingatan</p>
            </motion.div>

            <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center p-8">
                <OrbitImages
                    images={images}
                    shape="circle"
                    radius={200}
                    baseWidth={600}
                    itemSize={90}
                    duration={30}
                    showPath={true}
                    pathColor="rgba(244, 114, 182, 0.4)" // Tailwind pink-400 with opacity
                    pathWidth={3}
                    responsive={true}
                    className="z-10"
                    centerContent={
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 shadow-xl flex items-center justify-center border-4 border-white/50 animate-pulse">
                            <span className="text-5xl drop-shadow-md">💗</span>
                        </div>
                    }
                />
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-20 blur-3xl w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 opacity-20 blur-3xl w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply pointer-events-none" />
        </section>
    );
}
