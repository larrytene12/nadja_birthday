"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Pen } from "lucide-react";

const COLORS = ["#f472b6", "#c084fc", "#fb7185", "#a78bfa", "#ec4899", "#1f2937", "#ffffff"];
const SIZES = [4, 8, 14, 20];

export default function GuestbookSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const [color, setColor] = useState("#f472b6");
    const [size, setSize] = useState(4);
    const [mode, setMode] = useState<"draw" | "erase">("draw");

    const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e instanceof TouchEvent) {
            const touch = e.touches[0];
            return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
        }
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        isDrawing.current = true;
        const canvas = canvasRef.current;
        if (!canvas) return;
        lastPos.current = getPos(e, canvas);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        if (!isDrawing.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const pos = getPos(e, canvas);
        const last = lastPos.current;
        if (!last) { lastPos.current = pos; return; }

        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = mode === "erase" ? "#fff5f8" : color;
        ctx.lineWidth = mode === "erase" ? size * 4 : size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        lastPos.current = pos;
    };

    const stopDraw = () => { isDrawing.current = false; lastPos.current = null; };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#fff5f8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Redraw background text
        ctx.fillStyle = "#f9a8d4";
        ctx.font = "16px 'Dancing Script', cursive";
        ctx.textAlign = "center";
        ctx.fillText("Tulis atau gambar sesuatu untukku ya! 🌸", canvas.width / 2, canvas.height / 2);
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "pesan-untuk-nadja.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#fff5f8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Initial placeholder text
        ctx.fillStyle = "#f9a8d4";
        ctx.font = "16px Georgia";
        ctx.textAlign = "center";
        ctx.fillText("Tulis atau gambar sesuatu untukku ya! 🌸", canvas.width / 2, canvas.height / 2);

        // Touch events
        const onTouchStart = (e: TouchEvent) => startDraw(e);
        const onTouchMove = (e: TouchEvent) => draw(e);
        const onTouchEnd = () => stopDraw();
        canvas.addEventListener("touchstart", onTouchStart, { passive: false });
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd);
        return () => {
            canvas.removeEventListener("touchstart", onTouchStart);
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <section
            id="section-guestbook"
            className="section-base py-16"
        >
            <motion.div
                className="text-center mb-6 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Coret-coret Untukku ✏️
                </h2>
                <p className="text-pink-400 text-sm">Gambar atau tulis pesan di kanvas di bawah ini!</p>
            </motion.div>

            <motion.div
                className="z-10 w-full max-w-md mx-auto px-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Toolbar */}
                <div className="glass-card rounded-2xl p-3 mb-3 flex flex-wrap items-center gap-3 justify-between">
                    {/* Colors */}
                    <div className="flex gap-1.5 flex-wrap">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setMode("draw"); }}
                                className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                                style={{
                                    backgroundColor: c,
                                    borderColor: color === c && mode === "draw" ? "#f472b6" : "transparent",
                                    boxShadow: c === "#ffffff" ? "inset 0 0 0 1px #e5e7eb" : "none",
                                }}
                                aria-label={`Color ${c}`}
                            />
                        ))}
                    </div>

                    {/* Size + Mode */}
                    <div className="flex items-center gap-2">
                        <select
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="text-xs border border-pink-200 rounded-lg px-1 py-0.5 bg-white text-pink-500"
                        >
                            {SIZES.map((s) => <option key={s} value={s}>{s}px</option>)}
                        </select>
                        <button
                            onClick={() => setMode(mode === "erase" ? "draw" : "erase")}
                            className={`text-xs px-2 py-1 rounded-full transition-colors ${mode === "erase" ? "bg-pink-400 text-white" : "bg-pink-50 text-pink-400"
                                }`}
                        >
                            {mode === "erase" ? "✏️ Hapus" : "✏️ Gambar"}
                        </button>
                    </div>
                </div>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={350}
                    className="w-full rounded-2xl shadow-pink touch-none cursor-crosshair"
                    style={{ border: "2px solid #fce7f3" }}
                    onMouseDown={(e) => startDraw(e.nativeEvent)}
                    onMouseMove={(e) => draw(e.nativeEvent)}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                />

                {/* Action buttons */}
                <div className="flex gap-3 mt-3 justify-end">
                    <button
                        onClick={clearCanvas}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-pink-50 text-pink-400 hover:bg-pink-100 transition-colors"
                    >
                        <Trash2 size={14} /> Hapus Semua
                    </button>
                    <button
                        onClick={downloadCanvas}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-pink-400 hover:bg-pink-500 text-white transition-colors shadow-pink"
                    >
                        <Download size={14} /> Simpan Gambar
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
