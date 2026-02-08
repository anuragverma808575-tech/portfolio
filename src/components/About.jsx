import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Text reveal animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
      },
    }),
  };

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 sm:mb-4 px-4">
            About Me
          </h2>

          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-white rounded-full object-cover"
              alt="Logo"
            />
          </div>

          <div className="w-20 h-[1px] bg-white/30 mx-auto" />
        </motion.div>

        {/* Bio Content */}
        <div ref={ref} className="space-y-4 sm:space-y-6 px-4">
          <motion.p
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed"
          >
            I'm a passionate full-stack developer with a keen eye for creating
            elegant solutions to complex problems. With expertise in modern web
            technologies, I specialize in building responsive and user-friendly
            applications that deliver exceptional experiences.
          </motion.p>

          <motion.p
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed"
          >
            My journey in web development started with a curiosity about how
            things work on the internet. Today, I combine creativity with
            technical expertise to craft digital products that not only look
            great but also perform seamlessly across all devices.
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed"
          >
            When I'm not coding, you'll find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community. I believe in continuous learning and staying
            updated with the ever-evolving tech landscape.
          </motion.p>

          {/* Stats */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-12"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">
                0+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/40 font-light">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">
                5+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/40 font-light">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-white/40 font-light">
                Client Satisfaction
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
