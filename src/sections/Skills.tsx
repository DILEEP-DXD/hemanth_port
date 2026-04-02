import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Database, Users, Zap, ShieldCheck, Activity, X, ChevronRight, Terminal, Layout, BrainCircuit, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const allSkills = [
  {
    title: "LANGUAGES",
    icon: Globe,
    id: "LN_G_01",
    version: "v4.2",
    skills: ["Java", "Python", "C", "JavaScript", "C++"],
    description: "Core processing units for algorithmic design and system communication.",
    color: "var(--color-primary)"
  },
  {
    title: "FRONT_END",
    icon: Layout,
    id: "FE_D_02",
    version: "v5.0",
    skills: ["HTML", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    description: "High-fidelity user interface frameworks for immersive digital experiences.",
    color: "var(--color-secondary)"
  },
  {
    title: "BACK_END_DB",
    icon: Database,
    id: "BE_S_03",
    version: "v3.8",
    skills: ["Node.js", "Express.js", "MongoDB", "SQL"],
    description: "Scalable architecture for robust data persistence and server-side logic.",
    color: "var(--color-primary)"
  },
  {
    title: "SOFT_SKILLS",
    icon: Users,
    id: "SF_K_04",
    version: "v1.0",
    skills: ["Problem Solving", "Team Player", "Adaptability", "Leadership"],
    description: "Human-centric optimization protocols for collaborative mission success.",
    color: "var(--color-secondary)"
  },
  {
    title: "MACHINE_LEARNING",
    icon: BrainCircuit,
    id: "ML_A_05",
    version: "v2.4",
    skills: ["PyTorch", "TensorFlow", "NumPy", "Pandas", "OpenCV", "Scikit-learn"],
    description: "Neural network architectures and deep learning models for predictive intelligence.",
    color: "var(--color-primary)"
  },
  {
    title: "TOOLS_DEVOPS",
    icon: Settings,
    id: "TD_S_06",
    version: "v3.1",
    skills: ["Git", "GitHub", "VS Code", "Linux", "Docker", "Postman"],
    description: "Deployment pipelines and development environment optimization tools.",
    color: "var(--color-secondary)"
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<typeof allSkills[0] | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCategory]);

  return (
    <section id="skills" className="relative min-h-screen w-full py-32 px-6 overflow-hidden cyber-grid bg-black/20">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-center mb-24"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[var(--color-primary)] animate-pulse" />
              <span className="text-[10px] font-gaming text-white/40 tracking-[0.6em] uppercase">SYSTEM_ABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black font-gaming text-white uppercase tracking-tighter shadow-2xl">
              SKILLS_AUGMENT
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allSkills.map((category, index) => (
            <motion.div
              layoutId={`skill-card-${category.title}`}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className="relative group block h-full cursor-pointer"
            >
              {/* INDUSTRIAL BORDER (Matching Projects Hub Style) */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-[var(--color-primary)]/50 transition-colors duration-500 bg-[#020408]/80 backdrop-blur-xl -z-10" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* CHIP CONTENT */}
              <div className="relative p-8 h-full flex flex-col items-center text-center">
                 {/* Top ID Badge */}
                 <div className="absolute top-4 left-6 flex items-center gap-2">
                    <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">{category.id}</span>
                 </div>
                 
                 {/* Version Badge */}
                 <div className="absolute top-4 right-6 px-2 py-0.5 rounded">
                    <span className="text-[8px] font-mono text-[var(--color-primary)] opacity-60 uppercase">{category.version}</span>
                 </div>

                 <div className="mt-8 mb-8 relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-primary)]/50 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-500 relative z-10">
                       <category.icon className="w-8 h-8 text-white/60 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                    {/* Subtle Pulse Ring */}
                    <div className="absolute inset-0 rounded-2xl bg-[var(--color-primary)]/5 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
                 </div>

                 <h3 className="text-xl font-black font-orbitron text-white mb-8 tracking-widest uppercase group-hover:text-[var(--color-primary)] transition-colors">
                    {category.title.replace('_', ' ')}
                 </h3>

                 <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {category.skills.slice(0, 3).map(skill => (
                       <span key={skill} className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-gray-500 group-hover:text-white transition-all">
                          {skill}
                       </span>
                    ))}
                    {category.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-gray-600 px-2 py-1 uppercase tracking-tighter">+{category.skills.length - 3}_MORE</span>
                    )}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SKILLS_HUD MODAL (Matching Projects Dialog Style) */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl cursor-pointer"
               onClick={() => setSelectedCategory(null)}
            />
            
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 pointer-events-none">
               <motion.div
                  layoutId={`skill-card-${selectedCategory.title}`}
                  className="bg-[#020408] border border-white/10 rounded-3xl w-full max-w-5xl md:h-[80vh] flex flex-col pointer-events-auto overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]"
               >
                  <div className="flex flex-col md:flex-row h-full">
                     {/* Information Side (Left) */}
                     <div className="md:w-1/3 p-8 md:p-12 bg-white/[0.02] border-r border-white/5 flex flex-col items-center justify-center text-center">
                        <div className="w-32 h-32 rounded-3xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shadow-[0_0_40px_rgba(0,245,255,0.1)] mb-8 relative">
                           <selectedCategory.icon className="w-16 h-16 text-[var(--color-primary)]" />
                           <div className="absolute inset-0 hud-scanline opacity-10 rounded-3xl" />
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tighter text-white uppercase mb-4">{selectedCategory.title.replace('_', ' ')}</h2>
                        
                        <div className="flex flex-col gap-2 items-center mb-8">
                           <span className="text-xs font-mono text-gray-500 tracking-widest">{selectedCategory.id}</span>
                           <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[10px] font-mono text-green-500 font-bold tracking-widest">STATUS_STABLE</span>
                           </div>
                        </div>

                        <p className="text-gray-400 text-sm font-light leading-relaxed font-mono px-4 italic opacity-60">
                           {selectedCategory.description}
                        </p>
                     </div>

                     {/* Content Side (Right) */}
                     <div className="md:w-2/3 p-8 md:p-12 flex flex-col relative overflow-y-auto">
                        <div className="flex justify-between items-center mb-12">
                           <h4 className="text-[10px] font-gaming text-white/30 uppercase tracking-[0.5em]">COMPONENT_REGISTRY</h4>
                           <button 
                              onClick={() => setSelectedCategory(null)}
                              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-[var(--color-primary)]"
                           >
                              <X className="w-8 h-8" />
                           </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow content-start pb-12">
                           {selectedCategory.skills.map((skill, idx) => (
                             <motion.div
                                key={skill}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (idx * 0.05) }}
                                className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl group/item hover:border-[var(--color-primary)]/30 transition-all hover:bg-white/[0.05]"
                             >
                                <div className="flex items-center gap-4">
                                   <Terminal className="w-4 h-4 text-[var(--color-primary)] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                                   <span className="text-xl font-black font-gaming text-gray-300 group-hover/item:text-white transition-colors">{skill}</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-[var(--color-primary)] opacity-20 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1" />
                             </motion.div>
                           ))}
                        </div>

                        {/* Footer analytics décor (Matching Projects aesthetic) */}
                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between opacity-30 font-mono text-[10px] tracking-widest">
                           <div className="flex gap-4">
                              <span>LOAD: 12%</span>
                              <span>BUFFER: STABLE</span>
                           </div>
                           <span className="text-[var(--color-primary)] font-bold tracking-[0.5em] animate-pulse">AUTH_AUTHORIZED_ACCESS</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
