import { useEffect, useState } from "react";
import { Sparkles, Users, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StrategyLoadingProps {
  onComplete: () => void;
  isFirstAccess?: boolean;
}

const StrategyLoading = ({ onComplete, isFirstAccess = false }: StrategyLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(7);

  const steps = [
    {
      icon: Sparkles,
      text: "Stiamo creando la tua strategia",
      duration: 1750,
    },
    {
      icon: Users,
      text: "Stiamo analizzando 200+ profili simili",
      duration: 1750,
    },
    {
      icon: Target,
      text: "Ottimizzando per i tuoi obiettivi",
      duration: 1750,
    },
    {
      icon: Calendar,
      text: "Personalizzando il tuo calendario",
      duration: 1750,
    },
  ];

  useEffect(() => {
    const duration = isFirstAccess ? 7000 : 3000;
    const stepDuration = duration / steps.length;
    const progressInterval = 100;
    const progressIncrement = 100 / (duration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return Math.min(prev + progressIncrement, 100);
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    // Countdown timer for first access
    let countdownInterval: NodeJS.Timeout | null = null;
    if (isFirstAccess) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownInterval) clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [onComplete, isFirstAccess]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-strong p-8 md:p-12 space-y-8">
          {/* Icon Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                <CurrentIcon className="w-10 h-10 text-primary-foreground" />
              </div>
              <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>

          {/* Current Step Text */}
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-bold animate-fade-in">
              {steps[currentStep].text}
            </h2>
            <p className="text-sm text-muted-foreground">
              Stiamo preparando tutto per te...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between items-center text-xs">
              <p className="text-muted-foreground">
                {Math.round(progress)}%
              </p>
              {isFirstAccess && countdown > 0 && (
                <p className="text-primary font-medium">
                  {countdown}s
                </p>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "w-8 bg-gradient-primary"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyLoading;
