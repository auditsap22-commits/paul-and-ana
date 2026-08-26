"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Cinzel } from "next/font/google"
import Image from "next/image"
import { useSiteConfig } from "@/hooks/use-site-config"
import { parseWeddingDate } from "@/lib/wedding-date"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const C = {
  forest: "#5d6f47",
  sage: "#949981",
  mustard: "#eec853",
  butter: "#f4dd97",
  cream: "#f7f3e9",
  ink: "#3a3128",
} as const

const entryEase = [0.22, 1, 0.36, 1] as const

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function formatCeremonyTimePhrase(raw: string) {
  const match = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i)
  if (!match) return raw.toUpperCase()

  let hour24 = Number(match[1])
  const minutes = match[2] ?? "00"
  const meridiem = (match[3] || "").toUpperCase()

  if (meridiem === "PM" && hour24 !== 12) hour24 += 12
  if (meridiem === "AM" && hour24 === 12) hour24 = 0

  const period =
    hour24 >= 17 ? "IN THE EVENING" : hour24 >= 12 ? "IN THE AFTERNOON" : "IN THE MORNING"

  let displayHour = hour24 % 12
  if (displayHour === 0) displayHour = 12

  return `${displayHour}:${minutes} ${period}`
}

function useCeremonyCountdown() {
  const siteConfig = useSiteConfig()

  const targetTimestamp = useMemo(() => {
    const parsedDate = parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date)
    const monthMap: Record<string, string> = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    }
    const monthKey =
      parsedDate.month.charAt(0) + parsedDate.month.slice(1).toLowerCase()
    const monthNum = monthMap[monthKey] ?? "11"
    const timeRaw = siteConfig.ceremony.time ?? siteConfig.wedding.time
    const timeMatch = timeRaw.match(/(\d+):(\d+)\s*(AM|PM)/i)

    let hour = 9
    let minutes = 0
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10)
      minutes = parseInt(timeMatch[2], 10)
      const ampm = timeMatch[3].toUpperCase()
      if (ampm === "PM" && hour !== 12) hour += 12
      if (ampm === "AM" && hour === 12) hour = 0
    }

    return new Date(
      Date.UTC(
        parseInt(parsedDate.year, 10),
        parseInt(monthNum, 10) - 1,
        parseInt(parsedDate.day, 10),
        hour - 8,
        minutes,
        0,
      ),
    ).getTime()
  }, [
    siteConfig.ceremony.date,
    siteConfig.ceremony.time,
    siteConfig.wedding.date,
    siteConfig.wedding.time,
  ])

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const tick = () => {
      const difference = targetTimestamp - Date.now()
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [targetTimestamp])

  return timeLeft
}

function CountdownUnit({
  value,
  label,
  pad = false,
}: {
  value: number
  label: string
  pad?: boolean
}) {
  const display = pad ? pad2(value) : String(value)

  return (
    <div className="flex min-w-[3rem] flex-1 flex-col items-center sm:min-w-[3.5rem]">
      <span
        className={`${cinzel.className} text-[clamp(1.35rem,6vw,1.9rem)] font-semibold leading-none tabular-nums tracking-[0.04em]`}
        style={{ color: C.cream }}
      >
        {display}
      </span>
      <span
        className={`${cinzel.className} mt-1.5 text-[0.48rem] font-medium uppercase tracking-[0.14em] sm:mt-2 sm:text-[0.54rem] sm:tracking-[0.18em]`}
        style={{ color: `color-mix(in srgb, ${C.cream} 88%, transparent)` }}
      >
        {label}
      </span>
    </div>
  )
}

function HeroCountdown() {
  const timeLeft = useCeremonyCountdown()
  const colonClass = `${cinzel.className} shrink-0 self-start px-0.5 text-[clamp(1.35rem,6vw,1.9rem)] font-semibold leading-none tabular-nums sm:px-1`

  return (
    <div
      className="w-full px-4 py-4 sm:px-6 sm:py-5"
      style={{
        background: `linear-gradient(
          180deg,
          color-mix(in srgb, ${C.forest} 94%, black) 0%,
          ${C.forest} 100%
        )`,
      }}
    >
      <p
        className={`${cinzel.className} text-center text-[0.58rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.64rem] sm:tracking-[0.26em]`}
        style={{ color: C.cream }}
      >
        Time left til we say I do
      </p>

      <div
        className="mx-auto mt-2 flex max-w-md items-start justify-center sm:mt-2.5 sm:max-w-lg"
        aria-live="polite"
        aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <span className={colonClass} style={{ color: C.cream }} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.hours} label="Hours" pad />
        <span className={colonClass} style={{ color: C.cream }} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.minutes} label="Minutes" pad />
        <span className={colonClass} style={{ color: C.cream }} aria-hidden="true">
          :
        </span>
        <CountdownUnit value={timeLeft.seconds} label="Seconds" pad />
      </div>
    </div>
  )
}

