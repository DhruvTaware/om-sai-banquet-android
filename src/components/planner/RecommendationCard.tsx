import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, TreePine, Users, Clock3, IndianRupee, Check, ArrowRight, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AvailabilityBadge from "./AvailabilityBadge";
import type { PackageRecommendation } from "@/lib/planner";

const TIMING_LABEL: Record<string, string> = {
  day: "Day",
  night: "Night",
  flexible: "Flexible",
};

const MEDALS = ["🥇", "🥈", "🥉"];

const RecommendationCard = ({
  rec,
  rank,
  compareSelected,
  onToggleCompare,
  compareDisabled,
  delay = 0,
}: {
  rec: PackageRecommendation;
  rank: number;
  compareSelected: boolean;
  onToggleCompare: () => void;
  compareDisabled: boolean;
  delay?: number;
}) => {
  const navigate = useNavigate();
  const pkg = rec.package;
  const VenueIcon = pkg.venue === "OM SAI BANQUET HALL" ? Building2 : TreePine;

  const decorationHighlights = [
    pkg.decoration.haldiSetup.included && "Haldi Setup",
    pkg.decoration.mainStageSetup.included && "Main Stage",
    pkg.decoration.varmalaSetup.included && "Varmala Setup",
  ].filter(Boolean) as string[];

  const cateringHighlights = [
    pkg.catering.morningBreakfast.length > 0 && "Breakfast",
    pkg.catering.lunch.rice.length > 0 && "Lunch",
    pkg.catering.dinner.rice.length > 0 && "Dinner",
  ].filter(Boolean) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3">
          {rank < 3 && <span className="text-2xl">{MEDALS[rank]}</span>}
          <div>
            <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
            <p className="text-muted-foreground text-sm">Package {pkg.packageNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold gold-text">{rec.score}% Match</span>
        </div>
      </div>

      {rec.mismatchWarnings.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-5">
          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
          <span>{rec.mismatchWarnings.join(" ")}</span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <VenueIcon size={16} className="text-gold shrink-0" />
          {pkg.venue === "OM SAI BANQUET HALL" ? "Banquet Hall" : "Lawns"}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users size={16} className="text-gold shrink-0" />
          Up to {pkg.capacity.toLocaleString("en-IN")}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock3 size={16} className="text-gold shrink-0" />
          {pkg.timing.map((t) => TIMING_LABEL[t]).join(" / ")}
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <IndianRupee size={16} className="text-gold shrink-0" />
          {pkg.price.toLocaleString("en-IN")}
        </div>
      </div>

      {rec.estimatedCostPerGuest !== null && (
        <p className="text-xs text-muted-foreground mb-5">
          Estimated cost per guest: <span className="font-medium text-foreground">₹{rec.estimatedCostPerGuest.toLocaleString("en-IN")}</span>
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {decorationHighlights.map((inc) => (
          <span key={inc} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
            {inc}
          </span>
        ))}
        {cateringHighlights.map((inc) => (
          <span key={inc} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
            {inc}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
  <span className="text-xs text-muted-foreground mr-1 self-center">
    Dhol Tasha:
  </span>
  <AvailabilityBadge value={pkg.entertainment.dholTasha} />

  <span className="text-xs text-muted-foreground mr-1 ml-2 self-center">
    Ghoda:
  </span>
  <AvailabilityBadge value={pkg.entertainment.ghoda} />

  <span className="text-xs text-muted-foreground mr-1 ml-2 self-center">
    Bhraman:
  </span>
  <AvailabilityBadge value={pkg.entertainment.bhraman} />

  <span className="text-xs text-muted-foreground mr-1 ml-2 self-center">
    Sound:
  </span>
  <AvailabilityBadge value={pkg.entertainment.sound.included} />

  <span className="text-xs text-muted-foreground mr-1 ml-2 self-center">
    Lighting:
  </span>
  <AvailabilityBadge value={pkg.entertainment.lighting.included} />
</div>

      {rec.reasons.length > 0 && (
        <details className="mb-5 group">
          <summary className="cursor-pointer text-sm font-medium text-gold hover:text-gold-dark transition-colors list-none">
            Why this package?
          </summary>
          <ul className="mt-3 space-y-1.5">
            {rec.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check size={14} className="text-gold mt-0.5 shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-border/50">
        <label className={`flex items-center gap-2 text-sm ${compareDisabled && !compareSelected ? "opacity-40" : "cursor-pointer"}`}>
          <Checkbox checked={compareSelected} onCheckedChange={onToggleCompare} disabled={compareDisabled && !compareSelected} />
          Add to compare
        </label>
        <button
          type="button"
          onClick={() => navigate(`/planner/package/${pkg.id}`)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold gold-gradient text-primary-foreground glow-hover"
        >
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
