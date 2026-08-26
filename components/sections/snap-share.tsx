"use client"

import { useEffect, useState } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Share2, Copy, Download, Check } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import {
  sectionBackground,
  sectionDividerLineStyle,
  sectionDividerLineStyleLeft,
  sectionText,
} from "@/lib/section-background"

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

const palette = {
  body: sectionText.body,
  heading: sectionText.heading,
  label: sectionText.label,
  accent: sectionText.accent,
} as const

const outsideDividerLineStyle = sectionDividerLineStyle

const insideDividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  label: sectionType.label,
  btn: sectionType.label,
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const QR_FG = "#1a1a1a"

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span className="h-px w-6 sm:w-10" style={sectionDividerLineStyleLeft} />
    </div>
  )
}

function InsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={insideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
        }}
      />
    </div>
  )
}

function SnapShareTitle() {
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
          color: sectionText.title,
        }}
      >
        Snap and Share
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: sectionText.script,
        }}
      >
        Share your memories
      </span>
      <span className="sr-only">Share your memories</span>
    </h2>
  )
}

function ContentCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
        aria-hidden
      />
      <div className="relative z-20 flex flex-col gap-3 px-4 py-5 sm:gap-4 sm:px-5 sm:py-6 md:px-6 md:py-7">
        {children}
      </div>
    </div>
  )
}

function PrimaryButton({
  onClick,
  children,
  className = "",
  active = false,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cinzel.className} group relative inline-flex items-center justify-center gap-1.5 rounded-sm border px-5 py-2.5 font-semibold uppercase tracking-[0.18em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn} ${className}`}
      style={
        active
          ? {
              backgroundColor: "var(--color-welcome-navy)",
              borderColor: "var(--color-welcome-green)",
              color: "var(--color-welcome-bg)",
            }
          : {
              backgroundColor: "var(--color-welcome-green)",
              borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
              color: "var(--color-welcome-bg)",
            }
      }
      onMouseEnter={(e) => {
        if (active) return
        e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
        e.currentTarget.style.borderColor = "var(--color-welcome-green)"
      }}
      onMouseLeave={(e) => {
        if (active) return
        e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
      }}
    >
      {children}
    </button>
  )
}

export function SnapShare() {
  const siteConfig = useSiteConfig()
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { groomNickname, brideNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`
  const uploadLink = siteConfig.snapShare.googleDriveLink

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const downloadAlbumQRCode = () => {
    const canvas = document.getElementById("album-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "album-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyUploadLink = async () => {
    if (!uploadLink) return
    try {
      await navigator.clipboard.writeText(uploadLink)
      setCopiedDriveLink(true)
      setTimeout(() => setCopiedDriveLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
      <section
        id="snap-share"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <div className="relative z-20 mx-auto max-w-6xl px-4 @container/snap-share sm:px-6 md:px-8">
          <div className="relative z-20 px-6 text-center sm:px-10 md:px-12">
            <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
              <OutsideDivider />
            </div>
            <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
              <SnapShareTitle />
            </div>
            <p
              className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
              style={{ color: sectionText.body }}
            >
              Help us remember the little moments of {coupleDisplayName}&apos;s day — every smile,
              embrace, and candid laugh. Your photos and clips complete our love story.
            </p>
            <div className="flex items-center justify-center pt-3 sm:pt-4">
              <span className="h-px w-16 sm:w-24 md:w-32 bg-motif-deep/35" />
            </div>
          </div>

          {uploadLink && (
            <div className="mx-auto mt-6 max-w-xl sm:mt-8 md:mt-10">
              <ContentCard>
                <p
                  className={`${cinzel.className} ${ct.label} w-full rounded-full border border-motif-deep/30 bg-motif-deep/10 px-3 py-1.5 text-center uppercase leading-snug tracking-[0.14em] sm:tracking-[0.18em] break-words`}
                  style={{ color: palette.label }}
                >
                  Upload Your Photos &amp; Videos
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} break-words text-center`}
                  style={{ color: palette.body }}
                >
                  {siteConfig.snapShare.instructions}
                </p>
                <div className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-xl border border-motif-deep/15 bg-white p-3 shadow-sm sm:p-4">
                  <div className="flex w-full max-w-full justify-center overflow-visible">
                    <QRCodeCanvas
                      id="album-qr"
                      value={uploadLink}
                      size={isMobile ? 160 : 200}
                      level="H"
                      includeMargin
                      className="h-auto max-w-full bg-white"
                      fgColor={QR_FG}
                    />
                  </div>
                  <p
                    className={`font-goudy-italic ${ct.body} mt-2 text-center sm:mt-3`}
                    style={{ color: palette.label }}
                  >
                    Scan with your camera app
                  </p>
                </div>
                <div className="mx-auto flex items-center justify-center pt-1 sm:pt-2">
                  <InsideDivider />
                </div>
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <PrimaryButton onClick={copyUploadLink} active={copiedDriveLink}>
                    {copiedDriveLink ? (
                      <Check className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    )}
                    {copiedDriveLink ? "Copied!" : "Copy Link"}
                  </PrimaryButton>
                  <PrimaryButton onClick={downloadAlbumQRCode}>
                    <Download className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Download QR
                  </PrimaryButton>
                  <a
                    href={uploadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cinzel.className} group relative inline-flex items-center justify-center gap-1.5 rounded-sm border px-5 py-2.5 font-semibold uppercase tracking-[0.18em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:px-6 sm:py-3 sm:tracking-[0.2em] md:tracking-[0.24em] ${ct.btn}`}
                    style={{
                      backgroundColor: "var(--color-welcome-bg)",
                      borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                      color: palette.heading,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "color-mix(in srgb, var(--color-welcome-green) 12%, white)"
                      e.currentTarget.style.borderColor = "var(--color-welcome-green)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-welcome-bg)"
                      e.currentTarget.style.borderColor =
                        "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
                    }}
                  >
                    <Share2 className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                    Upload Photos
                  </a>
                </div>
              </ContentCard>
            </div>
          )}

          <div className="mt-6 space-y-2 text-center sm:mt-8 md:mt-10">
            <p
              className={`font-goudy-italic ${ct.bodyLg}`}
              style={{ color: sectionText.body }}
            >
              Thank you for helping make {coupleDisplayName}&apos;s wedding celebration memorable.
              Your photos and messages create beautiful memories we will treasure for a lifetime.
            </p>
            <p
              className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] sm:tracking-[0.2em]`}
              style={{ color: sectionText.heading }}
            >
              Thank you for sharing the joy
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
