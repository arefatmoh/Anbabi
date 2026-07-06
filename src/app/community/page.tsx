import type { Metadata } from "next";

import { CommunityPage } from "@/components/community/community-page";
import { getCommunityContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Understand the Read & Revive weekly rhythm, community spaces, discussion principles, and the path into the current reading circle.",
  alternates: { canonical: "/community" },
};

export default async function CommunityRoute() {
  const content = await getCommunityContent();
  return <CommunityPage {...content} />;
}
