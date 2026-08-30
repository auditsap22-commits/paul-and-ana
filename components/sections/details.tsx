"use client"

import { Section } from "@/components/section"
import { useState, useEffect, type ReactNode } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import {
  Shirt,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

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
} as const

const sectionBackground = `
  radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, ${C.butter} 35%, transparent) 0%, transparent 55%),
  radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${C.sage} 16%, transparent) 0%, transparent 58%),
  radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${C.mustard} 14%, transparent) 0%, transparent 55%),
  linear-gradient(180deg, ${C.cream} 0%, #faf7ef 48%, ${C.cream} 100%)
`

const detailText = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const softPanelStyle = {
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
  backgroundColor: "var(--color-welcome-bg-soft)",
} as const

const QR_FG = "var(--color-motif-deep)"
const QR_BG = "#FAF7F2"

const CEREMONY_VENUE_IMAGE = "/Details/ceremony-image.png"
const RECEPTION_VENUE_IMAGE = "/Details/reception-image.png"

function SectionIconDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      {icon}
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

function DetailsTitle() {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em] pb-1 sm:pb-1.5`}
        style={{
          fontSize: "var(--title-size)",
          color: "var(--color-welcome-navy)",
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: "var(--color-motif-accent)",
        }}
      >
        our special day
      </span>
      <span className="sr-only">our special day</span>
    </h2>
  )
}

// Slightly compact type inside card containers (not the page header)
const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  labelSm: "text-[10px] sm:text-[11px] md:text-xs",
  body: "text-xs sm:text-sm md:text-base",
  bodyMd: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
  subhead: "text-xs sm:text-sm md:text-base lg:text-lg",
  time: "text-xs sm:text-sm md:text-base lg:text-xl",
  cardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlayTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlaySub: "text-xs sm:text-sm md:text-base",
  month: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  dayNum: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
  year: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  sectionTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  btn: "text-xs sm:text-sm md:text-base",
  noteTitle: "text-xl sm:text-2xl md:text-3xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-xs sm:text-sm md:text-base lg:text-lg",
} as const

const guestDressCodePalette = [
  "#587042",
  "#A9B494",
  "#FAF7E6",
  "#F8DE8C",
  "#F6C531",
] as const

function ColorPalette({ colors }: { colors: readonly string[] }) {
  return (
    <div
      className="mx-auto flex h-8 w-full max-w-md overflow-hidden rounded-full border-2 border-white sm:h-9"
      role="img"
      aria-label={`Color palette: ${colors.join(", ")}`}
    >
      {colors.map((color) => (
        <div
          key={color}
          className="min-w-0 flex-1"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  )
}

function CoupleImagesCarousel({
  coupleImages,
  currentImageIndex,
  rotationOffset,
}: {
  coupleImages: string[]
  currentImageIndex: number
  rotationOffset: number
}) {
  return (
    <div className="mb-4 flex w-full max-w-[min(100%,16.5rem)] justify-center gap-2.5 sm:mb-5 sm:max-w-[19rem] sm:gap-3">
      {coupleImages.map((image, index) => {
        const isActive = index === currentImageIndex
        const baseRotation = index === 0 ? -4 : index === 1 ? 4 : index === 2 ? -2 : 3
        const currentRotation = isActive
          ? baseRotation + Math.sin((rotationOffset * Math.PI) / 180) * 1.5
          : baseRotation

        return (
          <div
            key={image}
            className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md border sm:h-11 sm:w-11 md:h-12 md:w-12 ${
              isActive ? "z-10" : "opacity-80"
            }`}
            style={{
              transform: `rotate(${currentRotation}deg) scale(${isActive ? 1.38 : 1})`,
              transition:
                "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
              borderColor: "rgba(255, 255, 255, 0.55)",
            }}
          >
            <Image
              src={image}
              alt={`Wedding couple ${index + 1}`}
              fill
              className="object-cover object-center"
              sizes="48px"
              style={{ opacity: isActive ? 1 : 0.78 }}
            />
          </div>
        )
      })}
    </div>
  )
}

const reminderArch = {
  forest: "#5d6f47",
  heading: "#FFFFFF",
  body: "#F8F5EC",
} as const

const reminderDividerStyle = {
  background:
    "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.45), transparent)",
} as const

