"use client";

import { createContext, useContext, useRef, useCallback, useEffect, useState } from "react";

interface MusicContextType {
    startMusic: () => void;
    pauseMusic: () => void;
    resumeMusic: () => void;
    isPlaying: boolean;
}

const MusicContext = createContext<MusicContextType>({
    startMusic: () => { },
    pauseMusic: () => { },
    resumeMusic: () => { },
    isPlaying: false,
});

export const useMusic = () => useContext(MusicContext);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = new Audio("/music/lagu.mp3");
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    const startMusic = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => { });
        setIsPlaying(true);
    }, []);

    const pauseMusic = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        setIsPlaying(false);
    }, []);

    const resumeMusic = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.play().catch(() => { });
        setIsPlaying(true);
    }, []);

    return (
        <MusicContext.Provider value={{ startMusic, pauseMusic, resumeMusic, isPlaying }}>
            {children}
        </MusicContext.Provider>
    );
}
