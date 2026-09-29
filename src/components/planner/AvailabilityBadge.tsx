import { Check, X, Circle } from "lucide-react";
import type { ServiceAvailability } from "@/data/packages/types";
import { cn } from "@/lib/utils";

const CONFIG: Record<ServiceAvailability | "yes" | "no", { label: string; className: string; icon: typeof Check }> = {
  included: { label: "Included", className: "bg-green-500/10 text-green-600 border-green-500/20", icon: Check },
  optional: { label: "Optional", className: "bg-gold/10 text-gold-dark border-gold/20", icon: Circle },
  notIncluded: { label: "Not Included", className: "bg-muted text-muted-foreground border-border", icon: X },
  yes: { label: "Included", className: "bg-green-500/10 text-green-600 border-green-500/20", icon: Check },
  no: { label: "Not Included", className: "bg-muted text-muted-foreground border-border", icon: X },
};

/** Small status pill for included / optional / notIncluded (and plain booleans). */
const AvailabilityBadge = ({
  value,
  className,
}: {
  value: ServiceAvailability | boolean;
  className?: string;
}) => {
  const key = typeof value === "boolean" ? (value ? "yes" : "no") : value;
  const { label, className: colorClass, icon: Icon } = CONFIG[key];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap",
        colorClass,
        className,
      )}
    >
      <Icon size={11} />
      {label}
    </span>
  );
};

export default AvailabilityBadge;
