import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";
import { getContactContent } from "@/lib/content/repository";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Choose the right path for Read & Revive questions, book suggestions, article interest, volunteer support, or partnerships.",
  alternates: { canonical: "/contact" },
};

export default async function ContactRoute() {
  const content = await getContactContent();
  return <ContactPage {...content} />;
}
