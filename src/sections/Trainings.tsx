import { motion } from "framer-motion";
import { Target, Zap, Cpu, Calendar, ShieldCheck, GraduationCap, MapPin } from "lucide-react";

export default function Trainings() {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-32 overflow-hidden flex items-center justify-center cyber-grid bg-black/30"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-[var(--color-primary)] animate-pulse" />
              <span className="text-[10px] font-gaming text-white/40 tracking-[0.5em] uppercase">PRIMARY_DIRECTIVE</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black font-gaming text-white uppercase tracking-tighter">
              MISSION_PROFILE
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* SINGLE MISSION CARD */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative"
        >
           {/* GLOW DECORATION */}
           <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-[2rem] blur-[50px] opacity-30" />
           
           <div className="relative bg-[#050810]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
              {/* TOP HEADER BAR */}
              <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/[0.02]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                       <GraduationCap className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                       <h3 className="text-white font-gaming text-lg tracking-widest uppercase">Academic_Deployment</h3>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                          <span className="text-[10px] font-terminal text-gray-500 uppercase">Status: ACTIVE_TRACKING</span>
                       </div>
                    </div>
                 </div>
                 <div className="hidden md:block">
                    <span className="text-xs font-gaming text-white/20 tracking-[0.3em]">ID: TR_LPU_2022</span>
                 </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
                 
                 {/* LEFT: MISSION SPECS */}
                 <div className="space-y-10">
                    <div>
                       <h4 className="text-3xl font-black text-white font-gaming leading-tight uppercase mb-4">
                          Centre for Professional Advancement
                       </h4>
                       <div className="flex items-center gap-4 text-[10px] font-gaming text-[var(--color-primary)] tracking-[0.2em] uppercase">
                          <div className="flex items-center gap-2">
                             <MapPin className="w-3 h-3" />
                             <span>Lovely Professional University</span>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="flex items-center gap-2">
                             <Calendar className="w-3 h-3" />
                             <span>2022 - 2026 (EXP)</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <p className="text-white/80 text-lg leading-relaxed font-light border-l-2 border-[var(--color-primary)]/30 pl-6 italic">
                          "Currently engaged in advanced Computer Science Engineering training, focusing on large-scale AI system design, neural architectures, and industrial-grade software engineering."
                       </p>
                       
                       {/* PROGRESS TRACKER */}
                       <div className="space-y-3 pt-4">
                          <div className="flex justify-between text-[10px] font-gaming text-white/40 tracking-widest">
                             <span>MISSION_PROGRESS</span>
                             <span>Phase_03 / 04</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "70%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_15px_var(--color-primary)]" 
                             />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* RIGHT: SUB-OBJECTIVES (MODULES) */}
                 <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                       <Cpu className="w-5 h-5 text-[var(--color-primary)] opacity-60" />
                       <span className="text-xs font-gaming text-white/40 tracking-[0.3em] uppercase">Core_Target_Modules</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       {[
                         { mod: "Advanced Java paradigms", code: "MOD_JA_01", comp: "95%" },
                         { mod: "Artificial Intelligence", code: "MOD_AI_02", comp: "88%" },
                         { mod: "Machine Learning Concepts", code: "MOD_ML_03", comp: "82%" },
                         { mod: "Data Structures & Alg.", code: "MOD_DS_04", comp: "90%" }
                       ].map(item => (
                         <div key={item.code} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-[var(--color-primary)]/30 transition-all group">
                            <div className="flex items-center gap-4">
                               <ShieldCheck className="w-4 h-4 text-green-500/40 group-hover:text-green-500 transition-colors" />
                               <div>
                                  <p className="text-sm font-terminal text-white group-hover:text-[var(--color-primary)] transition-colors">{item.mod}</p>
                                  <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">{item.code}</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-terminal text-[var(--color-primary)] opacity-40">{item.comp}</span>
                         </div>
                       ))}
                    </div>
                 </div>

              </div>

              {/* FOOTER STATUS BAR */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-center gap-8">
                 <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-[9px] font-gaming text-white/60 tracking-widest uppercase">Verified_Academic_Access</span>
                 </div>
                 <div className="w-px h-4 bg-white/10" />
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-[9px] font-gaming text-white/60 tracking-widest uppercase">Encryption_Enabled</span>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
