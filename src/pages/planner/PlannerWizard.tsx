import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  TreePine,
  Sparkles,
  Sun,
  Moon,
  Clock3,
  Loader2,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import OptionCard from "@/components/planner/OptionCard";
import WizardProgress from "@/components/planner/WizardProgress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  EVENT_TYPES,
  GENERAL_DECORATION_OPTIONS,
  MARRIAGE_DECORATION_OPTIONS,
  DEFAULT_PLANNER_REQUIREMENTS,
  PLANNER_STORAGE_KEY,
  type PlannerRequirements,
  type DecorationOption,
} from "@/types/planner";

const TOTAL_STEPS = 7;
const MAX_GUESTS = 5000;

const stepLabels = [
  "Event Type",
  "Venue Preference",
  "Event Date",
  "Number of Guests",
  "Budget",
  "Timing",
  "Decoration",
];

const PlannerWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<PlannerRequirements>(DEFAULT_PLANNER_REQUIREMENTS);

  const update = <K extends keyof PlannerRequirements>(key: K, value: PlannerRequirements[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const decorationOptions = data.eventType === "Marriage"
    ? MARRIAGE_DECORATION_OPTIONS
    : GENERAL_DECORATION_OPTIONS;

  const toggleArrayItem = <T extends string>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.eventType !== "";
      case 2:
        return data.venue !== "";
      case 3:
        return data.eventDate !== "";
      case 4:
        return data.guests !== "" && Number(data.guests) > 0;
      case 5:
        return data.budget !== "" && Number(data.budget) > 0;
      case 6:
        return data.dayNight !== "";
      default:
        return true;
    }
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      sessionStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // sessionStorage unavailable — results page will fall back to defaults
    }
    // Brief, honest "processing" moment while we hand off to the matching step.
    setTimeout(() => {
      navigate("/planner/results");
    }, 900);
  };

  return (
    <PageWrapper>
      <section className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">AI Event Planner</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              Tell Us About Your <span className="gold-text">Celebration</span>
            </h1>
          </div>

          <WizardProgress currentStep={step} totalSteps={TOTAL_STEPS} stepLabel={stepLabels[step - 1]} />

          <div className="glass-card p-6 sm:p-10 min-h-[380px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {step === 1 && (
                  <StepBlock title="What are you celebrating?">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {EVENT_TYPES.map((type) => (
                        <OptionCard
                          key={type}
                          label={type}
                          selected={data.eventType === type}
                          onClick={() =>
                            setData((prev) => ({
                              ...prev,
                              eventType: type,
                              decoration: prev.decoration.filter((option) =>
                                (type === "Marriage" ? MARRIAGE_DECORATION_OPTIONS : GENERAL_DECORATION_OPTIONS).includes(option)
                              ),
                            }))
                          }
                        />
                      ))}
                    </div>
                  </StepBlock>
                )}

                {step === 2 && (
                  <StepBlock title="Which venue would you prefer?">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <OptionCard
                        label="OM SAI Banquet Hall"
                        description="Grand indoor venue"
                        icon={<Building2 size={22} />}
                        selected={data.venue === "banquet"}
                        onClick={() => update("venue", "banquet")}
                      />
                      <OptionCard
                        label="OM SAI Lawns"
                        description="Open-air lawn venue"
                        icon={<TreePine size={22} />}
                        selected={data.venue === "lawns"}
                        onClick={() => update("venue", "lawns")}
                      />
                      <OptionCard
                        label="Recommend Best Venue"
                        description="Let us compare both"
                        icon={<Sparkles size={22} />}
                        selected={data.venue === "recommend"}
                        onClick={() => update("venue", "recommend")}
                      />
                    </div>
                  </StepBlock>
                )}

                {step === 3 && (
                  <StepBlock title="When is your event?" subtitle="This helps us check details with you — it does not book or reserve the date.">
                    <Input
                      type="date"
                      value={data.eventDate}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className="max-w-xs"
                    />
                  </StepBlock>
                )}

                {step === 4 && (
                  <StepBlock title="How many guests are you expecting?" subtitle={`Up to ${MAX_GUESTS.toLocaleString("en-IN")} guests`}>
                    <div className="space-y-6">
                      <Input
                        type="number"
                        min={1}
                        max={MAX_GUESTS}
                        placeholder="e.g. 600"
                        value={data.guests}
                        onChange={(e) => {
                          const val = e.target.value === "" ? "" : Math.min(MAX_GUESTS, Math.max(0, Number(e.target.value)));
                          update("guests", val);
                        }}
                        className="max-w-xs text-lg"
                      />
                      <Slider
                        value={[typeof data.guests === "number" ? data.guests : 0]}
                        max={MAX_GUESTS}
                        step={50}
                        onValueChange={([val]) => update("guests", val)}
                      />
                      <div className="flex flex-wrap gap-2">
                        {[200, 500, 1000, 2500, 5000].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => update("guests", preset)}
                            className="px-3 py-1.5 rounded-full text-xs border border-border hover:border-gold hover:text-gold transition-colors"
                          >
                            {preset.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </StepBlock>
                )}

                {step === 5 && (
                  <StepBlock title="What's your approximate budget?" subtitle="We'll search packages around this amount.">
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        min={0}
                        placeholder="e.g. 500000"
                        value={data.budget}
                        onChange={(e) => update("budget", e.target.value === "" ? "" : Number(e.target.value))}
                        className="pl-7 text-lg"
                      />
                    </div>
                    {typeof data.budget === "number" && data.budget > 0 && (
                      <p className="text-sm text-muted-foreground mt-3">
                        Approx. ₹{data.budget.toLocaleString("en-IN")}
                      </p>
                    )}
                  </StepBlock>
                )}

                {step === 6 && (
                  <StepBlock title="Day, night, or flexible?">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <OptionCard
                        label="Day Event"
                        icon={<Sun size={22} />}
                        selected={data.dayNight === "day"}
                        onClick={() => update("dayNight", "day")}
                      />
                      <OptionCard
                        label="Night Event"
                        icon={<Moon size={22} />}
                        selected={data.dayNight === "night"}
                        onClick={() => update("dayNight", "night")}
                      />
                      <OptionCard
                        label="Flexible"
                        icon={<Clock3 size={22} />}
                        selected={data.dayNight === "flexible"}
                        onClick={() => update("dayNight", "flexible")}
                      />
                    </div>
                    <Label htmlFor="preferredTiming" className="text-sm text-muted-foreground">
                      Preferred timing (optional)
                    </Label>
                    <Input
                      id="preferredTiming"
                      placeholder="e.g. 7:00 PM – 11:00 PM"
                      value={data.preferredTiming}
                      onChange={(e) => update("preferredTiming", e.target.value)}
                      className="max-w-xs mt-2"
                    />
                  </StepBlock>
                )}

                {step === 7 && (
                  <StepBlock title="Any decoration requirements?" subtitle="Select all that apply — optional.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {decorationOptions.map((option) => (
                        <CheckOption
                          key={option}
                          id={`deco-${option}`}
                          label={option}
                          checked={data.decoration.includes(option)}
                          onChange={() =>
                            update("decoration", toggleArrayItem<DecorationOption>(data.decoration, option))
                          }
                        />
                      ))}
                    </div>
                  </StepBlock>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold gold-gradient text-primary-foreground glow-hover disabled:opacity-40 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Finding Packages...
                  </>
                ) : step === TOTAL_STEPS ? (
                  <>
                    Find My Packages <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    Next <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const StepBlock = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <div>
    <h2 className="font-display text-xl sm:text-2xl font-semibold mb-1">{title}</h2>
    {subtitle && <p className="text-muted-foreground text-sm mb-6">{subtitle}</p>}
    {!subtitle && <div className="mb-6" />}
    {children}
  </div>
);

const CheckOption = ({
  id,
  label,
  icon,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  icon?: ReactNode;
  checked: boolean;
  onChange: () => void;
}) => (
  <label
    htmlFor={id}
    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
      checked ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
    }`}
  >
    <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
    {icon && <span className="text-gold">{icon}</span>}
    <span className="text-sm font-medium">{label}</span>
  </label>
);

export default PlannerWizard;
