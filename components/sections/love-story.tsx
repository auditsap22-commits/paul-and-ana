"use client"

import React, { useEffect, useRef, useState } from "react"
import localFont from "next/font/local"
import Image from "next/image"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import "./love-story.css"

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const C = {
  forest: "#5d6f47",
  sage: "#949981",
  mustard: "#eec853",
  butter: "#f4dd97",
  cream: "#f7f3e9",
  ink: "#3a3128",
} as const

const SECTION_BG = `
  radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, ${C.butter} 35%, transparent) 0%, transparent 55%),
  radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${C.sage} 16%, transparent) 0%, transparent 58%),
  radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${C.mustard} 14%, transparent) 0%, transparent 55%),
  linear-gradient(180deg, ${C.cream} 0%, #faf7ef 48%, ${C.cream} 100%)
`

/* Reference flow: 2016 → 2020 → 2024 → church (bottom left) */
const DESKTOP_PATH =
  "M 165 145 C 285 82, 430 68, 565 82 C 700 96, 745 88, 758 108 C 722 168, 615 248, 505 308 C 448 342, 418 362, 428 380 C 438 398, 358 412, 258 416 C 178 418, 125 404, 102 386"

const MOBILE_PATH =
  "M 95 55 C 178 108, 288 138, 308 198 C 328 258, 248 308, 182 378 C 152 418, 212 468, 272 508 C 332 548, 252 608, 172 678 C 122 728, 95 768, 88 812"

const PATH_DASH = "4 14"

const STORY_PARAGRAPHS = [
  "Our story began at EEI Corporation, where we both started our careers. At the time, neither of us knew that we had just met the person we would one day spend forever with.",
  "We became closer when we were assigned to the Bohol Airport project. But back then, we were just good friends and not considering anything beyond it. We were both happily in our friendship radar, enjoying each other's company, sharing stories, and making memories without ever imagining that our friendship would someday become a love story.",
  "Years passed, and life had its own way of bringing us closer. Then, in 2020, destiny finally gave us a little nudge, and we started our relationship. When we look back, it feels like a perfect series of moments leading us here. Paul's birthday is on October 21, Ana's is on November 22, and on December 23, at Yellow Cab, our love story officially began. What might look like a simple pattern of dates became a meaningful symbol of our journey and the timing that made everything possible.",
  "From there, our story grew through countless adventures, challenges, laughter, and unforgettable moments. We learned, grew, and built a life together—one memory at a time.",
  "Then came December 2024, when Paul proposed to Ana in one of our favorite places, Baguio City. A place that already held special memories for us became the place where we took another step toward forever. 💍",
  "And now, here we are.",
  'In November 6, 2026, we will finally say "I do" and begin our greatest adventure yet—as husband and wife.',
  "Who would have thought that two people who were once just friends, both happily in their friendship radar, would eventually find their way to each other?",
  "Sometimes, the best love stories begin when you're not looking for love at all. ❤️",
  "And this is ours—the story of how friendship turned into love, and love turned into forever.",
] as const

function LoveStoryTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
       Our Love Story
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5`}
        style={{
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
        }}
      >
        Our Journey to Forever
      </span>
      <span className="sr-only">Our Journey to Forever</span>
    </h2>
  )
}

function TimelinePath({
  progress,
  pathD,
}: {
  progress: MotionValue<number>
  pathD: string
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength())
    }
  }, [pathD])

  const dashOffset = useTransform(progress, [0, 1], [length, 0])
  const dotX = useTransform(progress, (p) => {
    if (!pathRef.current || length <= 0) return 0
    return pathRef.current.getPointAtLength(p * length).x
  })
  const dotY = useTransform(progress, (p) => {
    if (!pathRef.current || length <= 0) return 0
    return pathRef.current.getPointAtLength(p * length).y
  })

  return (
    <>
      <path
        d={pathD}
        className="love-story-timeline__path love-story-timeline__path-bg"
        strokeDasharray={PATH_DASH}
      />
      <motion.path
        ref={pathRef}
        d={pathD}
        className="love-story-timeline__path love-story-timeline__path-active"
        strokeDasharray={PATH_DASH}
        style={{ strokeDashoffset: dashOffset }}
      />
      {length > 0 ? (
        <motion.circle
          className="love-story-timeline__dot"
          r={5}
          style={{ cx: dotX, cy: dotY }}
        />
      ) : null}
    </>
  )
}

function Polaroid({
  src,
  alt,
  caption,
  size = "md",
  rotation = 0,
  pin,
  tape = false,
  delay = 0,
}: {
  src: string
  alt: string
  caption: string
  size?: "sm" | "md"
  rotation?: number
  pin?: "red" | "white"
  tape?: boolean
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`love-story-polaroid love-story-polaroid--${size}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {pin ? <span className={`love-story-pin love-story-pin--${pin}`} aria-hidden /> : null}
      {tape ? <span className="love-story-tape" aria-hidden /> : null}
      <div className="love-story-polaroid__photo">
        <Image src={src} alt={alt} fill className="object-cover" sizes="180px" />
      </div>
      <div className="love-story-polaroid__caption-wrap">
        <p className={`love-story-polaroid__caption ${aboveTheBeyond.className}`}>{caption}</p>
      </div>
    </motion.div>
  )
}

function ChurchMilestone({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="love-story-milestone love-story-church-milestone"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="love-story-church-scene" role="img" aria-label="Our wedding day, November 6, 2026">
        <span className={`love-story-church-date ${aboveTheBeyond.className}`}>
          11.06.2026
        </span>
        <Image
          src="/Details/imageceremony.png"
          alt=""
          width={520}
          height={360}
          className="love-story-church-img"
          sizes="(max-width: 768px) 55vw, 14vw"
        />
      </div>
    </motion.div>
  )
}

function Milestone2016({ delay = 0 }: { delay?: number }) {
  return (
    <div className="love-story-milestone love-story-milestone--2016">
      <span className="love-story-year love-story-year--badge">2016</span>
      <div className="love-story-polaroid-stack">
        <Polaroid
          src="/loveStory/image_1.png"
          alt="Paul and Ana at EEI Corporation"
          caption="EEI Corporation"
          size="sm"
          rotation={-5}
          pin="red"
          delay={delay}
        />
        <Polaroid
          src="/loveStory/image_2.png"
          alt="Paul and Ana working together"
          caption="EEI Corporation"
          size="sm"
          rotation={4}
          pin="red"
          delay={delay + 0.1}
        />
      </div>
    </div>
  )
}

function Milestone2020({ delay = 0 }: { delay?: number }) {
  return (
    <div className="love-story-milestone love-story-milestone--2020">
      <span className="love-story-year">2020</span>
      <Polaroid
        src="/loveStory/image_3.png"
        alt="Paul and Ana in Alabang, Muntinlupa"
        caption="Alabang, Muntinlupa ♡"
        rotation={-3}
        pin="white"
        delay={delay}
      />
    </div>
  )
}

function Milestone2024({ delay = 0 }: { delay?: number }) {
  return (
    <div className="love-story-milestone love-story-milestone--2024">
      <span className="love-story-year">2024</span>
      <Polaroid
        src="/loveStory/image_4.png"
        alt="Paul proposed to Ana in Baguio City"
        caption="Baguio City"
        rotation={2}
        tape
        delay={delay}
      />
    </div>
  )
}

