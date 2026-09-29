import { Info } from "lucide-react";

/**
 * Shared "this is demo/development data" disclosure, used on every planner
 * page that shows Phase 2 package data (results, package details, compare).
 * Kept in one place so the wording stays consistent everywhere it appears.
 */
const DemoDataNotice = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 border border-border rounded-lg px-3 py-2.5 ${className}`}
  >
    <Info size={14} className="shrink-0 mt-0.5 text-gold" />
    <span>
      Package details and prices shown here are demo/development data and should be confirmed with OM SAI BANQUET
      &amp; LAWNS.
    </span>
  </div>
);

export default DemoDataNotice;
