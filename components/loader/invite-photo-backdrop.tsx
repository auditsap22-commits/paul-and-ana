'use client';

import React from 'react';
import { useReducedMotion } from 'motion/react';
import './loading-screen.css';

export const MOBILE_BG_PHOTOS = Array.from(
  { length: 24 },
  (_, index) => encodeURI(`/mobile-background/couple (${index + 1}).webp`),
);

export const DESKTOP_BG_PHOTOS = Array.from(
  { length: 29 },
  (_, index) => encodeURI(`/desktop-background/couple (${index + 1}).webp`),
);

function splitMarqueeRows(photos: readonly string[]) {
  const top: string[] = [];
  const bottom: string[] = [];
  photos.forEach((src, index) => {
    (index % 2 === 0 ? top : bottom).push(src);
  });
  return [top, bottom] as const;
}

function MarqueeRow({
  photos,
  copies,
  direction,
  eagerCount,
}: {
  photos: readonly string[];
  copies: number;
  direction: 'left' | 'right';
  eagerCount: number;
}) {
  return (
    <div className={`loading-screen__marquee-row loading-screen__marquee-row--${direction}`}>
      <div className="loading-screen__slide-track">
        {Array.from({ length: copies }, (_, copy) => (
          <div key={copy} className="loading-screen__slide-strip">
            {photos.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${copy}-${src}`}
                src={src}
                alt=""
                draggable={false}
                decoding="async"
                fetchPriority={copy === 0 && index < 2 ? 'high' : 'low'}
                loading={copy === 0 && index < eagerCount ? 'eager' : 'lazy'}
                className="loading-screen__slide-photo"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhotoMarquee({
  photos,
  copies,
  variant,
}: {
  photos: readonly string[];
  copies: number;
  variant: 'mobile' | 'desktop';
}) {
  const [top, bottom] = splitMarqueeRows(photos);

  return (
    <div className={`loading-screen__marquee loading-screen__marquee--${variant}`}>
      <MarqueeRow photos={top} copies={copies} direction="left" eagerCount={4} />
      <MarqueeRow photos={bottom} copies={copies} direction="right" eagerCount={3} />
    </div>
  );
}

/** Fixed photo marquee + forest veil — mobile invitation continuity from loading. */
export function InvitePhotoBackdrop({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const copies = reduceMotion ? 1 : 2;

  return (
    <div className={`invite-photo-backdrop ${className}`.trim()} aria-hidden="true">
      <PhotoMarquee photos={MOBILE_BG_PHOTOS} copies={copies} variant="mobile" />
      <div className="loading-screen__backdrop-veil" />
    </div>
  );
}
