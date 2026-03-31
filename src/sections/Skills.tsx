import { motion } from "framer-motion";
import { Cpu, Globe, Database, Users, Zap, ShieldCheck, Activity } from "lucide-react";

const allSkills = [
  {
    title: "LANGUAGES",
    icon: Globe,
    id: "LN_G_01",
    version: "v4.2",
    skills: ["Java", "Python", "C", "JavaScript", "C++"],
    color: "var(--color-primary)"
  },
  {
    title: "FRONT_END",
    icon: Cpu,
    id: "FE_D_02",
    version: "v5.0",
    skills: ["HTML", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "var(--color-secondary)"
  },
  {
    title: "BACK_END_DB",
    icon: Database,
    id: "BE_S_03",
    version: "v3.8",
    skills: ["Node.js", "Express.js", "MongoDB", "SQL"],
    color: "var(--color-primary)"
  },
  {
    title: "SOFT_SKILLS",
    icon: Users,
    id: "SF_K_04",
    version: "v1.0",
    skills: ["Problem Solving", "Team Player", "Adaptability", "Leadership"],
    color: "var(--color-secondary)"
  },
];

export default function Skills() {
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
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group block h-full"
            >
              {/* CHIP FRAME */}
              <div className="absolute inset-0 bg-black/40 border-2 border-white/5 rounded-2xl group-hover:border-[var(--color-primary)]/40 transition-all duration-500 overflow-hidden shadow-2xl">
                 {/* Internal Tech Grid Overlay */}
                 <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity cyber-grid" />
                 
                 {/* Animated Scanline for active chips */}
                 <div className="absolute inset-0 hud-scanline opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>

              {/* CHIP CONTENT */}
              <div className="relative p-8 h-full flex flex-col items-center text-center">
                 {/* Top ID Badge */}
                 <div className="absolute top-4 left-6 flex items-center gap-2">
                    <span className="text-[8px] font-terminal text-white/20 tracking-widest">{category.id}</span>
                    <div className="w-1 h-1 rounded-full bg-green-500/40" />
                 </div>
                 
                 {/* Version Badge */}
                 <div className="absolute top-4 right-6 border border-white/10 px-2 py-0.5 rounded shadow-lg">
                    <span className="text-[8px] font-terminal text-[var(--color-primary)] opacity-60 uppercase">{category.version}</span>
                 </div>

                 <div className="mt-8 mb-8 relative">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-primary)]/50 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-500 relative z-10">
                       <category.icon className="w-8 h-8 text-white/60 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                    {/* Decorative Pulse Ring */}
                    <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
                 </div>

                 <h3 className="text-xl font-black font-gaming text-white mb-8 tracking-widest uppercase group-hover:text-[var(--color-primary)] transition-colors">
                    {category.title}
                 </h3>

                 <div className="flex flex-wrap justify-center gap-3 mt-auto">
                    {category.skills.map(skill => (
                       <span key={skill} className="text-[10px] font-terminal font-bold px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-gray-400 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-inner">
                          {skill}
                       </span>
                    ))}
                 </div>

                 {/* Bottom Status Bar */}
                 <div className="mt-10 w-full flex items-center justify-between border-t border-white/5 pt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                       {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />)}
                    </div>
                    <span className="text-[9px] font-terminal text-gray-500 uppercase tracking-widest">SLOT_ENGAGED</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
