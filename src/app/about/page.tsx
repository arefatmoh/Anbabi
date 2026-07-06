import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";
import { getAboutContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Read & Revive turns books into reading cycles, reflection, community discussion, and youth voices.",
  alternates: { canonical: "/about" },
};

export default async function AboutRoute() {
  const content = await getAboutContent();
  return <AboutPage {...content} />;
}
