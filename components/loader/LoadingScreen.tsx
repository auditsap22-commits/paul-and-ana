'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cinzel } from 'next/font/google';
import { useSiteConfig } from '@/hooks/use-site-config';
import { parseWeddingDate } from '@/lib/wedding-date';
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
const MESSAGE_HOLD_MS = TOTAL_DURATION_MS / 4;
const FADE_OUT_MS = 950;
const entryEase = [0.22, 1, 0.36, 1] as const;
const rollerEase = [0.16, 1, 0.3, 1] as const;
const ROLLER_TRANSITION_MS = 720;
const STATUS_LINE_HEIGHT_REM = 1.75;

const LOADING_MESSAGES = [
  'Preparing your invitation',
  'Arranging the ceremony',
  'Sealing with care',
  'Your invitation awaits',
] as const;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onFadeStart }) => {
  const siteConfig = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const groomName = siteConfig.couple.groomNickname;
  const brideName = siteConfig.couple.brideNickname;
  const photoCopies = reduceMotion ? 1 : 2;
  const textDelay = reduceMotion ? 0 : 0.36;

  const ceremonyMeta = useMemo(() => {
    const parsed = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date);
    const weekday = siteConfig.ceremony.day || parsed.dayOfWeek;
    const monthLabel = parsed.month.charAt(0) + parsed.month.slice(1).toLowerCase();

    return {
      weekday,
      dateLine: `${monthLabel} ${parsed.day}, ${parsed.year}`,
      time: siteConfig.ceremony.time,
      venue: siteConfig.ceremony.location,
    };
  }, [
    siteConfig.ceremony.date,
    siteConfig.ceremony.day,
    siteConfig.ceremony.location,
    siteConfig.ceremony.time,
    siteConfig.wedding.date,
  ]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100));
    }, 40);

    const messageInterval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, MESSAGE_HOLD_MS);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      onFadeStart?.();
      setFadeOut(true);
      setTimeout(onComplete, FADE_OUT_MS);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
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
        <div className="loading-screen__invite">
          <motion.p
            className={`loading-screen__eyebrow ${cinzel.className}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: entryEase, delay: textDelay }}
          >
            The honor of your presence
          </motion.p>

          <motion.p
            className={`loading-screen__kicker ${cinzel.className}`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: entryEase, delay: textDelay + 0.08 }}
          >
            at the marriage of
          </motion.p>

          <motion.div
            className="loading-screen__names"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: entryEase, delay: textDelay + 0.14 }}
          >
            <div
              className="loading-screen__names-img"
              role="img"
              aria-label={`${groomName} and ${brideName}`}
            />
          </motion.div>

          <motion.div
            className="loading-screen__rule"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: entryEase, delay: textDelay + 0.22 }}
          />

          <motion.div
            className={`loading-screen__date-block ${cinzel.className}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: entryEase, delay: textDelay + 0.28 }}
          >
            {ceremonyMeta.weekday ? (
              <span className="loading-screen__weekday">{ceremonyMeta.weekday}</span>
            ) : null}
            <span className="loading-screen__date">{ceremonyMeta.dateLine}</span>
          </motion.div>

          <motion.div
            className={`loading-screen__ceremony ${cinzel.className}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: entryEase, delay: textDelay + 0.36 }}
          >
            <span className="loading-screen__ceremony-label">The Ceremony</span>
            <span className="loading-screen__ceremony-meta">
              {[ceremonyMeta.time, ceremonyMeta.venue].filter(Boolean).join('  ·  ')}
            </span>
          </motion.div>
        </div>

        <div className={`loading-screen__footer ${cinzel.className}`}>
          <motion.div
            className="loading-screen__status"
            aria-live="polite"
            aria-atomic="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: entryEase, delay: textDelay + 0.28 }}
          >
            <motion.div
              className="loading-screen__status-roller"
              animate={{ y: `-${messageIndex * STATUS_LINE_HEIGHT_REM}rem` }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { duration: ROLLER_TRANSITION_MS / 1000, ease: rollerEase }
              }
            >
              {LOADING_MESSAGES.map((message) => (
                <p key={message} className="loading-screen__status-line">
                  {message}
                </p>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="loading-screen__track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Loading progress"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: entryEase, delay: textDelay + 0.34 }}
          >
            <div
              className="loading-screen__bar"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
