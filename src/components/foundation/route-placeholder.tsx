import { EmptyState } from "@/components/ui/empty-state";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type RoutePlaceholderProps = {
  title: string;
  description: string;
};

export function RoutePlaceholder({
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <Section className="min-h-[60vh]">
      <Container>
        <EmptyState title={title} description={description} />
      </Container>
    </Section>
  );
}
