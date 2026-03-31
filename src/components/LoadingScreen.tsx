import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Terminal, Cpu, Database, Activity } from "lucide-react";

const bootLogs = [
  "BIOS_REV_4.0_READY",
  "CORE_TEMP_OPTIMAL_32C",
  "UPLINK_ESTABLISHED_SAT_LINK",
  "ENCRYPTING_PACKET_STREAMS",
  "LOAD_KERN_MOD_REACT_V18",
  "SYNC_GL_BUFFERS",
  "FETCH_INTEL_HEMANTH_PVT",
  "ALL_SYSTEMS_OPERATIONAL"
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void, key?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 5000;
    const interval = 40;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min((step / steps) * 100, 100);
      setProgress(nextProgress);
      
      if (step % 12 === 0) {
        setCurrentLog(prev => Math.min(prev + 1, bootLogs.length - 1));
      }

      if (step >= steps) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }
    }, interval);

    // Canvas matrix-ish background logic
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      ctx.fillStyle = 'rgba(5, 8, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.font = '10px monospace';
      
      for (let i = 0; i < 50; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(text, Math.random() * canvas.width, Math.random() * canvas.height);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        filter: isExiting ? "hue-rotate(90deg) blur(20px)" : "none"
      }}
      className="fixed inset-0 z-[10000] bg-[#050810] flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      
      {/* Glitch Overlay for exit */}
      {isExiting && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 1, 0, 0.5, 0] }}
           className="absolute inset-0 bg-white z-50 mix-blend-overlay"
         />
      )}

      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
             </div>
             <div>
                <h2 className="text-white font-gaming text-sm tracking-widest uppercase">Booting_System_Mainframe</h2>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                   <span className="text-[9px] font-mono text-gray-500 uppercase tracking-tighter">SECURE_LINK_ENCRYPTED</span>
                </div>
             </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/20 font-mono text-[10px]">
             <span>{new Date().toLocaleDateString()}</span>
             <span>ID: HG-001</span>
          </div>
        </div>

        {/* LOGS AREA */}
        <div className="mb-12 h-20 overflow-hidden font-mono text-[10px] text-gray-500 space-y-1">
           {bootLogs.slice(0, currentLog + 1).map((log, i) => (
             <motion.div 
                key={log + i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
             >
                <span className="text-[var(--color-primary)] opacity-40">{">"}</span>
                <span className={i === currentLog ? "text-white" : ""}>{log}...</span>
                {i === currentLog && <div className="w-1.5 h-3 bg-[var(--color-primary)] animate-pulse" />}
             </motion.div>
           ))}
        </div>

        {/* PREVIEW IMAGE PLACEHOLDER EFFECT */}
        <div className="relative w-full aspect-square max-h-[300px] mb-12 flex items-center justify-center">
           <div className="absolute inset-0 octagonal-frame border border-white/5 bg-white/[0.02]" />
           <div className="relative w-48 h-48 octagonal-frame overflow-hidden border border-[var(--color-primary)]/30 opacity-20">
              <div className="absolute inset-0 hud-scanline" />
              <Activity className="absolute inset-0 m-auto w-12 h-12 text-[var(--color-primary)]/40 animate-ping" />
           </div>
        </div>

        {/* LOADING BAR */}
        <div className="space-y-4">
           <div className="flex items-center justify-between font-gaming text-xs text-[var(--color-primary)] tracking-widest mb-1 pl-1">
              <span>SYSTEM_SYNCHRONIZING</span>
              <span>{Math.round(progress)}%</span>
           </div>
           <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] shadow-[0_0_15px_rgba(0,245,255,0.5)]"
                 style={{ width: `${progress}%` }}
              />
           </div>
           <div className="flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase">
              <div className="flex gap-4">
                 <span>RATE: 1024KB/S</span>
                 <span>LATENCY: 5MS</span>
              </div>
              <span className="animate-pulse">Awaiting_Ready_Signal...</span>
           </div>
        </div>
      </div>

      {/* Decorative Corner Markers */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-white/5 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-white/5 pointer-events-none" />
    </motion.div>
  );
}
