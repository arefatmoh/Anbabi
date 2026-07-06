import type { Metadata } from "next";

import { VoicesListingPage } from "@/components/voices/voices-listing-page";
import { getCurrentCycleContent, getVoices } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Voices from the Circle",
  description:
    "Read reflections, reader stories, and practical ideas shaped by books and conversation in the Read & Revive circle.",
};

export default async function VoicesPage() {
  const [voices, cycleContent] = await Promise.all([
    getVoices(),
    getCurrentCycleContent(),
  ]);

  return (
    <VoicesListingPage
      voices={voices}
      currentCycle={cycleContent.currentCycle}
    />
  );
}
