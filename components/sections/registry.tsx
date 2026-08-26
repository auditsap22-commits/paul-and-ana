"use client"

import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import {
  sectionBackground,
  sectionDividerLineStyle,
  sectionDividerLineStyleLeft,
  sectionText,
} from "@/lib/section-background"

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

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
} as const

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={sectionDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span className="h-px w-6 sm:w-10" style={sectionDividerLineStyleLeft} />
    </div>
  )
}

function RegistryTitle() {
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
        Gift Guide
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] mt-2 sm:mt-2.5 md:mt-3`}
        style={{
          fontSize: "var(--script-size)",
          color: sectionText.script,
        }}
      >
        With gratitude
      </span>
      <span className="sr-only">With gratitude</span>
    </h2>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: sectionBackground }}
    >
      <section
        id="registry"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <div className="relative z-20 mx-auto max-w-3xl px-4 @container/registry sm:px-6 md:px-8">
          <div className="relative z-20 px-6 text-center sm:px-10 md:px-12">
            <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
              <SectionDivider />
            </div>
            <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
              <RegistryTitle />
            </div>
            <div
              className={`font-goudy-italic mx-auto mt-4 max-w-2xl space-y-3 px-2 sm:mt-5 md:mt-6 ${ct.bodyLg}`}
              style={{ color: sectionText.body }}
            >
              <p>
                If you were thinking of giving a gift to help us on our way, a gift of cash towards our
                house would really make our day.
              </p>
              <p>
                However, if you prefer to purchase a gift, feel free to surprise us in your own way.
              </p>
            </div>
            <div className="flex items-center justify-center pt-3 sm:pt-4">
              <span className="h-px w-16 sm:w-24 md:w-32 bg-motif-deep/35" />
            </div>
          </div>

          <div className="mt-6 space-y-2 text-center sm:mt-8">
            <p className={`font-goudy-italic ${ct.body}`} style={{ color: sectionText.body }}>
              Thank you from the bottom of our hearts.
            </p>
            <p className={`font-goudy-italic ${ct.body} italic`} style={{ color: sectionText.body }}>
              With love,
              <br />
              {groomNickname} and {brideNickname}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
