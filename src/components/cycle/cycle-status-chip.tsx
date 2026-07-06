import { Chip } from "@/components/ui/chip";
import type { CycleStatus } from "@/lib/content-types";

const labels: Record<CycleStatus, string> = {
  draft: "Draft",
  upcoming: "Upcoming",
  active: "Active now",
  closing: "Closing",
  completed: "Completed",
  archived: "Archived",
};

export function CycleStatusChip({
  status,
  label,
}: {
  status: CycleStatus;
  label?: string;
}) {
  return (
    <Chip
      tone={
        status === "active"
          ? "success"
          : status === "draft"
            ? "orange"
            : "paper"
      }
    >
      <span
        aria-hidden="true"
        className="mr-1.5 inline-block size-1.5 rounded-full bg-current"
      />
      {label ?? labels[status]}
    </Chip>
  );
}