export function Hero() {
  const siteConfig = useSiteConfig()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 40)
    return () => window.clearTimeout(id)
  }, [])

  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const coupleLabel = `${groomName} & ${brideName}`

  const parsedDate = useMemo(
    () => parseWeddingDate(siteConfig.ceremony.date ?? siteConfig.wedding.date),
    [siteConfig.ceremony.date, siteConfig.wedding.date],
  )

  const weekday = (siteConfig.ceremony.day ?? parsedDate.dayOfWeek).toUpperCase()
  const dateLine = `${parsedDate.month} ${parsedDate.day}, ${parsedDate.year}, ${weekday}`
  const ceremonyTimePhrase = formatCeremonyTimePhrase(
    siteConfig.ceremony.time ?? siteConfig.wedding.time,
  )
  const ceremonyName =
    siteConfig.ceremony.location || siteConfig.wedding.venue
  const receptionName = siteConfig.reception.location
  const churchImage = "/Details/imageceremony.png"

  const fadeUp = (delay: number) => {
    if (reduceMotion) {
      return { initial: false as const, animate: { opacity: 1, y: 0 } }
    }
    return {
      initial: { opacity: 0, y: 16 },
      animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
      transition: { duration: 0.8, delay, ease: entryEase },
    }
  }

  const detailLineClass = `${cinzel.className} text-[0.62rem] font-medium uppercase leading-[1.85] tracking-[0.16em] sm:text-[0.68rem] sm:tracking-[0.18em]`

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, ${C.butter} 35%, transparent) 0%, transparent 55%),
          radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${C.sage} 16%, transparent) 0%, transparent 58%),
          radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${C.mustard} 14%, transparent) 0%, transparent 55%),
          linear-gradient(180deg, ${C.cream} 0%, #faf7ef 48%, ${C.cream} 100%)
        `,
        color: "var(--color-welcome-text)",
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-6 pb-3 pt-[clamp(6.5rem,16vw,9rem)] sm:max-w-2xl sm:px-8 sm:pb-4">
        <motion.p
          className={`${cinzel.className} text-center text-[0.62rem] font-medium uppercase tracking-[0.28em] sm:text-[0.68rem] sm:tracking-[0.32em]`}
          style={{ color: "var(--color-welcome-navy)" }}
          {...fadeUp(0.04)}
        >
          Welcome to the wedding of
        </motion.p>

        <motion.div
          className="mt-6 w-full max-w-[min(22rem,92%)] sm:mt-7 sm:max-w-[28rem] md:max-w-[32rem]"
          {...fadeUp(0.12)}
        >
          <div
            className="couple-name-lockup"
            role="img"
            aria-label={coupleLabel}
          />
        </motion.div>

        <motion.div
          className="mt-5 w-full text-center sm:mt-6"
          style={{ color: "var(--color-welcome-text)" }}
          {...fadeUp(0.22)}
        >
          <p className={detailLineClass} style={{ color: "var(--color-welcome-navy)" }}>
            {dateLine}
          </p>
          <p className={detailLineClass} style={{ color: "var(--color-welcome-navy)" }}>
            {ceremonyTimePhrase}
          </p>
          <p className={detailLineClass} style={{ color: "var(--color-welcome-navy)" }}>
            {ceremonyName.toUpperCase()}
          </p>
          {receptionName ? (
            <p className={detailLineClass} style={{ color: "var(--color-welcome-navy)" }}>
              Reception follows at {receptionName.toUpperCase()}
            </p>
          ) : null}
        </motion.div>
      </div>

      <motion.div className="relative z-10 -mt-1 w-full sm:-mt-2" {...fadeUp(0.34)}>
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[21/9]">
          <Image
            src={churchImage}
            alt={ceremonyName}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <HeroCountdown />
      </motion.div>
    </section>
  )
}
