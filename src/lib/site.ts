export const siteConfig = {
  name: "Read & Revive / አንባቢ",
  shortName: "Read & Revive",
  description:
    "A warm reading circle for young people in Ethiopia to read together, reflect deeply, discuss ideas, and grow their voices.",
  telegramUrl: "https://t.me/ReadRevive",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
