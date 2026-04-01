import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlassCard from "../components/GlassCard";
import TiltCard from "../components/TiltCard";
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen } from "lucide-react";

const educationDetails = [
  {
    degree: "Bachelor of Technology",
    institution: "Lovely Professional University",
    location: "Punjab",
    date: "Aug’ 23 – Present",
    grade: "Computer Science and Engineering; CGPA: 5.52",
    description: "Focusing on large-scale software development, advanced algorithms, and specialized AI/ML systems.",
    icon: <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
  },
  {
    degree: "Intermediate",
    institution: "Sri Chaitanya junior College",
    location: "Vijayawada, Andhra Pradesh",
    date: "Mar’ 21 – May’ 23",
    grade: "Percentage: 69%",
    description: "Developing a strong foundation in core STEM subjects with intensive problem-solving training.",
    icon: <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
  },
  {
    degree: "Matriculation",
    institution: "Sri Chaitanya Techno School",
    location: "Vijayawada, Andhra Pradesh",
    date: "Mar’ 20 – May’ 21",
    grade: "Outcome: Successful Completion",
    description: "Building the groundwork for academic excellence and technical curiosity.",
    icon: <GraduationCap className="w-5 h-5 text-[var(--color-primary)]" />
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section
      id="education"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden cyber-grid"
    >
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <GraduationCap className="w-10 h-10 text-[var(--color-primary)]" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Education Journey
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic progression and the foundation of my technical expertise.
          </p>
        </motion.div>

        {/* Journey Timeline Container */}
        <div ref={containerRef} className="max-w-7xl mx-auto relative px-4 sm:px-0">
          
          {/* Animated Central Vertical Line (Desktop) */}
          <div className="absolute left-[38px] sm:left-1/2 top-0 bottom-0 w-1 bg-white/5 transform sm:-translate-x-1/2 rounded-full overflow-hidden hidden sm:block">
            <motion.div 
              style={{ height: pathHeight, opacity: glowOpacity }}
              className="w-full bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]"
            />
          </div>
          
          {/* Mobile vertical line */}
          <div className="absolute left-[38px] top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden sm:hidden">
            <motion.div 
              style={{ height: pathHeight, opacity: glowOpacity }}
              className="w-full bg-[var(--color-primary)] shadow-[0_0_15px_var(--color-primary)]"
            />
          </div>

          {educationDetails.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-center justify-between mb-24 last:mb-0 group ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Inner Dot / Icon */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute left-[38px] sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 top-0 sm:top-1/2 sm:-translate-y-1/2"
                >
                  <div className="w-14 h-14 rounded-full bg-[#020408] border-[3px] border-[var(--color-primary)]/50 shadow-[0_0_20px_rgba(0,245,255,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--color-primary)] transition-all duration-300 ease-out">
                    <div className="text-[var(--color-primary)]">
                      {item.icon}
                    </div>
                  </div>
                </motion.div>

                {/* Content Card container (left or right) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className={`w-full sm:w-[calc(50%-80px)] pl-24 sm:pl-0 ${
                    isEven ? "sm:text-right sm:pr-12" : "sm:text-left sm:pl-12"
                  } relative pt-2 sm:pt-0`}
                >
                    <TiltCard className="p-0 !bg-transparent !border-none !shadow-none before:hidden after:hidden h-auto">
                       <GlassCard
                         glowColor="primary"
                         className={`p-6 md:p-8 overflow-hidden transition-all duration-500 text-left cursor-default h-full bg-[#020408]/60 backdrop-blur-md`}
                       >
                         {/* Background Card Number Watermark */}
                         <div className={`absolute -bottom-6 ${isEven ? 'sm:-left-6 right-6 sm:right-auto' : '-right-6'} text-8xl font-black text-white/[0.03] select-none pointer-events-none z-0`}>
                           0{index + 1}
                         </div>

                         <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                           <div className="flex items-start gap-4">
                             <div>
                               <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transition-colors duration-300">
                                 {item.degree}
                               </h3>
                               <h4 className="text-xl text-gray-300 font-medium font-mono uppercase tracking-tight">
                                 {item.institution}
                               </h4>
                             </div>
                           </div>
                           
                           <div className="flex flex-col gap-3 items-end sm:min-w-[180px] mt-4 sm:mt-0">
                               <div className="relative group/date">
                                  <div className="absolute -inset-2 bg-[var(--color-primary)]/10 blur-lg opacity-0 group-hover/date:opacity-100 transition-opacity" />
                                  <span className="relative flex items-center gap-3 text-[var(--color-primary)] bg-black/40 px-4 py-2 rounded-xl border-2 border-[var(--color-primary)]/30 font-orbitron text-[10px] tracking-widest font-black shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                                    <Calendar className="w-4 h-4 animate-pulse" />
                                    {item.date.toUpperCase()}
                                  </span>
                               </div>
                               <span className="flex items-center gap-2 text-gray-400 font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">
                                 <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                                 {item.location}
                               </span>
                           </div>
                         </div>

                         <div className="relative z-10 mb-6">
                           <span className="inline-block px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded font-semibold font-mono text-xs border border-[var(--color-primary)]/20">
                             {item.grade}
                           </span>
                         </div>

                         <p className="relative z-10 text-gray-400 font-light leading-relaxed">
                           {item.description}
                         </p>
                       </GlassCard>
                    </TiltCard>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
