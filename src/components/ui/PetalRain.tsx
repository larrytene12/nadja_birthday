"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

interface Petal {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    image: string;
    opacity: number;
    rotation: number;
}

const FLOWERS = ["/flowers/flower-1-clean.png", "/flowers/flower-2-clean.png"];

export default function PetalRain({ count = 20 }: { count?: number }) {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 30 + 30, // 30-60px
            duration: Math.random() * 6 + 6,
            delay: Math.random() * 8,
            image: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
            opacity: Math.random() * 0.2 + 0.6, // 0.6-0.8
            rotation: Math.random() * 360,
        }));
        setPetals(generated);
    }, [count]);

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute select-none"
                    style={{
                        left: `${petal.x}%`,
                        top: "-20px",
                        width: `${petal.size}px`,
                        height: `${petal.size}px`,
                        opacity: petal.opacity,
                        animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
                        willChange: "transform, opacity",
                        filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.08))",
                    }}
                >
                    <Image
                        src={petal.image}
                        alt="flower"
                        fill
                        sizes={`${Math.ceil(petal.size)}px`}
                        style={{ objectFit: 'contain', transform: `rotate(${petal.rotation}deg)`, mixBlendMode: 'multiply' }}

                    />
                </div>
            ))}
        </div>
    );
}
