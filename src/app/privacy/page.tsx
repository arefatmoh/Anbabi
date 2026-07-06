import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy/policy-page";
import { getPrivacyContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Read & Revive handles public browsing, contact details, community spaces, reader writing, and consent.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyRoute() {
  const content = await getPrivacyContent();
  return <PolicyPage content={content} />;
}
