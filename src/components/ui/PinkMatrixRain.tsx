"use client";

import { useEffect, useRef } from "react";

export default function PinkMatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions to window size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Replace standard charset with NADJABIRTHDAY
        const charset = "NADJABIRTHDAY";
        const fontSize = 18; // Make it slightly larger for better readability
        const columns = Math.max(Math.floor(canvas.width / fontSize), 1);

        // Initial drops can start way off screen to stagger them
        const drops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

        const draw = () => {
            // Fade out previous frames with a light soft pink background
            ctx.fillStyle = "rgba(253, 242, 248, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Spell NADJABIRTHDAY vertically based on the drop's Y-coordinate
                let charIndex = Math.floor(drops[i]) % charset.length;
                if (charIndex < 0) charIndex += charset.length; // safety for negative indices
                const text = charset[charIndex];

                // Use darker pinks for characters to contrast against light background
                const colors = ["#be185d", "#db2777", "#a21caf", "#9d174d", "#ec4899"];
                ctx.fillStyle = Math.random() > 0.9 ? "#831843" : colors[Math.floor(Math.random() * colors.length)];

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly when it hits bottom
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment Y coordinate
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 50);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ display: "block" }}
        />
    );
}
