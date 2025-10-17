import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface RegenerateStrategyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegenerate: (reason: string) => void;
}

const RegenerateStrategyModal = ({ open, onOpenChange, onRegenerate }: RegenerateStrategyModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const reasons = [
    { id: "low_engagement", label: "Poco engagement", emoji: "📉" },
    { id: "wrong_tone", label: "Tono non adatto", emoji: "🎯" },
    { id: "different_goals", label: "Obiettivi cambiati", emoji: "🎪" },
  ];

  const handleRegenerate = async () => {
    if (!selectedReason) return;

    setIsRegenerating(true);
    
    // Simulate regeneration delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onRegenerate(selectedReason);
    setIsRegenerating(false);
    setSelectedReason(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isRegenerating ? "Rigenerazione in corso..." : "Cosa non ha funzionato?"}
          </DialogTitle>
        </DialogHeader>

        {isRegenerating ? (
          <div className="py-12 space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Sto rigenerando in base ai contenuti vincenti della tua nicchia...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Seleziona il motivo principale per aiutarci a creare una strategia migliore per te
            </p>

            <div className="space-y-3">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedReason === reason.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{reason.emoji}</span>
                    <span className="font-medium">{reason.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Annulla
              </Button>
              <Button
                onClick={handleRegenerate}
                disabled={!selectedReason}
                className="flex-1"
              >
                Aggiorna Piano
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegenerateStrategyModal;
