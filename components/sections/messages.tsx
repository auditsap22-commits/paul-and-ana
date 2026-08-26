"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span className="h-px w-6 sm:w-10" style={sectionDividerLineStyleLeft} />
    </div>
  )
}

function MessagesTitle() {
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
        Love Notes and Prayers
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: sectionText.script,
        }}
      >
        Share your love with us
      </span>
      <span className="sr-only">Share your love with us</span>
    </h2>
  )
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(siteConfig.googleAPI.messageForm, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      })

      toast({
        title: "Message sent",
        description: "Thank you for your kind words.",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()

      setTimeout(() => setIsSubmitted(false), 1000)

      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBorder = (field: string) =>
    focusedField === field
      ? palette.accent
      : "color-mix(in srgb, var(--color-motif-deep) 22%, transparent)"

  const inputClass = (field: string) =>
    `message-form-input w-full rounded-xl border-2 px-3 py-2 ${sectionType.text} shadow-sm transition-all duration-300 placeholder:italic hover:shadow-md focus:shadow-lg sm:px-4 sm:py-2.5 md:py-3 ${
      focusedField === field ? "shadow-lg" : ""
    }`

  return (
    <div className="relative mx-auto w-full max-w-md px-3 sm:px-0">
      <style>{`
        .message-form-input::placeholder,
        .message-form-textarea::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
      `}</style>

      <Card
        className={`relative w-full overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-500 sm:rounded-2xl sm:backdrop-blur-2xl ${
          isFocused ? "scale-[1.01]" : ""
        } ${isSubmitted ? "animate-bounce" : ""}`}
        style={cardStyle}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/35 via-white/8 to-transparent"
          aria-hidden
        />

        {isSubmitted && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ backgroundColor: "var(--color-welcome-bg-soft)" }}
          >
            <p
              className={`${cinzel.className} font-semibold ${sectionType.subheader}`}
              style={{ color: palette.heading }}
            >
              Sent!
            </p>
          </div>
        )}

        <CardContent className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="mb-4 text-center sm:mb-5 md:mb-6">
            <h3
              className={`${cinzel.className} ${sectionType.subheader} mb-1.5 font-semibold`}
              style={{ color: palette.heading }}
            >
              Share Your Love
            </h3>
            <p className={`font-goudy-italic ${sectionType.text}`} style={{ color: palette.body }}>
              Leave a note for {coupleDisplayName} to read and keep.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-1.5 sm:space-y-2">
              <label
                className={`${cinzel.className} ${sectionType.text} font-medium`}
                style={{ color: palette.label }}
              >
                Your Name
              </label>
              <Input
                name="name"
                required
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full name"
                className={inputClass("name")}
                style={{
                  color: palette.body,
                  backgroundColor: "white",
                  borderColor: inputBorder("name"),
                }}
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  className={`${cinzel.className} ${sectionType.text} font-medium`}
                  style={{ color: palette.label }}
                >
                  Your Message
                </label>
                {messageValue && (
                  <span
                    className={`${sectionType.label} ${messageValue.length > 500 ? "text-red-500" : ""}`}
                    style={messageValue.length <= 500 ? { color: palette.accent } : undefined}
                  >
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <Textarea
                name="message"
                required
                value={messageValue}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setMessageValue(e.target.value)
                  }
                }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder={`Write your wishes, prayer, or kind words for ${coupleDisplayName}...`}
                className={`message-form-textarea ${inputClass("message")} min-h-[90px] resize-none placeholder:leading-relaxed sm:min-h-[110px] md:min-h-[130px]`}
                style={{
                  color: palette.body,
                  backgroundColor: "white",
                  borderColor: inputBorder("message"),
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className={`${cinzel.className} group relative w-full rounded-sm border px-5 py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none sm:py-3 sm:tracking-[0.24em] md:tracking-[0.28em]`}
              style={{
                backgroundColor: "var(--color-welcome-green)",
                borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                color: "var(--color-welcome-bg)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
                  e.currentTarget.style.borderColor = "var(--color-welcome-green)"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch("/api/messages", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setMessages([])
          setLoading(false)
          return
        }
        const parsed = data.filter((m) => m.name || m.message || m.timestamp).reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
    <section
      id="messages"
      className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-3 @container/messages sm:px-4 md:px-6 lg:px-8">
        {/* Header — outside container */}
        <div className="mb-6 text-center sm:mb-8 md:mb-10">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <MessagesTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto mt-4 max-w-2xl px-2 sm:mt-5 md:mt-6 ${sectionType.textRelaxed}`}
            style={{ color: sectionText.body }}
          >
            Share a short note, wish, or prayer for {coupleDisplayName}. Every message becomes part of our story
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-motif-deep/35" />
          </div>
        </div>

        {/* Form container */}
        <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
          <div className="relative w-full max-w-xl">
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Message wall */}
        <div className="relative mx-auto max-w-4xl pb-2 sm:pb-3">
          <div className="mb-4 text-center sm:mb-6 md:mb-8">
            <h3
              className={`${cinzel.className} mb-1.5 font-semibold sm:mb-2 ${sectionType.subheader}`}
              style={{ color: sectionText.heading }}
            >
              Messages from Loved Ones
            </h3>
            <p className={`font-goudy-italic ${sectionType.text}`} style={{ color: sectionText.body }}>
              Warm words from family and friends
            </p>
            <div className="flex items-center justify-center pt-3 sm:pt-4">
              <span className="h-px w-16 sm:w-24 md:w-32 bg-motif-deep/35" />
            </div>
          </div>

          <MessageWallDisplay messages={messages} loading={loading} />
        </div>
      </div>
    </section>
    </div>
  )
}
