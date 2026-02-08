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
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            About Me
          </h2>

          <img
            src="/logo.png"
            className="w-28 h-28 border-2 border-white rounded-full"
            alt="Logo"
          />

          <div className="w-20 h-[1px] bg-white/30 mx-auto" />
        </motion.div>

        {/* Bio Content */}
        <div ref={ref} className="space-y-6">
          <motion.p
            custom={0}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed"
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
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed"
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
            className="text-lg md:text-xl text-white/60 font-light leading-relaxed"
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
            className="grid grid-cols-3 gap-8 pt-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-white mb-2">
                0+
              </div>
              <div className="text-sm text-white/40 font-light">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-white mb-2">
                5+
              </div>
              <div className="text-sm text-white/40 font-light">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-white mb-2">
                100%
              </div>
              <div className="text-sm text-white/40 font-light">
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
