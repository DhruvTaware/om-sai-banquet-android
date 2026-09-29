
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  TreePine,
  Users,
  Clock3,
  IndianRupee,
  Check,
} from "lucide-react";

import PageWrapper from "@/components/PageWrapper";
import DemoDataNotice from "@/components/planner/DemoDataNotice";
import DecorationDetails from "@/components/planner/DecorationDetails";
import CateringDetails from "@/components/planner/CateringDetails";
import ServicesDetails from "@/components/planner/ServicesDetails";
import ContactOmSai from "@/components/planner/ContactOmSai";

import type { EventPackage } from "@/data/packages/types";
import { fetchPackageById } from "@/services/packageApi";
import { getRecommendationForPackage } from "@/lib/planner";
import {
  PLANNER_STORAGE_KEY,
  type PlannerRequirements,
} from "@/types/planner";

const TIMING_LABEL: Record<string, string> = {
  day: "Day",
  night: "Night",
  flexible: "Flexible",
};

const PlannerPackageDetails = () => {
  const { id } = useParams();

  const [requirements, setRequirements] =
    useState<PlannerRequirements | null>(null);
  const [pkg, setPkg] = useState<EventPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [packageError, setPackageError] = useState<string | null>(null);

  // Load the customer's saved planner requirements.
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(PLANNER_STORAGE_KEY);

      if (stored) {
        setRequirements(JSON.parse(stored));
      }
    } catch {
      setRequirements(null);
    }
  }, []);

  // Fetch package details from the backend API (MongoDB Atlas).
  useEffect(() => {
    if (!id) {
      setPkg(null);
      setPackageError("No package ID was provided.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setPackageError(null);
    setPkg(null);

    fetchPackageById(id)
      .then((packageData) => {
        if (!cancelled) {
          setPkg(packageData);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setPkg(null);
          setPackageError(
            error instanceof Error
              ? error.message
              : "Unable to load this package."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Calculate recommendation information when requirements are available.
  const recommendation = useMemo(() => {
    if (!pkg || !requirements) return null;

    const hasAnyRequirement =
      requirements.eventType !== "" ||
      requirements.venue !== "" ||
      requirements.guests !== "" ||
      requirements.budget !== "";

    if (!hasAnyRequirement) return null;

    return getRecommendationForPackage(requirements, pkg);
  }, [pkg, requirements]);

  // Loading state.
  if (isLoading) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center glass-card p-10">
            <p className="text-muted-foreground">
              Loading package details...
            </p>
          </div>
        </section>
      </PageWrapper>
    );
  }

  // Package not found or API error.
  if (!pkg) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md glass-card p-10">
            <h1 className="font-display text-2xl font-bold mb-2">
              Package not found
            </h1>

            <p className="text-muted-foreground mb-6">
              {packageError ||
                "We couldn't find a package with that ID. It may have been renamed, or the link may be out of date."}
            </p>

            <Link
              to="/planner/results"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
            >
              <ArrowLeft size={16} />
              Back to results
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  const VenueIcon =
    pkg.venue === "OM SAI BANQUET HALL" ? Building2 : TreePine;

  return (
    <PageWrapper>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/planner/results"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to results
          </Link>

          <div className="text-center mb-6">
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
              OM SAI BANQUET &amp; LAWNS
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              {pkg.name}
            </h1>

            <p className="text-muted-foreground mt-2">
              Package {pkg.packageNumber} — {pkg.description}
            </p>

            {recommendation && (
              <p className="mt-3 font-display text-lg font-bold gold-text">
                {recommendation.score}% Match
              </p>
            )}
          </div>

          {pkg.isDemoData && (
  <div className="mb-8">
    <DemoDataNotice />
  </div>
)}

          {/* Overview */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                  <VenueIcon size={14} className="text-gold" />
                  Venue
                </p>
                <p className="font-medium">
                  {pkg.venue === "OM SAI BANQUET HALL"
                    ? "Banquet Hall"
                    : "Lawns"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                  <Users size={14} className="text-gold" />
                  Capacity
                </p>
                <p className="font-medium">
                  Up to {pkg.capacity.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                  <Clock3 size={14} className="text-gold" />
                  Timing
                </p>
                <p className="font-medium">
                  {pkg.timing.map((t) => TIMING_LABEL[t] ?? t).join(" / ")}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1.5">
                  <IndianRupee size={14} className="text-gold" />
                  Price
                </p>
                <p className="font-medium">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {pkg.eventTypes.map((et) => (
                <span
                  key={et}
                  className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20"
                >
                  {et}
                </span>
              ))}
            </div>

            {recommendation &&
              recommendation.estimatedCostPerGuest !== null && (
                <p className="text-sm text-muted-foreground mt-6">
                  Estimated cost per guest:{" "}
                  <span className="font-semibold text-foreground">
                    ₹
                    {recommendation.estimatedCostPerGuest.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </p>
              )}

            {recommendation && recommendation.reasons.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <h3 className="text-sm font-semibold mb-3">
                  Why it was recommended
                </h3>

                <ul className="space-y-1.5">
                  {recommendation.reasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        size={14}
                        className="text-gold mt-0.5 shrink-0"
                      />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Decoration */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl font-semibold mb-5">
              Decoration
            </h2>
            <DecorationDetails decoration={pkg.decoration} />
          </div>

          {/* Catering */}
          <div className="glass-card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl font-semibold mb-5">
              Catering Menu
            </h2>
            <CateringDetails catering={pkg.catering} />
          </div>

          {/* Services */}
          <div className="glass-card p-6 sm:p-8 mb-10">
            <h2 className="font-display text-xl font-semibold mb-5">
              Services &amp; Facilities
            </h2>

            <ServicesDetails
              entertainment={pkg.entertainment}
              services={pkg.services}
              otherFacilities={pkg.otherFacilities}
            />
          </div>

          <ContactOmSai title={`Interested in ${pkg.name}?`} />
        </div>
      </section>
    </PageWrapper>
  );
};

export default PlannerPackageDetails;