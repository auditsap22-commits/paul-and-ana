"use client"

import { useEffect, useRef } from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Music2 } from "lucide-react"
import {
  sectionBackground,
  sectionDividerLineStyle,
  sectionDividerLineStyleLeft,
  sectionText,
} from "@/lib/section-background"

interface SpotifyPlaybackUpdate {
  playingURI: string
  isPaused: boolean
  isBuffering: boolean
  duration: number
  position: number
}

interface SpotifyEmbedController {
  addListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  removeListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  destroy: () => void
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIframeApi) => void
  }
}

let cachedSpotifyIframeApi: SpotifyIframeApi | null = null
const spotifyApiReadyQueue: Array<(api: SpotifyIframeApi) => void> = []

function getSpotifyUri(spotifyUrl: string): string {
  const match = spotifyUrl.match(
    /open\.spotify\.com\/(playlist|album|track|episode)\/([^/?]+)/
  )
  if (!match) return spotifyUrl
  return `spotify:${match[1]}:${match[2]}`
}

function loadSpotifyIframeApi(onReady: (api: SpotifyIframeApi) => void) {
  if (cachedSpotifyIframeApi) {
    onReady(cachedSpotifyIframeApi)
    return
  }

  spotifyApiReadyQueue.push(onReady)

  if (spotifyApiReadyQueue.length > 1) return

  const previousReady = window.onSpotifyIframeApiReady
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    cachedSpotifyIframeApi = IFrameAPI
    previousReady?.(IFrameAPI)
    spotifyApiReadyQueue.splice(0).forEach((callback) => callback(IFrameAPI))
  }

  const existingScript = document.querySelector(
    'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
  )
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://open.spotify.com/embed/iframe-api/v1"
    script.async = true
    document.body.appendChild(script)
  }
}

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
  heading: sectionText.heading,
} as const

const outsideDividerLineStyle = sectionDividerLineStyle

const ct = {
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  btn: "text-[0.625rem] sm:text-[0.6875rem] md:text-xs",
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span className="h-px w-6 sm:w-10" style={sectionDividerLineStyleLeft} />
    </div>
  )
}

function PlaylistTitle({ title, script }: { title: string; script: string }) {
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
          color: sectionText.title,
        }}
      >
        {title}
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: sectionText.script,
        }}
      >
        {script}
      </span>
      <span className="sr-only">{script}</span>
    </h2>
  )
}

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, spotifyUrl } = siteConfig.playlist
  const spotifyUri = getSpotifyUri(spotifyUrl)
  const embedContainerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const playbackStateRef = useRef<"playing" | "paused">("paused")
  const { pauseMusic, resumeMusic } = useAudio()

  useEffect(() => {
    const container = embedContainerRef.current
    if (!container) return

    let mounted = true

    const handlePlaybackStateChange = (isPlaying: boolean) => {
      if (isPlaying && playbackStateRef.current !== "playing") {
        playbackStateRef.current = "playing"
        pauseMusic()
      } else if (!isPlaying && playbackStateRef.current === "playing") {
        playbackStateRef.current = "paused"
        resumeMusic()
      }
    }

    const initController = (IFrameAPI: SpotifyIframeApi) => {
      if (!mounted || !embedContainerRef.current) return

      IFrameAPI.createController(
        embedContainerRef.current,
        {
          uri: spotifyUri,
          width: "100%",
          height: "352",
        },
        (EmbedController) => {
          if (!mounted) return

          controllerRef.current = EmbedController

          const handlePlaybackUpdate = (event: { data: SpotifyPlaybackUpdate }) => {
            handlePlaybackStateChange(!event.data.isPaused)
          }

          const handlePlaybackStarted = () => {
            handlePlaybackStateChange(true)
          }

          EmbedController.addListener("playback_update", handlePlaybackUpdate)
          EmbedController.addListener("playback_started", handlePlaybackStarted)
        }
      )
    }

    loadSpotifyIframeApi(initController)

    return () => {
      mounted = false
      if (playbackStateRef.current === "playing") {
        resumeMusic()
      }
      playbackStateRef.current = "paused"
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [pauseMusic, resumeMusic, spotifyUri])

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
    <section
      id="playlist"
      className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-20 mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        {/* Header — outside container, white on silk */}
        <div className="relative z-20 px-6 text-center sm:px-10 md:px-12">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <PlaylistTitle title={title} script={playlistName} />
          </div>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mx-auto mt-4 max-w-lg leading-relaxed px-2 sm:mt-5 md:mt-6`}
            style={{ color: sectionText.body }}
          >
            {subtitle}
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-motif-deep/35" />
          </div>
        </div>

        {/* Playlist card */}
        <div
          className="relative mt-6 overflow-hidden rounded-xl border backdrop-blur-xl sm:mt-8 sm:rounded-2xl sm:backdrop-blur-2xl md:mt-10"
          style={cardStyle}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
            aria-hidden
          />

          <div className="relative z-20 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            <p
              className={`${cinzel.className} mb-4 text-center text-[0.625rem] font-semibold uppercase tracking-[0.2em] sm:mb-5 sm:text-[0.6875rem] sm:tracking-[0.24em] md:text-xs`}
              style={{ color: palette.heading }}
            >
              {playlistName}
            </p>

            <div
              ref={embedContainerRef}
              title={`${playlistName} — Spotify playlist`}
              className="w-full min-h-[232px] overflow-hidden rounded-xl md:min-h-[352px] [&_iframe]:border-0"
            />

            <div className="mt-5 flex justify-center sm:mt-6">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} group relative inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-2.5 font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:tracking-[0.24em] md:px-10 md:py-3.5 md:tracking-[0.28em] ${ct.btn}`}
                style={{
                  backgroundColor: "var(--color-welcome-green)",
                  borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                  color: "var(--color-welcome-bg)",
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
              >
                <Music2 className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="relative z-10">Open in Spotify</span>
                <div
                  className="absolute inset-0 -z-0 rounded-sm opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
                  style={{ backgroundColor: "var(--color-motif-deep)" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
