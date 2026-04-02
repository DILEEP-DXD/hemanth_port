import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Zap, Cpu, Calendar, ShieldCheck, GraduationCap, MapPin, Eye, Download, X, Globe } from "lucide-react";
import PdfPreview from "../components/ui/PdfPreview";

export default function Trainings() {
  const [showCertPreview, setShowCertPreview] = useState(false);

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-32 overflow-hidden flex items-center justify-center cyber-grid bg-black/30"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

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
              Training and Internship
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
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_5px_#3b82f6]" />
                          <span className="text-[10px] font-terminal text-gray-500 uppercase tracking-widest">Status: MISSION_COMPLETE</span>
                       </div>
                    </div>
                 </div>
                 <div className="hidden md:block">
                    <span className="text-xs font-gaming text-white/20 tracking-[0.3em]">ID: TR_LPU_2022</span>
                 </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                 
                 {/* LEFT: MISSION SPECS */}
                 <div className="lg:col-span-7 p-10 space-y-10 border-r border-white/5">
                    <div>
                       <h4 className="text-3xl md:text-4xl font-black text-white font-gaming leading-tight uppercase mb-6">
                          Centre for Professional Advancement
                       </h4>
                       <div className="flex flex-wrap items-center gap-6 text-[10px] font-gaming text-[var(--color-primary)] tracking-[0.2em] uppercase">
                          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                             <MapPin className="w-3.5 h-3.5" />
                             <span>Lovely Professional University</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                             <Calendar className="w-3.5 h-3.5" />
                             <span>2022 - 2026 (EXP)</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <p className="text-white/80 text-lg leading-relaxed font-light border-l-4 border-[var(--color-primary)]/30 pl-8 italic">
                          "Currently engaged in advanced Computer Science Engineering training, focusing on large-scale AI system design, neural architectures, and industrial-grade software engineering modules."
                       </p>
                       
                       {/* PROGRESS TRACKER */}
                       <div className="space-y-4 pt-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                          <div className="flex justify-between text-[11px] font-gaming text-white/40 tracking-[0.2em]">
                             <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-[var(--color-primary)]" /> MISSION_COMPLETE</span>
                             <span className="text-[var(--color-primary)]">Phase_04 / 04</span>
                          </div>
                          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_20px_rgba(0,245,255,0.4)] rounded-full relative"
                             >
                                <div className="absolute inset-0 hud-scanline opacity-30" />
                             </motion.div>
                          </div>
                          <div className="flex justify-between text-[9px] font-mono text-gray-600">
                             <span>INIT_2022</span>
                             <span>PROJECTED_END_2026</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* RIGHT: CERTIFICATE FOCUS */}
                 <div className="lg:col-span-5 p-10 bg-white/[0.01] flex flex-col justify-center">
                    <div className="mb-6 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] font-gaming text-white/40 tracking-[0.3em] uppercase">Credential_Module</span>
                       </div>
                    </div>

                       <div 
                          className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/5 relative group cursor-pointer shadow-2xl hover:border-[var(--color-primary)]/30 transition-all duration-500"
                          onClick={() => setShowCertPreview(true)}
                       >
                          <PdfPreview fileUrl="/hemanth-advanced-dsa.pdf" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                             <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.6)]">
                                <Eye className="w-8 h-8" />
                             </div>
                             <span className="text-[10px] font-gaming text-[var(--color-primary)] font-bold tracking-[0.4em] uppercase">Authorize_Preview</span>
                          </div>
                       </div>

                       <div className="mt-8 grid grid-cols-2 gap-4">
                          <motion.button
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={() => setShowCertPreview(true)}
                             className="flex items-center justify-center gap-3 px-4 py-4 bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-xl font-gaming font-bold text-[10px] tracking-widest hover:bg-[var(--color-primary)]/20 transition-all"
                          >
                             <Eye className="w-4 h-4" /> PREVIEW
                          </motion.button>
                          <motion.a
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             href="/hemanth-advanced-dsa.pdf"
                             download
                             className="flex items-center justify-center gap-3 px-4 py-4 bg-white/5 text-gray-300 border border-white/10 rounded-xl font-gaming font-bold text-[10px] tracking-widest hover:bg-white/10 transition-all"
                          >
                             <Download className="w-4 h-4" /> DOWNLOAD
                          </motion.a>
                       </div>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                       <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-1">Accessing secure module:</p>
                       <p className="text-xs font-gaming text-[var(--color-primary)]/80 tracking-widest uppercase">LPU-CSE-205_DSA_V.4.0</p>
                    </div>
                 </div>

              </div>

              {/* FOOTER STATUS BAR */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-center gap-8">
                 <div className="flex items-center gap-2 text-[var(--color-primary)]">
                    <Zap className="w-4 h-4" />
                    <span className="text-[9px] font-gaming tracking-widest uppercase opacity-60">Verified_Academic_Access</span>
                 </div>
                 <div className="w-px h-4 bg-white/10" />
                 <div className="flex items-center gap-2 text-blue-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-gaming tracking-widest uppercase opacity-60">Encryption_STABLE</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* LIGHTBOX PREVIEW */}
        <AnimatePresence>
           {showCertPreview && (
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 z-[500] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4"
                 onClick={() => setShowCertPreview(false)}
              >
                 <button 
                    onClick={() => setShowCertPreview(false)}
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer p-4 group z-[510]"
                 >
                    <X className="w-10 h-10 group-hover:rotate-90 transition-transform" />
                 </button>

                 <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                    className="relative max-w-5xl w-full max-h-[85vh] p-2 bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,245,255,0.1)] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full h-full min-h-[60vh]">
                       <PdfPreview fileUrl="/hemanth-advanced-dsa.pdf" scale={2} />
                    </div>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-6">
                       <h4 className="text-xl font-black font-gaming text-white uppercase tracking-tighter">Advanced DSA (LPU Certify)</h4>
                       <p className="text-[var(--color-primary)] font-mono text-xs uppercase tracking-[0.5em] mt-1">LPU-CSE-205 VERIFIED_CREDENTIAL</p>
                    </div>
                 </motion.div>
              </motion.div>
           )}
        </AnimatePresence>

      </div>
    </section>
  );
}
