import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface GuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reel: {
    title: string;
    description: string;
    views: string;
    engagement: string;
  };
}

const GuideModal = ({ open, onOpenChange, reel }: GuideModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{reel.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Preview */}
          <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=450&fit=crop"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="secondary" className="gap-1">
              <Play className="w-3 h-3" />
              {reel.views} visualizzazioni
            </Badge>
            <Badge variant="outline">{reel.engagement} engagement</Badge>
          </div>

          {/* Guide Content */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">📝 Descrizione</h3>
              <p className="text-muted-foreground">{reel.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">🎬 Come crearlo</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Inizia con uno hook visivo forte nei primi 2 secondi</li>
                <li>2. Mostra il processo o la trasformazione in modo dinamico</li>
                <li>3. Usa transizioni veloci per mantenere l'attenzione</li>
                <li>4. Aggiungi musica trending per aumentare la reach</li>
                <li>5. Concludi con una call-to-action chiara</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-2">💡 Tips per massimizzare l'engagement</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Posta negli orari di maggiore attività del tuo pubblico</li>
                <li>• Usa 3-5 hashtag rilevanti per la tua nicchia</li>
                <li>• Rispondi ai commenti nelle prime ore per aumentare la visibilità</li>
                <li>• Sperimenta con diversi formati per vedere cosa funziona meglio</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-subtle rounded-xl">
              <p className="text-sm font-medium">
                🎯 <strong>Obiettivo:</strong> Aumentare l'engagement e costruire fiducia mostrando il tuo processo
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;
