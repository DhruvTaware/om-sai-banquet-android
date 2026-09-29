import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const OptionCard = ({ label, description, icon, selected, onClick, className }: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative text-left w-full rounded-xl border p-4 sm:p-5 transition-all duration-300",
        "bg-background/50 hover:border-gold/60",
        selected ? "border-gold shadow-[0_0_0_1px_hsl(38_70%_50%)] bg-gold/5" : "border-border",
        className,
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full gold-gradient">
          <Check size={12} className="text-primary-foreground" />
        </span>
      )}
      <div className="flex items-start gap-3">
        {icon && <div className="text-gold shrink-0 mt-0.5">{icon}</div>}
        <div>
          <p className="font-medium text-foreground text-sm sm:text-base">{label}</p>
          {description && <p className="text-muted-foreground text-xs sm:text-sm mt-1">{description}</p>}
        </div>
      </div>
    </button>
  );
};

export default OptionCard;
