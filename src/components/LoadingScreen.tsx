import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, ShieldCheck, Zap, Radio, X } from "lucide-react";

const bootLogs = [
  "BIOS_READY_STATION_V4",
  "CORE_TEMP_OPTIMAL_32C",
  "UPLINK_STABLE_ENCRYPTED",
  "KERNEL_MODS_LOADED(RX-18)",
  "SYNCING_NEURAL_BUFFERS",
  "FETCHING_INTEL_H_K_R",
  "DECRYPTING_DASHBOARD_UI",
  "ALL_SYSTEMS_OPERATIONAL"
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void, key?: string }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 4000;
    const intervalSelection = 30;
    const steps = duration / intervalSelection;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min((step / steps) * 100, 100);
      setProgress(nextProgress);
      
      if (step % 15 === 0) {
        setCurrentLog(prev => Math.min(prev + 1, bootLogs.length - 1));
      }

      if (step >= steps) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(onComplete, 1000);
      }
    }, intervalSelection);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[10000] bg-[#020408] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d4ed8_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-8 flex flex-col items-center">
        
        {/* Central Cyber Core */}
        <div className="relative mb-16">
           {/* Rotating Outer Ring */}
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 border border-dashed border-[var(--color-primary)]/20 rounded-full"
           />
           <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-40 h-40 border border-dotted border-[var(--color-secondary)]/20 rounded-full scale-110"
           />

           {/* Central Hexagonal Core */}
           <div 
              className="absolute inset-0 m-auto w-24 h-24 bg-[#050810] border-2 border-[var(--color-primary)] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.2)]"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
           >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent" />
              <div className="absolute inset-0 hud-scanline opacity-20" />
              <Cpu className="w-10 h-10 text-[var(--color-primary)] animate-pulse" />
           </div>

           {/* Pulse Ring */}
           <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 m-auto w-24 h-24 border-2 border-[var(--color-primary)]/40 rounded-full"
           />
        </div>

        {/* LOGS HEADER */}
        <div className="w-full mb-8 flex items-center justify-between border-b border-white/5 pb-4">
           <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-[10px] font-gaming text-white tracking-[0.4em] uppercase">Boot_Sequence_4.0</span>
           </div>
           <div className="flex items-center gap-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <Radio className="w-3 h-3 text-green-500 animate-pulse" />
                 LINK_ACTIVE
              </div>
           </div>
        </div>

        {/* TERMINAL LOGS */}
        <div className="w-full h-24 mb-12 font-mono text-[10px] text-gray-500 overflow-hidden">
           {bootLogs.slice(0, currentLog + 1).map((log, i) => (
             <motion.div 
               key={log}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 mb-1"
             >
               <span className="text-[var(--color-primary)] text-[8px] opacity-40">[{new Date().toLocaleTimeString().slice(-5)}]</span>
               <span className={i === currentLog ? "text-white" : ""}>{log}</span>
               {i === currentLog && <div className="w-1.5 h-3 bg-[var(--color-primary)] animate-pulse" />}
             </motion.div>
           ))}
        </div>

        {/* PROGRESS SYSTEM */}
        <div className="w-full space-y-6">
           <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] animate-spin-slow" />
                 <span className="text-[10px] font-gaming text-white/40 tracking-[0.3em]">INITIALIZING_CORE</span>
              </div>
              <span className="text-xs font-gaming text-[var(--color-primary)] font-black">{Math.round(progress)}%</span>
           </div>
           
           <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] shadow-[0_0_20px_var(--color-primary)] rounded-full relative"
              >
                 <div className="absolute inset-0 hud-scanline opacity-30" />
              </motion.div>
           </div>

           <div className="flex justify-center">
              <span className="text-[8px] font-gaming text-white/20 tracking-[0.5em] uppercase animate-pulse">Awaiting_STATION_SYNC...</span>
           </div>
        </div>

      </div>

      {/* Frame Decor */}
      <div className="absolute top-12 left-12 w-32 h-32 border-t border-l border-white/5" />
      <div className="absolute bottom-12 right-12 w-32 h-32 border-b border-r border-white/5" />
      <div className="absolute top-12 right-12 text-[10px] font-gaming text-white/5 tracking-[0.8em] vertical-text">MAIN_FRAME</div>
      <div className="absolute bottom-12 left-12 text-[10px] font-gaming text-white/5 tracking-[0.8em] vertical-text">SECURE_LINK</div>
    </motion.div>
  );
}
