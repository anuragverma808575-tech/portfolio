import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "React", level: 85 },
    { name: "Tailwind", level: 90 },
    { name: "Node.js", level: 80 },
    { name: "Git", level: 85 },
    { name: "MongoDB", level: 75 },
  ];

  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded(!expanded);

  /* 🔥 NON-OVERLAPPING POSITIONS */
  const scatteredPositions = useMemo(() => {
    const positions = [];
    const itemsPerRing = 6;
    const baseRadius = 180;
    const gap = 140;

    skills.forEach((_, index) => {
      const ring = Math.floor(index / itemsPerRing);
      const angle =
        ((index % itemsPerRing) / itemsPerRing) * Math.PI * 2;
      const radius = baseRadius + ring * gap;

      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotate: (index % 2 === 0 ? 1 : -1) * 8,
      });
    });

    return positions;
  }, []);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center min-h-screen py-32"
    >
      <h2 className="text-4xl md:text-5xl font-light text-white mb-16">
        Skills & Technologies
      </h2>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="mb-12 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
      >
        {expanded ? "Reset Skills" : "Show Skills"}
      </motion.button>

      <div className="relative w-[700px] h-[700px] flex items-center justify-center">
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const circleRadius = 180;

          const initialX = Math.cos(angle) * circleRadius;
          const initialY = Math.sin(angle) * circleRadius;

          const target = expanded
            ? scatteredPositions[index]
            : { x: initialX, y: initialY, rotate: 0 };

          return (
            <motion.div
              key={index}
              className="absolute w-28 h-28 rounded-lg bg-white/10 border border-white/20 
                         flex flex-col items-center justify-center text-center
                         shadow-lg backdrop-blur-md"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotate,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: index * 0.07,
              }}
              whileHover={{
                scale: 1.15,
                boxShadow: "0 20px 40px rgba(255,255,255,0.25)",
              }}
            >
              <span className="text-white font-medium">
                {skill.name}
              </span>

              {expanded && (
                <span className="text-white/60 text-sm mt-1">
                  {skill.level}%
                </span>
              )}

              {/* Floating effect */}
              {expanded && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {!expanded && (
        <p className="text-white/50 mt-6 text-sm">
          Click the button to reveal skills
        </p>
      )}
    </section>
  );
};

export default Skills;
