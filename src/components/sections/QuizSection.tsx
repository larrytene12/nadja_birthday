"use client";


import Iridescence from "@/components/ui/Iridescence";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS, QUIZ_BADGE_TEXT, QUIZ_SCORE_MESSAGES } from "@/lib/content";
import Image from "next/image";

const FLOWERS = ["/flowers/flower-1.png", "/flowers/flower-2.png"];

export default function QuizSection() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResponse, setShowResponse] = useState(false);
    const [finished, setFinished] = useState(false);

    const question = QUIZ_QUESTIONS[currentQ];

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        setShowResponse(true);
        setAnswers((prev) => [...prev, index]);

        setTimeout(() => {
            if (currentQ < QUIZ_QUESTIONS.length - 1) {
                setCurrentQ((p) => p + 1);
                setSelectedAnswer(null);
                setShowResponse(false);
            } else {
                setFinished(true);
            }
        }, 2000);
    };

    const correctCount = answers.filter(
        (a, i) => a === QUIZ_QUESTIONS[i]?.correct
    ).length;

    const scoreMessage =
        correctCount === QUIZ_QUESTIONS.length
            ? QUIZ_SCORE_MESSAGES.perfect
            : correctCount >= QUIZ_QUESTIONS.length * 0.75
                ? QUIZ_SCORE_MESSAGES.good
                : correctCount >= QUIZ_QUESTIONS.length * 0.5
                    ? QUIZ_SCORE_MESSAGES.okay
                    : QUIZ_SCORE_MESSAGES.low;

    const reset = () => {
        setCurrentQ(0);
        setAnswers([]);
        setSelectedAnswer(null);
        setShowResponse(false);
        setFinished(false);
    };

    return (
        <section
            id="section-quiz"
            className="section-base"
        >
            <motion.div
                className="text-center mb-8 z-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-script text-4xl md:text-5xl text-pink-500 mb-2 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-md px-6 py-2 rounded-full inline-block shadow-sm ">
                    Kuis Persahabatan 💌
                </h2>
                <p className="text-pink-400 text-sm">Seberapa kenal kamu sama aku?</p>
            </motion.div>

            <div className="w-full max-w-sm mx-auto px-4 z-10">
                <AnimatePresence mode="wait">
                    {!finished ? (
                        <motion.div
                            key={currentQ}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.35 }}
                        >
                            {/* Progress bar */}
                            <div className="flex gap-1 mb-6">
                                {QUIZ_QUESTIONS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${i <= currentQ ? "bg-pink-400" : "bg-pink-100"
                                            }`}
                                    />
                                ))}
                            </div>

                            <p className="text-xs text-pink-300 mb-3">Pertanyaan {currentQ + 1} dari {QUIZ_QUESTIONS.length}</p>

                            <div className="glass-card rounded-3xl p-6 shadow-pink mb-5">
                                <p className="font-serif-display text-gray-700 text-base leading-relaxed text-center">
                                    {question.question}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {question.options.map((option, i) => {
                                    const isSelected = selectedAnswer === i;
                                    const isCorrect = i === question.correct;
                                    let chipStyle = "bg-white border-pink-200 text-gray-600 hover:border-pink-400 hover:bg-pink-50";
                                    if (showResponse) {
                                        if (isCorrect) chipStyle = "bg-green-100 border-green-400 text-green-700";
                                        else if (isSelected && !isCorrect) chipStyle = "bg-red-100 border-red-300 text-red-500";
                                        else chipStyle = "bg-white border-pink-100 text-gray-400 opacity-60";
                                    }

                                    return (
                                        <motion.button
                                            key={i}
                                            className={`w-full py-3 px-4 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${chipStyle}`}
                                            whileHover={!showResponse ? { scale: 1.02 } : {}}
                                            whileTap={!showResponse ? { scale: 0.97 } : {}}
                                            onClick={() => handleAnswer(i)}
                                            disabled={showResponse}
                                        >
                                            {option}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Response message */}
                            <AnimatePresence>
                                {showResponse && (
                                    <motion.div
                                        className={`mt-4 p-3 rounded-2xl text-sm text-center ${selectedAnswer === question.correct
                                            ? "bg-green-50 text-green-600"
                                            : "bg-pink-50 text-pink-500"
                                            }`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {selectedAnswer === question.correct
                                            ? question.correctResponse
                                            : question.wrongResponse}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Badge */}
                            <div className="relative inline-block mb-6">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            width: "20px",
                                            height: "20px",
                                        }}
                                        animate={{
                                            x: Math.cos((i / 12) * Math.PI * 2) * 80 - 10,
                                            y: Math.sin((i / 12) * Math.PI * 2) * 80 - 10,
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                                    >
                                        {i % 4 === 0 ? (
                                            <Image
                                                src={FLOWERS[i % 2]}
                                                alt="flower"
                                                width={20}
                                                height={20}
                                                style={{ objectFit: 'contain', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))" }}
                                                quality={60}
                                            />
                                        ) : (
                                            <span className="text-xl">{["", "⭐", "💕", "✨"][i % 4]}</span>
                                        )}
                                    </motion.div>
                                ))}
                                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-xl">
                                    <span className="text-4xl">🏆</span>
                                </div>
                            </div>

                            <h3 className="font-script text-3xl text-pink-500 mb-2">{QUIZ_BADGE_TEXT}</h3>
                            <p className="text-3xl font-bold text-pink-400 mb-2">
                                {correctCount}/{QUIZ_QUESTIONS.length}
                            </p>
                            <p className="text-gray-500 text-sm mb-6 px-4">{scoreMessage}</p>

                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-medium transition-colors shadow-pink"
                            >
                                🔄 Coba Lagi
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
