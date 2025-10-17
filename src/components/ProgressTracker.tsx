import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

interface ProgressTrackerProps {
  completedCount: number;
  totalCount: number;
  streak: number;
}

const ProgressTracker = ({ completedCount, totalCount, streak }: ProgressTrackerProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = (completedCount / totalCount) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const isComplete = completedCount === totalCount;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              🎯 Progresso Settimanale
            </span>
            <span className="text-muted-foreground">
              {completedCount}/{totalCount} contenuti
            </span>
          </div>
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${animatedProgress}%`,
                background: isComplete
                  ? "linear-gradient(90deg, hsl(140 50% 75%), hsl(50 90% 70%))"
                  : "linear-gradient(90deg, hsl(260 40% 75%), hsl(340 85% 75%))",
              }}
            >
              {animatedProgress > 10 && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isComplete ? (
              <span className="text-primary font-medium">
                ✨ Settimana completata! Ottimo lavoro!
              </span>
            ) : (
              `Giorno ${completedCount}/${totalCount} – ${
                completedCount >= totalCount / 2 ? "ottimo ritmo!" : "continua così!"
              }`
            )}
          </p>
          <div className="flex items-center gap-1.5 text-sm font-medium text-accent">
            <Flame className="w-4 h-4" />
            <span>{streak} giorni</span>
          </div>
        </div>

        {/* Celebration Message */}
        {isComplete && (
          <div className="mt-4 p-4 bg-gradient-subtle rounded-xl border border-primary/20 animate-fade-in">
            <p className="text-sm font-medium text-center">
              🎉 Hai completato la settimana! Sblocca il tuo prossimo livello 👇
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
