import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Target, Users, Lightbulb } from "lucide-react";

interface IdeaDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idea: {
    type: string;
    hook: string;
    caption?: string;
    cta?: string;
    hashtags?: string[];
  };
}

const IdeaDetailModal = ({ open, onOpenChange, idea }: IdeaDetailModalProps) => {
  // Mock additional details
  const details = {
    script: `Hook: "${idea.hook}"\n\nIntroduzione: Presenta il problema o l'opportunità\n\nSviluppo: Mostra la soluzione o il processo step-by-step\n\nConclusione: Rafforza il messaggio e invita all'azione`,
    obiettivo: "Aumentare l'engagement e costruire autorevolezza nella nicchia",
    target: "Follower interessati a migliorare le proprie competenze",
    note: "Ottimo per aumentare la reach organica. Considera di postare nelle ore di punta.",
    categoria: idea.type,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold pr-8">{idea.hook}</DialogTitle>
            <Badge variant="secondary">{idea.type}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Categoria:</span>
            <span className="font-medium">{details.categoria}</span>
          </div>

          {/* Script */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <h3 className="font-semibold">Script Suggerito</h3>
            </div>
            <div className="p-4 bg-muted rounded-xl whitespace-pre-line text-sm">
              {details.script}
            </div>
          </div>

          {/* Caption */}
          {idea.caption && (
            <div className="space-y-2">
              <h3 className="font-semibold">Caption</h3>
              <p className="text-sm text-muted-foreground">{idea.caption}</p>
            </div>
          )}

          {/* CTA */}
          {idea.cta && (
            <div className="space-y-2">
              <h3 className="font-semibold">Call-to-Action</h3>
              <p className="text-sm font-medium text-primary">{idea.cta}</p>
            </div>
          )}

          {/* Hashtags */}
          {idea.hashtags && idea.hashtags.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {idea.hashtags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Objective */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <h3 className="font-semibold">Obiettivo</h3>
            </div>
            <p className="text-sm text-muted-foreground">{details.obiettivo}</p>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <h3 className="font-semibold">Target</h3>
            </div>
            <p className="text-sm text-muted-foreground">{details.target}</p>
          </div>

          {/* Notes */}
          <div className="p-4 bg-gradient-subtle rounded-xl">
            <h3 className="font-semibold mb-2">📝 Note</h3>
            <p className="text-sm text-muted-foreground">{details.note}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="default">
              Modifica Idea
            </Button>
            <Button className="flex-1" variant="outline">
              Segna come Pubblicato
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaDetailModal;