function LoveStoryTimeline() {
  const reduceMotion = useReducedMotion()
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const desktopTrackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileTrackRef,
    offset: ["start 0.88", "end 0.3"],
  })
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: desktopTrackRef,
    offset: ["start 0.88", "end 0.3"],
  })

  return (
    <div className="love-story-timeline relative w-full pb-6 pt-4 sm:pb-8">
      {/* Mobile — vertical roadmap */}
      <div ref={mobileTrackRef} className="love-story-timeline__mobile">
        <svg
          className="love-story-timeline__mobile-path"
          viewBox="0 0 360 860"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {reduceMotion ? (
            <>
              <path
                d={MOBILE_PATH}
                className="love-story-timeline__path love-story-timeline__path-bg"
                strokeDasharray={PATH_DASH}
              />
              <path
                d={MOBILE_PATH}
                className="love-story-timeline__path love-story-timeline__path-active"
                strokeDasharray={PATH_DASH}
              />
            </>
          ) : (
            <TimelinePath progress={mobileScrollProgress} pathD={MOBILE_PATH} />
          )}
        </svg>
        <div className="love-story-timeline__mobile-milestone love-story-timeline__mobile-milestone--2016">
          <Milestone2016 />
        </div>
        <div className="love-story-timeline__mobile-milestone love-story-timeline__mobile-milestone--2020">
          <Milestone2020 delay={0.08} />
        </div>
        <div className="love-story-timeline__mobile-milestone love-story-timeline__mobile-milestone--2024">
          <Milestone2024 delay={0.14} />
        </div>
        <div className="love-story-timeline__mobile-milestone love-story-timeline__mobile-milestone--2026">
          <ChurchMilestone delay={0.2} />
        </div>
      </div>

      {/* Desktop — winding roadmap */}
      <div
        ref={desktopTrackRef}
        className="love-story-timeline__desktop love-story-timeline__track mx-auto max-w-5xl px-2 sm:px-4"
      >
        <svg
          className="love-story-timeline__desktop-path"
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {reduceMotion ? (
            <>
              <path
                d={DESKTOP_PATH}
                className="love-story-timeline__path love-story-timeline__path-bg"
                strokeDasharray={PATH_DASH}
              />
              <path
                d={DESKTOP_PATH}
                className="love-story-timeline__path love-story-timeline__path-active"
                strokeDasharray={PATH_DASH}
              />
            </>
          ) : (
            <TimelinePath progress={desktopScrollProgress} pathD={DESKTOP_PATH} />
          )}
        </svg>
        <Milestone2016 />
        <Milestone2020 delay={0.12} />
        <Milestone2024 delay={0.2} />
        <div className="love-story-milestone love-story-milestone--2026">
          <ChurchMilestone delay={0.28} />
        </div>
      </div>
    </div>
  )
}

function LoveStoryNarrative() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="love-story-narrative mx-auto max-w-2xl px-6 pb-6 pt-4 sm:px-8 sm:pb-8 md:max-w-3xl">
      {STORY_PARAGRAPHS.map((paragraph, index) => (
        <motion.p
          key={paragraph.slice(0, 24)}
          className={`font-goudy-italic ${sectionType.textRelaxed} leading-[1.75] sm:leading-[1.8]`}
          style={{ color: "var(--color-welcome-text)" }}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35, margin: "-40px" }}
          transition={{
            duration: 0.75,
            delay: Math.min(index * 0.04, 0.24),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  )
}

export function LoveStory() {
  return (
    <section
      id="love-story"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} love-story-section relative w-full overflow-x-hidden`}
      style={{ background: SECTION_BG, color: "var(--color-welcome-text)" }}
    >
      <div className="relative px-4 pb-2 pt-[clamp(5rem,14vw,7rem)] text-center sm:px-6">
        <div className="relative mx-auto max-w-5xl">
          <LoveStoryTitle />
        </div>
          </div>

      <LoveStoryTimeline />
      <LoveStoryNarrative />

      <div className="px-4 pb-16 pt-6 text-center sm:pb-20 sm:pt-8">
          <blockquote className="mx-auto max-w-xl px-2">
            <p
              className={`font-goudy-italic ${sectionType.textRelaxed} italic leading-relaxed`}
              style={{ color: "var(--color-welcome-text)" }}
            >
              &ldquo;I have found the one whom my soul loves.&rdquo;
            </p>
            <footer
              className={`font-goudy-italic mt-2 sm:mt-3 ${sectionType.label} not-italic tracking-wide`}
              style={{ color: "var(--color-welcome-green)" }}
            >
              — Song of Solomon 3: 4
            </footer>
          </blockquote>
        </div>
    </section>
  )
}
