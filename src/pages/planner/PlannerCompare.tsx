
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, X, Building2, TreePine } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import DemoDataNotice from "@/components/planner/DemoDataNotice";
import AvailabilityBadge from "@/components/planner/AvailabilityBadge";
import ContactOmSai from "@/components/planner/ContactOmSai";
import type { EventPackage } from "@/data/packages/types";
import { fetchPackages } from "@/services/packageApi";
import { countMenuItems } from "@/lib/planner";

const TIMING_LABEL: Record<string, string> = {
  day: "Day",
  night: "Night",
  flexible: "Flexible",
};

type Row = {
  label: string;
  render: (pkg: EventPackage) => ReactNode;
};

const ROWS: Row[] = [
  {
    label: "Venue",
    render: (pkg) => (
      <span className="flex items-center gap-1.5">
        {pkg.venue === "OM SAI BANQUET HALL" ? (
          <Building2 size={14} className="text-gold" />
        ) : (
          <TreePine size={14} className="text-gold" />
        )}
        {pkg.venue === "OM SAI BANQUET HALL" ? "Banquet Hall" : "Lawns"}
      </span>
    ),
  },
  { label: "Event Types", render: (pkg) => pkg.eventTypes.join(", ") },
  {
    label: "Capacity",
    render: (pkg) => `Up to ${pkg.capacity.toLocaleString("en-IN")}`,
  },
  {
    label: "Price",
    render: (pkg) => `₹${pkg.price.toLocaleString("en-IN")}`,
  },
  {
    label: "Timing",
    render: (pkg) => pkg.timing.map((t) => TIMING_LABEL[t]).join(" / "),
  },
  {
    label: "Decoration",
    render: (pkg) => {
      const included = [
        pkg.decoration.haldiSetup.included && "Haldi",
        pkg.decoration.vidhiSetup.included && "Vidhi",
        pkg.decoration.mainStageSetup.included && "Main Stage",
        pkg.decoration.varmalaSetup.included && "Varmala",
        pkg.decoration.entrySetup.included && "Entry",
      ].filter(Boolean);

      return included.length > 0 ? included.join(", ") : "None";
    },
  },
  {
    label: "Catering Menu Items",
    render: (pkg) => `${countMenuItems(pkg.catering)} items`,
  },
  {
    label: "Dhol Tasha",
    render: (pkg) => (
      <AvailabilityBadge value={pkg.entertainment.dholTasha} />
    ),
  },
  {
    label: "Ghoda",
    render: (pkg) => <AvailabilityBadge value={pkg.entertainment.ghoda} />,
  },
  {
    label: "Kaka Service",
    render: (pkg) => (
      <AvailabilityBadge value={pkg.entertainment.kakaService} />
    ),
  },
  {
    label: "Sound",
    render: (pkg) => (
      <AvailabilityBadge value={pkg.entertainment.sound.included} />
    ),
  },
  {
    label: "Lighting",
    render: (pkg) => (
      <AvailabilityBadge value={pkg.entertainment.lighting.included} />
    ),
  },
  {
    label: "LED Screen / Wall",
    render: (pkg) => (
      <AvailabilityBadge value={pkg.entertainment.ledScreenOrWall} />
    ),
  },
  { label: "Waiters", render: (pkg) => String(pkg.services.waiters) },
  {
    label: "Water Bottles",
    render: (pkg) => String(pkg.services.waterBottles),
  },
  {
    label: "Other Facilities",
    render: (pkg) =>
      pkg.otherFacilities.length > 0
        ? pkg.otherFacilities.join(", ")
        : "—",
  },
];

const PlannerCompare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const ids = useMemo(
    () =>
      (searchParams.get("ids")?.split(",").filter(Boolean) ?? []).slice(0, 4),
    [searchParams],
  );

  const [allPackages, setAllPackages] = useState<EventPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [packageError, setPackageError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadPackages = async () => {
      try {
        setIsLoading(true);
        setPackageError("");

        const data = await fetchPackages();

        if (!cancelled) {
          setAllPackages(data);
        }
      } catch (error) {
        if (!cancelled) {
          setPackageError(
            error instanceof Error
              ? error.message
              : "Unable to load packages. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadPackages();

    return () => {
      cancelled = true;
    };
  }, []);

  const packages = useMemo(
    () =>
      ids
        .map((id) =>
          allPackages.find(
            (pkg) => pkg.id === id || pkg.packageNumber === id,
          ),
        )
        .filter((pkg): pkg is EventPackage => Boolean(pkg)),
    [ids, allPackages],
  );

  const removePackage = (id: string) => {
    const remaining = ids.filter((i) => i !== id);

    if (remaining.length === 0) {
      navigate("/planner/results");
    } else {
      setSearchParams({ ids: remaining.join(",") });
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md glass-card p-10">
            <h1 className="font-display text-2xl font-bold mb-2">
              Loading packages...
            </h1>
            <p className="text-muted-foreground">
              Please wait while we retrieve your comparison data.
            </p>
          </div>
        </section>
      </PageWrapper>
    );
  }

  if (packageError) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md glass-card p-10">
            <h1 className="font-display text-2xl font-bold mb-2">
              Unable to load packages
            </h1>
            <p className="text-muted-foreground mb-6">{packageError}</p>
            <Link
              to="/planner/results"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
            >
              <ArrowLeft size={16} /> Back to results
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  if (packages.length === 0) {
    return (
      <PageWrapper>
        <section className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md glass-card p-10">
            <h1 className="font-display text-2xl font-bold mb-2">
              Nothing to compare yet
            </h1>
            <p className="text-muted-foreground mb-6">
              Go back to your recommendations and select 2–4 packages using
              "Add to compare".
            </p>
            <Link
              to="/planner/results"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
            >
              <ArrowLeft size={16} /> Back to results
            </Link>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/planner/results"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to results
          </Link>

          <div className="text-center mb-6">
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
              OM SAI BANQUET &amp; LAWNS
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              Compare Packages
            </h1>
          </div>

          {packages.some((pkg) => pkg.isDemoData) && (
  <div className="mb-8">
    <DemoDataNotice />
  </div>
)}
{packages.length < ids.length && (
  <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
    <p className="text-sm text-amber-700">
      Some selected packages are no longer available. Your comparison
      shows only the packages currently available.
    </p>
  </div>
)}
          <div className="glass-card overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground sticky left-0 bg-card z-10 w-40">
                    &nbsp;
                  </th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className="p-4 text-left align-top min-w-[220px]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display font-bold">{pkg.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Package {pkg.packageNumber}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePackage(pkg.id)}
                          aria-label={`Remove ${pkg.name} from comparison`}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-muted/20" : ""}
                  >
                    <td className="p-4 text-sm font-medium text-muted-foreground sticky left-0 bg-inherit z-10 w-40">
                      {row.label}
                    </td>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-4 text-sm">
                        {row.render(pkg)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td className="p-4 sticky left-0 bg-card z-10 w-40">
                    &nbsp;
                  </td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="p-4">
                      <Link
                        to={`/planner/package/${pkg.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold gold-gradient text-primary-foreground glow-hover"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <ContactOmSai title="Ready to book your venue?" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PlannerCompare;