function ReminderCard({
  title,
  children,
  showDivider = true,
}: {
  title: string
  children: ReactNode
  showDivider?: boolean
}) {
  return (
    <>
      {showDivider ? (
        <div
          className="mx-auto my-3 h-px w-full max-w-md sm:my-4"
          style={reminderDividerStyle}
          aria-hidden
        />
      ) : null}
      <div className="px-1 py-1 sm:py-1.5">
        <h4
          className={`${cinzel.className} ${ct.reminderHead} mb-2 font-semibold uppercase tracking-[0.14em] sm:mb-2.5`}
          style={{ color: reminderArch.heading }}
        >
          {title}
        </h4>
        <div
          className={`font-goudy-italic ${ct.reminderBody} leading-relaxed`}
          style={{ color: reminderArch.body }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

type EventVenueCardProps = {
  badge: string
  image: string
  locationName: string
  venueAddress: string
  venueDetail?: string
  venueSectionLabel: string
  mapsLink: string
  copyId: string
  fullVenue: string
  copiedItems: Set<string>
  onCopy: (text: string, id: string) => void
  onOpenMaps: (link: string) => void
  showSchedule?: boolean
  day?: string
  dateString?: string
  time?: string
  arrivalTime?: string
}

function EventVenueCard({
  badge,
  image,
  locationName,
  venueAddress,
  venueDetail,
  venueSectionLabel,
  mapsLink,
  copyId,
  fullVenue,
  copiedItems,
  onCopy,
  onOpenMaps,
  showSchedule = false,
  day,
  dateString,
  time,
  arrivalTime,
}: EventVenueCardProps) {
  const eventDate =
    showSchedule && dateString ? new Date(dateString) : null

  return (
    <div className="relative">
      <div
        className="relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300"
        style={cardStyle}
      >
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
          <Image
            src={image}
            alt={locationName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
            priority
          />
        </div>

        <div className="p-3 sm:p-5 md:p-7 lg:p-9">
          {showSchedule && eventDate ? (
            <div className="text-center mb-5 sm:mb-8 md:mb-10 space-y-2 sm:space-y-2.5 md:space-y-3">
              <p
                className={`${cinzel.className} ${ct.label} font-semibold uppercase tracking-[0.2em]`}
                style={{ color: detailText.heading }}
              >
                {day}
              </p>

              <p
                className={`${cinzel.className} ${ct.month} font-semibold leading-none`}
                style={{ color: detailText.heading }}
              >
                {eventDate.toLocaleString("default", { month: "long" })}
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-1 sm:py-2">
                <p
                  className={`${cinzel.className} ${ct.dayNum} font-semibold leading-none`}
                  style={{ color: detailText.accent }}
                >
                  {eventDate.getDate()}
                </p>
                <div
                  className="h-10 sm:h-12 md:h-14 w-[2px] rounded-full"
                  style={{ backgroundColor: "var(--color-welcome-green)" }}
                />
                <p
                  className={`${cinzel.className} ${ct.year} font-semibold leading-none`}
                  style={{ color: detailText.heading }}
                >
                  {eventDate.getFullYear()}
                </p>
              </div>

              {arrivalTime ? (
                <div className="space-y-1 sm:space-y-1.5">
                  <p
                    className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.1em] uppercase`}
                    style={{ color: detailText.heading }}
                  >
                    Arrival: {arrivalTime}
                  </p>
                  {time ? (
                    <p
                      className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.1em] uppercase`}
                      style={{ color: detailText.heading }}
                    >
                      Wedding Starts: {time}
                    </p>
                  ) : null}
                </div>
              ) : time ? (
                <p
                  className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.14em] uppercase py-2 sm:py-3`}
                  style={{ color: detailText.heading }}
                >
                  At {time}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={softPanelStyle}>
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: detailText.accent }} />
              <div className="flex-1 min-w-0">
                <p className={`${cinzel.className} ${ct.label} font-semibold mb-1.5 sm:mb-2 uppercase tracking-wide`} style={{ color: detailText.label }}>
                  {venueSectionLabel}
                </p>
                <p className={`${theSeasons.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-[0.06em] uppercase`} style={{ color: detailText.heading }}>
                  {locationName}
                </p>
                {venueDetail && (
                  <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-wide`} style={{ color: detailText.label }}>
                    {venueDetail}
                  </p>
                )}
                <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-[0.04em]`} style={{ color: detailText.body }}>
                  {venueAddress}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <div
                  className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: "var(--color-welcome-bg)",
                    borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
                  }}
                >
                  <QRCodeSVG
                    value={mapsLink}
                    size={80}
                    level="M"
                    includeMargin={false}
                    fgColor={QR_FG}
                    bgColor={QR_BG}
                  />
                </div>
                <p className={`font-goudy-italic ${ct.label} text-center max-w-[90px]`} style={{ color: detailText.label }}>
                  Scan for directions
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => onOpenMaps(mapsLink)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-full border font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                backgroundColor: "var(--color-welcome-green)",
                borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                color: "var(--color-welcome-bg)",
                boxShadow:
                  "0 6px 20px color-mix(in srgb, var(--color-welcome-green) 35%, transparent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
                e.currentTarget.style.borderColor = "var(--color-welcome-green)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
              }}
              aria-label={`Get directions to ${badge.toLowerCase()} venue`}
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(fullVenue, copyId)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 border-2 rounded-full font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                color: detailText.heading,
                backgroundColor: "var(--color-welcome-bg-soft)",
                borderColor: "color-mix(in srgb, var(--color-motif-deep) 20%, transparent)",
              }}
              aria-label={`Copy ${badge.toLowerCase()} venue address`}
            >
              {copiedItems.has(copyId) ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: "var(--color-welcome-green)" }} />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              )}
              <span>{copiedItems.has(copyId) ? "Copied!" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Colors sourced from globals.css @theme inline — edit there to update everywhere

const COUPLE_IMAGES = [
  "/envelope/box (1).JPG",
  "/envelope/box (2).JPG",
  "/envelope/box (3).JPG",
  "/envelope/box (4).JPG",
]

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)

  // Gentle reminders couple photos — subtle carousel + wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % COUPLE_IMAGES.length)
      setRotationOffset((prev) => (prev + 10) % 360)
    }, 2600)

    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink =
    siteConfig.reception.map ||
    `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
      <Section
        id="details"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 overflow-hidden"
      >
        {/* Header */}
        <div className="relative z-20 mb-6 px-6 text-center sm:mb-8 sm:px-10 md:mb-10 md:px-12">
          <div className="my-4 sm:my-5 md:my-6">
            <DetailsTitle />
          </div>
          <p
            className="font-goudy-italic mx-auto max-w-2xl px-2 text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
            style={{ color: "var(--color-welcome-text)" }}
          >
            Everything you need to know about our special day.
          </p>

          <SectionIconDivider
            icon={
              <MapPin
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: "var(--color-welcome-green)" }}
                aria-hidden
              />
            }
          />
        </div>

      {/* Venue and Event Information */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12 space-y-6 sm:space-y-10 md:space-y-14">
        <EventVenueCard
          badge="Ceremony"
          image={CEREMONY_VENUE_IMAGE}
          locationName={ceremonyVenueName}
          venueAddress={ceremonyAddress}
          venueDetail={ceremonyVenueDetail}
          venueSectionLabel="Ceremony Venue"
          mapsLink={ceremonyMapsLink}
          copyId="ceremony"
          fullVenue={ceremonyVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />

        <EventVenueCard
          badge="Reception"
          image={RECEPTION_VENUE_IMAGE}
          locationName={receptionVenueName}
          venueAddress={receptionAddress}
          venueDetail={receptionVenueDetail}
          venueSectionLabel="Reception Venue"
          mapsLink={receptionMapsLink}
          copyId="reception"
          fullVenue={receptionVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />
       
      </div>

      {/* Dress Code */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <SectionIconDivider
            icon={
              <Shirt
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: "var(--color-welcome-green)" }}
                aria-hidden
              />
            }
          />
        </div>

        <div className="mx-auto mb-6 w-full max-w-4xl sm:mb-8 md:mb-10">
          <div
            className="overflow-hidden rounded-xl border sm:rounded-2xl"
            style={cardStyle}
          >
            <Image
              src="/Details/dresscode.png"
              alt="Dress code for Principal Sponsors and Guests"
              width={1305}
              height={1205}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 896px"
            />
          </div>
        </div>
      </div>

        {/* <div
          className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border shadow-sm"
          style={cardStyle}
        >
          <p className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] text-center mb-3 sm:mb-4 font-semibold`} style={{ color: detailText.label }}>
            Note to Sponsors, Principal Sponsors & Guests
          </p>
          <ul className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            <li className="flex gap-3 items-start">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-welcome-green)" }}
              />
              <p className={`font-goudy-italic ${ct.body} leading-relaxed`} style={{ color: detailText.body }}>
                Please wear comfortable footwear fit for outdoor reception.
              </p>
            </li>
          </ul>
        </div> */}

        {/* Gentle Reminders */}
        <div className="relative z-20 mx-auto mt-6 max-w-3xl px-4 pb-2 sm:mt-8 sm:max-w-4xl sm:px-6 md:px-8">
          <div className="relative">
            <div
              className="relative z-20 overflow-hidden rounded-t-full"
              style={{
                backgroundColor: reminderArch.forest,
                boxShadow: `0 18px 48px color-mix(in srgb, ${reminderArch.forest} 28%, transparent)`,
              }}
            >
              <div
                className="pointer-events-none absolute inset-3 z-30 rounded-t-full border border-white sm:inset-4 md:inset-5"
                aria-hidden
              />

              <div className="relative z-20 flex flex-col items-center px-5 pb-10 pt-[22%] text-center sm:px-8 sm:pb-12 md:px-12 md:pb-14 lg:px-14">
                <CoupleImagesCarousel
                  coupleImages={COUPLE_IMAGES}
                  currentImageIndex={currentImageIndex}
                  rotationOffset={rotationOffset}
                />

                <h3
                  className={`${cinzel.className} ${ct.sectionTitle} font-semibold uppercase tracking-[0.14em]`}
                  style={{ color: reminderArch.heading }}
                >
                  Gentle Reminders
                </h3>
                <p
                  className={`font-goudy-italic ${ct.body} mx-auto mt-2 max-w-lg leading-relaxed`}
                  style={{ color: reminderArch.body }}
                >
                  A few thoughtful notes to help everyone enjoy our celebration.
                </p>
                <div
                  className="mx-auto mt-4 h-px w-full max-w-md sm:mt-5"
                  style={reminderDividerStyle}
                  aria-hidden
                />

                <div className="mx-auto mt-1 w-full max-w-2xl sm:mt-2">
                  <ReminderCard title="Unplugged Ceremony" showDivider={false}>
                    <div className="space-y-2.5">
                      <p>
                        Your presence at our wedding is the greatest gift of all. As we say
                        &ldquo;I do,&rdquo; we kindly ask that you refrain from taking photos or videos
                        during the ceremony and keep all devices tucked away.
                      </p>
                      <p>
                        Be fully present, share in our joy, and leave the capturing of memories to our
                        professional photographers.
                      </p>
                      <p>
                        Thank you for helping us create a truly meaningful and unforgettable celebration.
                      </p>
                    </div>
                  </ReminderCard>

                  <ReminderCard title="Strictly Formal">
                    <div className="space-y-2.5">
                      <p>
                        Kindly follow our dress code guide and color palette above to match our wedding
                        theme.
                      </p>
                      <ColorPalette colors={guestDressCodePalette} />
                      <p>Strictly no white-colored attire.</p>
                    </div>
                  </ReminderCard>

                  <ReminderCard title="Arrival">
                    <p>
                      To ensure everything runs smoothly, please arrive at {siteConfig.ceremony.guestsTime}. This will give you enough time to find your seat, settle in comfortably, and fully enjoy the beautiful ceremony before it begins at {siteConfig.ceremony.time}. We truly appreciate your punctuality and look forward to celebrating this special moment with you.
                    </p>
                  </ReminderCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(91,102,85,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-motif-deep rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "var(--color-motif-cream)" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, var(--color-motif-cream), var(--color-motif-cream), var(--color-motif-deep))" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)", color: "var(--color-motif-cream)" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="var(--color-motif-cream)" style={{ color: "var(--color-motif-cream)" }} />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-motif-cream" />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={
                  showImageModal === "ceremony"
                    ? CEREMONY_VENUE_IMAGE
                    : RECEPTION_VENUE_IMAGE
                }
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="relative border-t-2 p-5 sm:p-6 md:p-8 bg-motif-deep backdrop-blur-sm"
              style={{ borderColor: "var(--color-motif-cream)" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "var(--color-motif-cream)" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="var(--color-motif-cream)" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-motif-cream">
                      <MapPin className="w-4 h-4 text-motif-cream" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-motif-deep border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-motif-accent whitespace-nowrap text-motif-cream"
                      title="Copy address"
                      style={{ borderColor: "var(--color-motif-cream)" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-motif-cream text-motif-deep"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-motif-cream">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </Section>
    </div>
  )
}