import { Progress } from "@/components/ui/progress";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const WizardProgress = ({ currentStep, totalSteps, stepLabel }: WizardProgressProps) => {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gold tracking-wide uppercase">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground">{stepLabel}</span>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
};

export default WizardProgress;
