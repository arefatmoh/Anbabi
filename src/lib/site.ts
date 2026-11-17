const deploymentOrigin =
  process.env.VERCEL_ENV === "production"
    ? "https://www.anbabi.org"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || deploymentOrigin,
).origin;

export const siteConfig = {
  name: "Read & Revive / አንባቢ",
  shortName: "Read & Revive",
  description:
    "A warm reading circle for young people in Ethiopia to read together, reflect deeply, discuss ideas, and grow their voices.",
  telegramUrl: "https://t.me/ReadRevive",
  siteUrl,
} as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Current Cycle", href: "/current-cycle" },
  { label: "Books", href: "/books" },
  { label: "Community", href: "/community" },
  { label: "Voices", href: "/voices" },
] as const;

export const footerNavigation = [
  ...primaryNavigation.slice(1),
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
