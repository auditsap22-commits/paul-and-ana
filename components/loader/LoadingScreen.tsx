'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cinzel } from 'next/font/google';
import {
  DESKTOP_BG_PHOTOS,
  PhotoMarquee,
} from '@/components/loader/invite-photo-backdrop';
import './loading-screen.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

interface LoadingScreenProps {
  onComplete: () => void;
  onFadeStart?: () => void;
}

const TOTAL_DURATION_MS = 9000;
const FADE_OUT_MS = 950;
const entryEase = [0.22, 1, 0.36, 1] as const;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart }) => {
  const reduceMotion = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);
  const photoCopies = reduceMotion ? 1 : 2;
  const textDelay = reduceMotion ? 0 : 0.36;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      onFadeStart?.();
      setFadeOut(true);
      setTimeout(onComplete, FADE_OUT_MS);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onComplete, onFadeStart]);

  return (
    <motion.div
      className="loading-screen fixed inset-0 z-50 flex items-stretch justify-center overflow-hidden overscroll-none h-dvh max-h-dvh w-screen"
      aria-live="polite"
      aria-busy={!fadeOut}
      aria-label="Loading invitation"
      initial={false}
      animate={
        fadeOut
          ? {
              opacity: 0,
              scale: reduceMotion ? 1 : 1.015,
              filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
            }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{
        duration: reduceMotion ? 0.2 : FADE_OUT_MS / 1000,
        ease: entryEase,
      }}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <div className="loading-screen__backdrop" aria-hidden="true">
        <PhotoMarquee photos={DESKTOP_BG_PHOTOS} copies={photoCopies} variant="desktop" />
        <div className="loading-screen__backdrop-veil" />
      </div>

      <div className="loading-screen__overlay">
        <motion.figure
          className="loading-screen__verse"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: entryEase, delay: textDelay }}
        >
          <blockquote className="loading-screen__verse-text font-goudy-italic">
            <span className="loading-screen__quote-mark loading-screen__quote-mark--open" aria-hidden="true">
              &ldquo;
            </span>
            <p>He has made everything beautiful in His time.</p>
            <span className="loading-screen__quote-mark loading-screen__quote-mark--close" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
          <figcaption className={`loading-screen__verse-ref ${cinzel.className}`}>
            Ecclesiastes 3:11
          </figcaption>
        </motion.figure>
      </div>
    </motion.div>
  );
};
