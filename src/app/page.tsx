import { HomePageContent } from "@/components/home/home-page";
import { getHomeContent } from "@/lib/content/repository";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <HomePageContent
      cycle={content.currentCycle}
      voices={content.featuredVoices}
      journey={content.journey}
      impactStats={content.impactStats}
      programs={content.programs}
    />
  );
}
