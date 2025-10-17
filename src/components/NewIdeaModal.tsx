import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewIdeaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NewIdeaModal = ({ open, onOpenChange, onSuccess }: NewIdeaModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "Post Instagram",
    hook: "",
    caption: "",
    cta: "",
    hashtags: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non autenticato");

      const hashtagsArray = formData.hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const { error } = await supabase.from("content_ideas").insert({
        user_id: user.id,
        type: formData.type,
        hook: formData.hook,
        caption: formData.caption,
        cta: formData.cta,
        hashtags: hashtagsArray,
      });

      if (error) throw error;

      toast({
        title: "✨ Idea creata!",
        description: "La tua nuova idea è stata aggiunta al calendario",
      });

      setFormData({
        type: "Post Instagram",
        hook: "",
        caption: "",
        cta: "",
        hashtags: "",
        notes: "",
      });
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">✨ Nuova Idea Contenuto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo di Contenuto</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Post Instagram">Post Instagram</SelectItem>
                <SelectItem value="Reel">Reel</SelectItem>
                <SelectItem value="Carosello">Carosello</SelectItem>
                <SelectItem value="Story">Story</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hook */}
          <div className="space-y-2">
            <Label htmlFor="hook">Hook / Titolo *</Label>
            <Input
              id="hook"
              value={formData.hook}
              onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
              placeholder="Es: 3 segreti per..."
              required
            />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Scrivi la caption per il tuo contenuto..."
              rows={4}
            />
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <Label htmlFor="cta">Call-to-Action</Label>
            <Input
              id="cta"
              value={formData.cta}
              onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
              placeholder="Es: Salva per dopo!"
            />
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags (separati da virgola)</Label>
            <Input
              id="hashtags"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              placeholder="#beauty, #makeup, #tutorial"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Note (opzionale)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Aggiungi note o idee aggiuntive..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annulla
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creazione..." : "Crea Idea"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewIdeaModal;
