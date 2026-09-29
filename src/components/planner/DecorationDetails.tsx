import type { PackageDecoration, DecorationSetupDetail } from "@/data/packages/types";
import AvailabilityBadge from "./AvailabilityBadge";

const SETUP_KEYS = ["haldiSetup", "vidhiSetup", "mainStageSetup", "varmalaSetup", "entrySetup"] as const;

const SETUPS: Array<{ key: (typeof SETUP_KEYS)[number]; label: string }> = [
  { key: "haldiSetup", label: "Haldi Setup" },
  { key: "vidhiSetup", label: "Vidhi Setup" },
  { key: "mainStageSetup", label: "Main Stage Setup" },
  { key: "varmalaSetup", label: "Varmala Setup" },
  { key: "entrySetup", label: "Entry Setup" },
];

const SetupCard = ({ label, setup }: { label: string; setup: DecorationSetupDetail }) => (
  <div className="rounded-xl border border-border overflow-hidden bg-background/50">
    <div className="aspect-video bg-muted overflow-hidden">
      <img src={setup.images[0]?.src} alt={setup.images[0]?.alt ?? label} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="font-semibold text-sm">{label}</h4>
        <AvailabilityBadge value={setup.included} />
      </div>
      <p className="text-xs text-muted-foreground">{setup.name}</p>
      <p className="text-xs text-muted-foreground mt-1">{setup.description}</p>
    </div>
  </div>
);

const DecorationDetails = ({ decoration }: { decoration: PackageDecoration }) => (
  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SETUPS.map(({ key, label }) => (
        <SetupCard key={key} label={label} setup={decoration[key]} />
      ))}
    </div>
    {(decoration.themeTags.length > 0 || decoration.otherDecorationItems.length > 0) && (
      <div className="flex flex-wrap gap-2 mt-4">
        {decoration.themeTags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
            {tag}
          </span>
        ))}
        {decoration.otherDecorationItems.map((item) => (
          <span key={item} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
            {item}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default DecorationDetails;
