import { motion } from "framer-motion";
import React from "react";
import { BrainCircuit, Cpu, Zap, GraduationCap, Target, Code2, User, Quote, Shield, Info, ArrowUpRight, CheckCircle2 } from "lucide-react";

const SkillBar: React.FC<{ label: string, percentage: number, delay?: number }> = ({ label, percentage, delay = 0 }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-gaming text-white/50 tracking-widest uppercase">{label}</span>
      <span className="text-[10px] font-mono text-primary font-bold">{percentage}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden p-[0.5px]">
      <motion.div 
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: percentage / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full bg-gradient-to-r from-primary/80 to-secondary/80 rounded-full"
      />
    </div>
  </div>
);

const TechCard: React.FC<{ name: string, delay?: number }> = ({ name, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
  >
    <span className="text-[9px] font-gaming text-white/30 group-hover:text-primary transition-colors tracking-widest uppercase">{name}</span>
    <div className="h-[1px] w-full bg-white/5 overflow-hidden">
      <div className="h-full w-full bg-primary/40 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
    </div>
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="relative min-h-screen w-full py-32 px-6 overflow-hidden cyber-grid bg-[#020408]">
      {/* Subtle background atmospheric glow */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* LEFT COLUMN: IDENTITY & STORY */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-gaming tracking-[0.3em] text-primary/80 uppercase">System_Entry // Hemanth Kumar</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black font-gaming tracking-tighter text-white leading-[0.9] uppercase">
                ENGINEERING <br />
                <span className="text-gradient">INTELLIGENCE</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 font-sans leading-relaxed tracking-tight max-w-lg">
                Architecting scalable AI ecosystems and high-fidelity digital interfaces through <span className="text-white font-medium">precision engineering</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
              <Quote className="absolute -top-4 -left-2 w-12 h-12 text-primary/10" />
              <p className="text-lg text-gray-300 leading-relaxed font-sans italic opacity-80">
                "My objective is translating complex algorithmic structures into intuitive, premium experiences. I build systems that don't just solve problems, but empower growth through seamless intelligence."
              </p>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-gaming text-primary/60 tracking-widest uppercase">Current_Phase</span>
                  <span className="text-xs font-mono text-white/80">Available for ambitious high-impact projects</span>
                </div>
                <div className="flex items-center gap-2 text-primary group cursor-pointer">
                  <span className="text-[10px] font-gaming tracking-widest uppercase group-hover:mr-2 transition-all">Connect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
               {["AI_SYSTEMS_DESIGN", "SCALABLE_FRONTENDS", "DATA_PIPELINES", "CLOUD_ARCHITECT"].map(label => (
                 <span key={label} className="text-[9px] font-mono tracking-widest uppercase border border-white/10 px-3 py-1 rounded-md">{label}</span>
               ))}
            </div>
          </div>

          {/* RIGHT COLUMN: AUTHORITY & PROOF */}
          <div className="space-y-16">
            
            {/* AUTHORITY VECTORS */}
            <div className="space-y-10 p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-6 opacity-20"><Shield className="w-8 h-8 text-primary" /></div>
              
              <div>
                <h3 className="text-xs font-gaming text-white tracking-[0.4em] uppercase mb-10 flex items-center gap-3">
                  <Target className="w-4 h-4 text-primary" /> Authority_Vectors
                </h3>
                
                <div className="space-y-8">
                  <SkillBar label="AI / MACHINE_LEARNING" percentage={82} delay={0.1} />
                  <SkillBar label="SYSTEM_ARCHITECTURE" percentage={88} delay={0.2} />
                  <SkillBar label="INTERACTIVE_DESIGN" percentage={95} delay={0.3} />
                  <SkillBar label="BACKEND_DYNAMICS" percentage={90} delay={0.4} />
                </div>
              </div>

              {/* TECH MATRIX */}
              <div className="pt-4">
                <h3 className="text-xs font-gaming text-white/40 tracking-[0.3em] uppercase mb-6">Internal_Stack</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["PYTHON", "REACT", "NODE.JS", "PYTORCH", "TYPESCRIPT", "DOCKER"].map((tech, i) => (
                    <TechCard key={tech} name={tech} delay={0.5 + i * 0.05} />
                  ))}
                </div>
              </div>
            </div>

            {/* CREDENTIAL SYNTHESIS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
                <div>
                   <h4 className="text-[10px] font-gaming text-primary/60 tracking-widest uppercase mb-4">Academic_Root</h4>
                   <p className="text-lg font-bold text-white tracking-tight leading-tight">LPU_University</p>
                   <p className="text-xs text-gray-500 mt-1 uppercase font-gaming tracking-wider">B.Tech in CS Engineering</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                   <span className="text-[10px] font-mono text-white/30 tracking-tighter">[BATCH_2022_2026]</span>
                   <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <GraduationCap className="w-4 h-4 text-primary" />
                   </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
                <div>
                   <h4 className="text-[10px] font-gaming text-secondary/60 tracking-widest uppercase mb-4">Verification_Check</h4>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                         <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-white uppercase tracking-widest">Active_Uplink</p>
                         <p className="text-[10px] font-mono text-gray-500 uppercase">System Integrity Stable</p>
                      </div>
                   </div>
                </div>
                <div className="mt-8 flex items-center gap-2">
                   <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-secondary/40 animate-pulse" />
                   </div>
                   <span className="text-[9px] font-mono text-secondary">STABLE</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* MINIMAL FOOTER DECOR */}
      <div className="absolute bottom-12 left-0 w-full px-6 opacity-10 pointer-events-none">
        <div className="container mx-auto flex items-center gap-4">
           <div className="h-px flex-grow bg-white/20" />
           <span className="text-[10px] font-gaming tracking-[1em] uppercase">Architecture_Verification_Log</span>
           <div className="h-px w-24 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
