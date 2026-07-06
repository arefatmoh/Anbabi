import { redirect } from "next/navigation";

import { getCurrentCycleContent } from "@/lib/content/repository";

export default async function CurrentCycleShortcut() {
  const { currentCycle } = await getCurrentCycleContent();

  redirect(`/cycles/${currentCycle.slug}`);
}
