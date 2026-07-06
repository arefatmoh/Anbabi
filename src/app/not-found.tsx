import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFoundPage() {
  return (
    <Section className="min-h-[60vh]">
      <Container>
        <EmptyState
          title="This page slipped between the bookmarks."
          description="The link may be unfinished or the page may have moved. The reading circle is still waiting at the beginning."
        />
      </Container>
    </Section>
  );
}
