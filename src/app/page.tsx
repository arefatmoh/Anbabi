import { HomePageContent } from "@/components/home/home-page";
import { getHomeContent } from "@/lib/content/repository";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <HomePageContent
      cycle={content.currentCycle}
      voices={content.featuredVoices}
      journey={content.journey}
    />
  );
}
