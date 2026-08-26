export const sectionPalette = {
  forest: "#5d6f47",
  sage: "#949981",
  mustard: "#eec853",
  butter: "#f4dd97",
  cream: "#f7f3e9",
} as const

export const sectionBackground = `
  radial-gradient(920px 520px at 50% 8%, color-mix(in srgb, ${sectionPalette.butter} 35%, transparent) 0%, transparent 55%),
  radial-gradient(640px 420px at 12% 88%, color-mix(in srgb, ${sectionPalette.sage} 16%, transparent) 0%, transparent 58%),
  radial-gradient(560px 380px at 92% 78%, color-mix(in srgb, ${sectionPalette.mustard} 14%, transparent) 0%, transparent 55%),
  linear-gradient(180deg, ${sectionPalette.cream} 0%, #faf7ef 48%, ${sectionPalette.cream} 100%)
`.trim()

export const sectionText = {
  title: "var(--color-welcome-navy)",
  script: "var(--color-welcome-green)",
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

export const sectionDividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

export const sectionDividerLineStyleLeft = {
  background:
    "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const
