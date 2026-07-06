import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy/policy-page";
import { getCommunityGuidelinesContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description:
    "Community expectations for respectful discussion, privacy, consent, moderation, and recognition in Read & Revive.",
  alternates: { canonical: "/community-guidelines" },
};

export default async function CommunityGuidelinesRoute() {
  const content = await getCommunityGuidelinesContent();
  return <PolicyPage content={content} />;
}
