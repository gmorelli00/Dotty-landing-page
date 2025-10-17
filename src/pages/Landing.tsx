import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Target, Calendar, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import BouncingBall from "@/components/ui/BouncingBall";
import { Fragment } from "react/jsx-runtime";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      
    <div className="relative min-h-screen bg-gradient-subtle">
    <BouncingBall />
      <div className="flex justify-center">
        <img src="src/assets/dottysvg.svg" alt="Logo Dotty" className="flex justify-center h-10 mt-5" />
      </div>
      {/* Hero Section */}
      <section className="container mx-auto mt-5 px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-row w-full justify-center space-y-4 md:space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Tired of wasting hours creating posts?
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Meet your AI Copilot for Social Media
              </span>
            </h1>
            <p className="text-lg mx-10 md:text-xl md:mx-20 text-muted-foreground">
              Say goodbye to endless brainstorming and design stress. 
              Generate weeks of engaging content in just minutes — 
              perfect for freelancers, creators, and small businesses.
            </p>
            <div className="flex flex-col mx-10 sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="gradient"
                onClick={() => navigate("/onboarding")}
                className="w-full sm:w-auto"
              >
                Join beta now
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              {/* <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto"
              >
                Log In
              </Button> */}
            </div>
          </div>
          {/* <div className="flex-1 w-full">
            <img
              
              alt="Social Media Dashboard"
              className="rounded-2xl shadow-strong w-full"
            />
          </div> */}
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Creating content shouldn’t feel like a full-time job
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          If you spend hours writing captions, finding ideas, and trying to stay consistent — 
          you’re not alone. That’s why we built <strong>an AI copilot Dotty</strong> that does the hard work for you.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
          Everything You Need to Grow
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-card p-6 md:p-8 rounded-2xl shadow-elegant">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">AI Content Generation</h3>
            <p className="text-muted-foreground">
              Get unique content ideas every week, tailored to your niche and audience.
            </p>
          </div>
          <div className="bg-card p-6 md:p-8 rounded-2xl shadow-elegant">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Smart Scheduler</h3>
            <p className="text-muted-foreground">
              Plan your posts automatically with AI-powered timing suggestions.
            </p>
          </div>
          <div className="bg-card p-6 md:p-8 rounded-2xl shadow-elegant sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Personalized Insights</h3>
            <p className="text-muted-foreground">
              Get actionable recommendations to boost engagement and visibility.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center shadow-glow">
          <Zap className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-primary-foreground" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-primary-foreground">
            Ready to stop stressing about social media?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-primary-foreground/90">
            Join thousands of creators turning content chaos into effortless strategy.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/onboarding")}
            className="w-full sm:w-auto"
          >
            Embrace Dotty
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
    </Fragment>
  );
};

export default Landing;
