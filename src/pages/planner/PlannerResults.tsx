import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, TreePine, Users, IndianRupee, Clock3, Info } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import DemoDataNotice from "@/components/planner/DemoDataNotice";
import RecommendationCard from "@/components/planner/RecommendationCard";
import PlannerQuestions from "@/components/planner/PlannerQuestions";
import ContactOmSai from "@/components/planner/ContactOmSai";
import { DEFAULT_PLANNER_REQUIREMENTS, PLANNER_STORAGE_KEY, type PlannerRequirements } from "@/types/planner";
import { fetchPackages } from "@/services/packageApi";
import { getRecommendations } from "@/lib/planner";
import type { EventPackage } from "@/data/packages/types";
const VENUE_LABEL: Record<string, string> = {
  banquet: "Banquet Hall",
  lawns: "Lawns",
  recommend: "Either venue",
};

const DAYNIGHT_LABEL: Record<string, string> = {
  day: "Day",
  night: "Night",
  flexible: "Flexible",
};

const PlannerResults = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState<PlannerRequirements>(DEFAULT_PLANNER_REQUIREMENTS);
const [hasRequirements, setHasRequirements] = useState(true);
const [compareSelection, setCompareSelection] = useState<string[]>([]);

const [packages, setPackages] = useState<EventPackage[]>([]);
const [isLoadingPackages, setIsLoadingPackages] = useState(true);
const [packageError, setPackageError] = useState<string | null>(null);

  useEffect(() => {
  try {
    const stored = sessionStorage.getItem(PLANNER_STORAGE_KEY);

    if (stored) {
      setRequirements(JSON.parse(stored));
    } else {
      setHasRequirements(false);
    }
  } catch {
    setHasRequirements(false);
  }
}, []);

// Load packages from MongoDB through the backend API
useEffect(() => {
  let cancelled = false;

  const loadPackages = async () => {
    try {
      setIsLoadingPackages(true);
      setPackageError(null);

      const data = await fetchPackages();

      if (!cancelled) {
        setPackages(data);
      }
    } catch (error) {
      console.error("Failed to load packages:", error);

      if (!cancelled) {
        setPackageError(
          "Unable to load packages right now. Please try again."
        );
      }
    } finally {
      if (!cancelled) {
        setIsLoadingPackages(false);
      }
    }
  };

  loadPackages();

  return () => {
    cancelled = true;
  };
}, []);

const { recommendations, isFallback, noStrictMatches } = useMemo(
  () => getRecommendations(requirements, packages),
  [requirements, packages],
);

  const toggleCompare = (id: string) => {
    setCompareSelection((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 4 ? [...prev, id] : prev,
    );
  };

  if (!hasRequirements) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl font-bold mb-3">Let's start with your requirements</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find any event requirements yet. Start the AI Planner to get personalized package
              recommendations.
            </p>
            <Link
              to="/planner/start"
              className="inline-flex items-center gap-2 gold-gradient px-6 py-3 rounded-xl font-semibold text-primary-foreground glow-hover"
            >
              Start Planning <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">Smart Package Recommendation</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              Recommended Packages <span className="gold-text">For You</span>
            </h1>
          </div>

          {/* Requirements summary */}
          <div className="glass-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {requirements.eventType && <span className="font-medium">{requirements.eventType}</span>}
            {requirements.guests !== "" && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Users size={14} className="text-gold" /> {Number(requirements.guests).toLocaleString("en-IN")} Guests
              </span>
            )}
            {requirements.venue && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                {requirements.venue === "lawns" ? <TreePine size={14} className="text-gold" /> : <Building2 size={14} className="text-gold" />}
                {VENUE_LABEL[requirements.venue]}
              </span>
            )}
            {requirements.dayNight && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock3 size={14} className="text-gold" /> {DAYNIGHT_LABEL[requirements.dayNight]}
              </span>
            )}
            {requirements.budget !== "" && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <IndianRupee size={14} className="text-gold" /> Budget ₹{Number(requirements.budget).toLocaleString("en-IN")}
              </span>
            )}
          </div>

         {packages.some((pkg) => pkg.isDemoData) && (
  <div className="mb-8">
    <DemoDataNotice />
  </div>
)}

          {isFallback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-4"
            >
              <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-500 font-medium mb-1">
                <Info size={16} />
                {noStrictMatches
                  ? "No package matches all your requirements exactly."
                  : "Showing your best available matches."}
              </div>
              <p className="text-xs text-muted-foreground">
                Closest alternatives are shown below — each card explains exactly which requirement it doesn't meet.
              </p>
            </motion.div>
          )}

          
{isLoadingPackages ? (
  <div className="text-center glass-card p-10">
    <p className="text-muted-foreground">
      Loading packages from OM SAI...
    </p>
  </div>
) : packageError ? (
  <div className="text-center glass-card p-10">
    <p className="text-destructive font-medium">
      {packageError}
    </p>
    <p className="text-sm text-muted-foreground mt-2">
      Please check your connection or contact OM SAI for assistance.
    </p>
  </div>
) : recommendations.length === 0 ? (
  <div className="text-center glass-card p-10">
    <p className="text-muted-foreground">
      No packages are currently available for your requirements.
    </p>
  </div>
) : (
  <div className="space-y-6">
    {recommendations.map((rec, i) => (
      <RecommendationCard
        key={rec.package.id}
        rec={rec}
        rank={i}
        compareSelected={compareSelection.includes(rec.package.id)}
        compareDisabled={compareSelection.length >= 4}
        onToggleCompare={() => toggleCompare(rec.package.id)}
        delay={i * 0.08}
      />
    ))}
  </div>
)}

          {compareSelection.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky bottom-4 mt-8 glass-card p-4 flex items-center justify-between gap-4"
            >
              <span className="text-sm font-medium">{compareSelection.length} packages selected</span>
              <button
                type="button"
                onClick={() => navigate(`/planner/compare?ids=${compareSelection.join(",")}`)}
                className="px-5 py-2 rounded-lg text-sm font-semibold gold-gradient text-primary-foreground glow-hover"
              >
                Compare Now
              </button>
            </motion.div>
          )}

          {recommendations.length > 0 && (
            <div className="mt-10">
              <PlannerQuestions recommendations={recommendations} requirements={requirements} />
            </div>
          )}

          <div className="mt-10">
            <ContactOmSai />
          </div>

          <div className="text-center mt-10">
            <Link to="/planner/start" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              ← Adjust my requirements
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PlannerResults;
