"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicProvider } from "@/context/MusicContext";

// UI components
import PetalRain from "@/components/ui/PetalRain";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import WatermarkDecor from "@/components/ui/WatermarkDecor";
import Iridescence from "@/components/ui/Iridescence";

// Sections (lazy-loaded where heavy)
import CountdownSection from "@/components/sections/CountdownSection";
import GiftRevealSection from "@/components/sections/GiftRevealSection";
import MenuSection from "@/components/sections/MenuSection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";
import VideoRevealSection from "@/components/sections/VideoRevealSection";
import LifeJourneySection from "@/components/sections/LifeJourneySection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";

import StarRatingSection from "@/components/sections/StarRatingSection";
import QuizSection from "@/components/sections/QuizSection";
import WishesSection from "@/components/sections/WishesSection";
import TimeCapsuleSection from "@/components/sections/TimeCapsuleSection";
import RandomSurpriseSection from "@/components/sections/RandomSurpriseSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import ClosingSection from "@/components/sections/ClosingSection";

const SECTION_IDS = [
  "section-gift",
  "section-menu",
  "section-gallery",
  "section-video",
  "section-journey",
  "section-beforeafter",

  "section-stars",
  "section-quiz",
  "section-wishes",
  "section-capsule",
  "section-surprise",
  "section-guestbook",
  "section-closing",
];

export default function HomePage() {
  const [countdownDone, setCountdownDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Track scroll position to highlight active section
  useEffect(() => {
    if (!countdownDone) return;
    const handleScroll = () => {
      let found = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) found = i;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countdownDone]);

  return (
    <MusicProvider>
      <main className="relative overflow-x-hidden">
        {/* Countdown overlay */}
        <AnimatePresence>
          {!countdownDone && (
            <CountdownSection onComplete={() => setCountdownDone(true)} />
          )}
        </AnimatePresence>

        {/* Main content */}
        <AnimatePresence>
          {countdownDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Global Animated Background */}
              <div className="fixed inset-0 -z-10">
                <Iridescence
                  color={[1.0, 0.75, 0.85]}
                  speed={0.8}
                  amplitude={0.08}
                />
              </div>
              {/* Ambient petal rain and watermarks */}
              <PetalRain count={15} />
              <WatermarkDecor />

              {/* Progress indicator */}
              <ProgressIndicator total={SECTION_IDS.length} current={activeSection} />

              {/* All 16 sections */}
              <GiftRevealSection />
              <MenuSection />
              <PhotoGallerySection />
              <VideoRevealSection />
              <LifeJourneySection />
              <BeforeAfterSection />

              <StarRatingSection />
              <QuizSection />
              <WishesSection />
              <TimeCapsuleSection />
              <RandomSurpriseSection />
              <GuestbookSection />
              <ClosingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MusicProvider>
  );
}
