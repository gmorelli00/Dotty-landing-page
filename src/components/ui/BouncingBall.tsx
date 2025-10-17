import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const suggestions = [
  "💡 Crea rubriche settimanali per fidelizzare il pubblico!",
  "🎯 Collabora con micro-influencer della tua nicchia!",
  "📊 Analizza i dati e pubblica quando il tuo pubblico è più attivo!",
  "💬 Coinvolgi i follower con domande e sondaggi!",
  "🏷️ Usa hashtag mirati, non generici, per raggiungere nuovi utenti!",
];

const BouncingBall: React.FC = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [vel, setVel] = useState({ x: 2.3, y: 3 });
  const [hovered, setHovered] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(suggestions[0]);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (!hovered) {
        setPos(prev => {
          let { x, y } = prev;
          let { x: vx, y: vy } = vel;

          const radius = 20;
          const width = window.innerWidth;
          const height = window.innerHeight;

          x += vx;
          y += vy;

          if (x <= radius || x >= width - radius) vx *= -1;
          if (y <= radius || y >= height - radius) vy *= -1;

          setVel({ x: vx, y: vy });
          return { x, y };
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hovered, vel]);

  const handleHover = () => {
    setHovered(true);
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    setCurrentSuggestion(suggestions[randomIndex]);
  };

  // Calcola posizione della nuvoletta
  const tooltipPosition = () => {
    const width = window.innerWidth;
    const padding = 900; // distanza di sicurezza dai bordi
    if (pos.x < padding) return "right";
    if (pos.x > width - padding) return "left";
    return "top";
  };

  const position = tooltipPosition();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-gradient-primary border-1 border-white shadow-lg pointer-events-auto cursor-pointer"
        style={{
          left: pos.x - 24,
          top: pos.y - 24,
        }}
        onMouseEnter={handleHover}
        onMouseLeave={() => setHovered(false)}
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: position === "top" ? -30 : 0 }}
            className={`absolute text-sm text-white bg-slate-800/90 px-3 py-1 rounded-md whitespace-nowrap shadow-md
              ${
                position === "top"
                  ? "left-1/2 -translate-x-1/2 -top-8"
                  : position === "right"
                  ? "left-1/2 top-1/2 -translate-y-1/2"
                  : "right-1/2 top-1/2 -translate-y-1/2"
              }`}
          >
            {currentSuggestion}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BouncingBall;

