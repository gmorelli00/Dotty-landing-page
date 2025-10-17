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
    goal: "",
    timeAvailability: "",
    socialExpertise: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const brandValues = [
    "Authenticity",
    "Creativity",
    "Innovation",
    "Quality",
    "Professionalism",
    "Elegance",
    "Passion",
    "Empathy",
    "Reliability",
    "Transparency",
    "Uniqueness",
    "Sustainability",
    "Exclusivity",
    "Precision",
    "Attention to detail",
    "Dynamism",
    "Modernity",
    "Tradition",
    "Simplicity",
    "Luxury",
  ];

  const timeAvailability = [
    "30 minutes per day",
    "1 hour per day",
    "2–3 hours per day",
    "5–10 hours per week",
    "10+ hours per week",
  ];

  const socialExpertise = [
    "Beginner – Little experience, I prefer simple content",
    "Intermediate – I can create basic posts and stories",
    "Advanced – I create videos and reels with professional editing",
    "Expert – I work with professional suites (Premiere, After Effects)",
  ];

  const goals = [
    "Brand Awareness",
    "Lead Generation",
    "Client Bookings",
    "Engagement Growth",
    "Community Building",
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.surname || !formData.email)) {
      toast({
        title: "Required Fields",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !formData.profession) {
      toast({
        title: "Required Field",
        description: "Please enter your profession",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && !formData.goal) {
      toast({
        title: "Required Field",
        description: "Please select your main goal",
        variant: "destructive",
      });
      return;
    }
    if (step === 4 && (!formData.timeAvailability || !formData.socialExpertise)) {
      toast({
        title: "Required Fields",
        description: "Please complete all required information",
        variant: "destructive",
      });
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      toast({
        title: "Welcome! 🎉",
        description: "Your profile is ready. Let’s start creating content!",
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
              Step {step} of 5
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round((step / 5) * 100)}% Completed
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
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Tell us about yourself</h2>
                <p className="text-muted-foreground">
                  Help us understand who you are.
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">What’s your niche?</h2>
                <p className="text-muted-foreground">
                  This helps us create content ideas specific to your field.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession or Activity</Label>
                <Textarea
                  id="profession"
                  placeholder="E.g.: Wedding photographer specializing in exotic destinations..."
                  value={formData.profession}
                  onChange={(e) =>
                    setFormData({ ...formData, profession: e.target.value })
                  }
                  maxLength={150}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.profession.length}/150 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Define your approach</h2>
                <p className="text-muted-foreground">
                  What’s your main goal and how do you want to communicate?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Main Goal</Label>
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

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Time & Skills</h2>
                <p className="text-muted-foreground">
                  Help us personalize your strategy based on your availability.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeAvailability">Available Time for Content Creation</Label>
                <Select
                  value={formData.timeAvailability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeAvailability: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How much time do you have?" />
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
                <Label htmlFor="socialExpertise">Social Media Expertise Level</Label>
                <Select
                  value={formData.socialExpertise}
                  onValueChange={(value) =>
                    setFormData({ ...formData, socialExpertise: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How would you describe yourself?" />
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

          {/* Step 5 */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">All set!</h2>
                <p className="text-muted-foreground">
                  Here’s your profile. Ready to start generating content ideas?
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surname</p>
                  <p className="font-medium">{formData.surname}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profession</p>
                  <p className="font-medium">{formData.profession}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Goal</p>
                  <p className="font-medium">{formData.goal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Time</p>
                  <p className="font-medium">{formData.timeAvailability}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Social Level</p>
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
              {step === 5 ? "Start Creating" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
