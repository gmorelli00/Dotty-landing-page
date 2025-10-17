import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    profession: "",
    // niche: "",
    goal: "",
    timeAvailability: "",
    socialExpertise: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // const niches = [
  //   "Make-up Artist",
  //   "Nail Artist",
  //   "Personal Trainer",
  //   "Hair Stylist",
  //   "Tattoo Artist",
  // ];

  const brandValues = [
    "Autenticità",
    "Creatività",
    "Innovazione",
    "Qualità",
    "Professionalità",
    "Eleganza",
    "Passione",
    "Empatia",
    "Affidabilità",
    "Trasparenza",
    "Unicità",
    "Sostenibilità",
    "Esclusività",
    "Precisione",
    "Cura dei dettagli",
    "Dinamicità",
    "Modernità",
    "Tradizione",
    "Semplicità",
    "Lusso",
  ];

  const timeAvailability = [
    "30 minuti al giorno",
    "1 ora al giorno",
    "2-3 ore al giorno",
    "5-10 ore a settimana",
    "10+ ore a settimana",
  ];

  const socialExpertise = [
    "Principiante - Poca esperienza, preferisco contenuti semplici",
    "Intermedio - So creare post e storie basiche",
    "Avanzato - Creo video e reel con editing professionale",
    "Esperto - Lavoro con suite professionali (Premiere, After Effects)",
  ];

  const goals = [
    "Brand Awareness",
    "Generazione Lead",
    "Prenotazioni Clienti",
    "Crescita Engagement",
    "Community Building",
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.surname || !formData.email)) {
      toast({
        title: "Required Fields",
        description: "Fill the required fields",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !formData.profession) {
      toast({
        title: "Campo Obbligatorio",
        description: "Seleziona la tua professione",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && (!formData.goal)) {
      toast({
        title: "Campi Obbligatori",
        description: "Seleziona obiettivo",
        variant: "destructive",
      });
      return;
    }
    if (step === 4 && (!formData.timeAvailability || !formData.socialExpertise)) {
      toast({
        title: "Campi Obbligatori",
        description: "Completa le informazioni richieste",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      toast({
        title: "Benvenuto! 🎉",
        description: "Il tuo profilo è pronto. Iniziamo a creare contenuti!",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} di 5
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round((step / 5) * 100)}% Completato
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-strong p-8 md:p-12">
          {/* Step 1: Profession */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Parlaci di te</h2>
                <p className="text-muted-foreground">
                  Aiutaci a capire chi sei.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="profession">Professione o Attività</Label>
                <Textarea
                  id="profession"
                  placeholder="Es: Fotografo matrimonialista specializzato in destinazioni esotiche..."
                  value={formData.profession}
                  onChange={(e) =>
                    setFormData({ ...formData, profession: e.target.value })
                  }
                  maxLength={150}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.profession.length}/150 caratteri
                </p>
              </div> */}
            </div>
          )}

          {/* Step 2: Niche */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Qual è la tua nicchia?</h2>
                <p className="text-muted-foreground">
                  Questo ci aiuta a creare idee di contenuto specifiche per il tuo settore.
                </p>
              </div>
              
              {/* <div className="space-y-2">
                <Label htmlFor="niche">Seleziona la Tua Nicchia</Label>
                <Select
                  value={formData.niche}
                  onValueChange={(value) =>
                    setFormData({ ...formData, niche: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Scegli la tua nicchia" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="profession">Professione o Attività</Label>
                <Textarea
                  id="profession"
                  placeholder="Es: Fotografo matrimonialista specializzato in destinazioni esotiche..."
                  value={formData.profession}
                  onChange={(e) =>
                    setFormData({ ...formData, profession: e.target.value })
                  }
                  maxLength={150}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.profession.length}/150 caratteri
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Goal & Tone */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Definisci il tuo approccio</h2>
                <p className="text-muted-foreground">
                  Qual è il tuo obiettivo principale e come vuoi comunicare?
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Obiettivo Principale</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const isSelected = formData.goal === goal;
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal })}
                        className={`p-4 rounded-xl border-2 text-sm font-medium transition ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary shadow-soft"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Time & Expertise */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Tempo e Competenze</h2>
                <p className="text-muted-foreground">
                  Aiutaci a personalizzare la strategia in base alle tue disponibilità
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeAvailability">Tempo Disponibile per Creare Contenuti</Label>
                <Select
                  value={formData.timeAvailability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeAvailability: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Quanto tempo hai?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeAvailability.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialExpertise">Livello di Dimestichezza con i Social</Label>
                <Select
                  value={formData.socialExpertise}
                  onValueChange={(value) =>
                    setFormData({ ...formData, socialExpertise: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Come ti definisci?" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialExpertise.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 6: Summary */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Tutto pronto!</h2>
                <p className="text-muted-foreground">
                  Ecco il tuo profilo. Pronto a generare le prime idee di contenuto?
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cognome</p>
                  <p className="font-medium">{formData.surname}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefono</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Professione</p>
                  <p className="font-medium">{formData.profession}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Obiettivo</p>
                  <p className="font-medium">{formData.goal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Disponibile</p>
                  <p className="font-medium">{formData.timeAvailability}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Livello Social</p>
                  <p className="font-medium">{formData.socialExpertise}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              variant="gradient"
              onClick={handleNext}
              className="flex-1"
            >
              {step === 5 ? "Inizia a Creare" : "Continua"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
