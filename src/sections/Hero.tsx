import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { SiLeetcode } from "react-icons/si";
import { Linkedin, Github, Mail, ShieldCheck, Zap, Terminal, Code2, BrainCircuit, X, Cpu, Activity, Database, User } from "lucide-react";
import ParticlesBackground from "../components/ParticlesBackground";
import ScrollReveal from "../components/ScrollReveal";

const SocialIcon = ({ icon: Icon, colorClass, shadowClass, href }: { icon: any, colorClass: string, shadowClass: string, href: string }) => (
  <motion.a
    whileHover={{ y: 4, scale: 0.98 }}
    whileTap={{ y: 8, scale: 0.95 }}
    href={href}
    className={`relative w-12 h-13 rounded-2xl flex items-center justify-center text-white transition-all duration-200 ${colorClass} ${shadowClass} group overflow-visible`}
  >
    {/* Inner strong top reflection for 3D realism */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
    <Icon className="w-6 h-6 relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] transform-gpu group-hover:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] transition-all duration-200" />
  </motion.a>
);

const FloatingIcon = ({ icon: Icon, className, delay }: { icon: any, className: string, delay: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5, delay, ease: "easeInOut" }}
    className={`absolute w-12 h-12 rounded-full border border-[#3b82f6]/50 bg-[#0a0f1a]/80 backdrop-blur-sm flex items-center justify-center text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.2)] ${className}`}
  >
    <Icon className="w-5 h-5" />
  </motion.div>
);

export default function Hero() {
  const [showCV, setShowCV] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render heavy 3D Splines when the Hero section is actually visible!
  // This saves massive GPU usage when the user scrolls down to other sections.
  const isHeroInView = useInView(containerRef, { margin: "200px 0px 500px 0px" });

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-12 pb-0 cyber-grid scanline">
      <ParticlesBackground id="hero-particles" type="neural" />

      {/* Home specific background (Restored!)
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none transition-opacity duration-1000">
        {isHeroInView && <Spline scene="https://prod.spline.design/e8lxPKR20tErh2ni/scene.splinecode" />}
      </div> */}

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        {/* Left Column: Content */}
        <div className="flex-1 flex flex-col items-start text-left w-full lg:w-[45%] mt-10 lg:mt-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col gap-0 mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-white/40 tracking-tight font-gaming uppercase leading-none">
                Hi, I'm
              </h2>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter font-gaming leading-[0.8] uppercase mt-2">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#3b82f6] to-[#bd00ff] drop-shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                  Hemanth <br /> Kumar
                </span>
              </h2>
            </div>
            <h3 className="text-xl md:text-2xl text-gray-300 font-semibold mb-6">
              Computer Science Engineer <span className="text-[#3b82f6]">|</span> Full Stack Developer <span className="text-[#3b82f6]">|</span> ML Enthusiast
            </h3>
            <p className="text-gray-400 mb-10 max-w-lg leading-relaxed text-lg">
              Pursuing an under grad degree at Lovely Professional University
            </p>

            {/* Buttons - Futuristic Gaming Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 mt-6 relative z-20 w-full sm:w-fit">
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group relative px-8 py-4 bg-[var(--color-primary)] text-black font-black font-gaming text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                <Terminal className="w-5 h-5 transition-transform group-hover:rotate-12" /> ACCESS_PROJECTS
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                href="/certificates/Hemanth.pdf"
                download="Hemanth_Kumar_Reddy_Resume.pdf"
                className="group relative px-8 py-4 border-2 border-[var(--color-primary)]/30 text-[var(--color-primary)] font-black font-gaming text-sm tracking-widest hover:bg-[var(--color-primary)]/10 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
              >
                <ShieldCheck className="w-5 h-5" /> DOWNLOAD_INTEL
              </motion.a>

              <div className="sm:col-span-2 flex items-center gap-4 mt-2">
                <SocialIcon
                  href="https://www.linkedin.com/in/"
                  icon={Linkedin}
                  colorClass="bg-black/40 border border-[#00f5ff]/20"
                  shadowClass="shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.4)]"
                />
                <SocialIcon
                  href="https://github.com/HemanthKumarReddy"
                  icon={Github}
                  colorClass="bg-black/40 border border-[#bd00ff]/20"
                  shadowClass="shadow-[0_0_15px_rgba(189,0,255,0.2)] hover:shadow-[0_0_25px_rgba(189,0,255,0.4)]"
                />
                <SocialIcon
                  href="mailto:hemanthkumarreddy038@gmail.com"
                  icon={Mail}
                  colorClass="bg-black/40 border border-white/10"
                  shadowClass="shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
        {/* Spacer for Absolute Robot */}
        <div className="hidden lg:block flex-1" />

        {/* Right Column: Circular Image & Floating Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-full lg:w-[45%] flex justify-center lg:justify-end relative mt-16 lg:mt-0 z-10"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 p-4 flex items-center justify-center">
            {/* OCTAGONAL INDUSTRIAL FRAME */}
            <div className="absolute inset-0 octagonal-frame bg-gradient-to-br from-[#00f5ff]/20 via-transparent to-[#bd00ff]/20 shadow-[0_0_40px_rgba(0,245,255,0.1)] border-2 border-white/5" />

            {/* Inner Octagonal Container for Image */}
            <div className="relative w-full h-full octagonal-frame overflow-hidden border-2 border-[#00f5ff]/40 shadow-[inset_0_0_20px_rgba(0,245,255,0.2)]">
              <img
                src="/file_000000001784720ba6580808de98d6ba.png"
                alt="Hemanth Kumar"
                className="w-full h-full object-cover scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* HUD OVERLAYS */}
              <div className="absolute inset-0 bg-[#00f5ff]/5 pointer-events-none" />
              <div className="absolute inset-0 hud-scanline opacity-20 pointer-events-none" />

              {/* Animated HUD Text Markers */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <Activity className="w-3 h-3 text-[var(--color-primary)] animate-pulse" />
                <span className="text-[8px] font-gaming text-[var(--color-primary)] tracking-[0.3em]">SCAN_ACTIVE</span>
              </div>
            </div>

            {/* EXTERNAL CORNER MARKERS */}
            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-[var(--color-secondary)] shadow-[0_0_10px_var(--color-secondary)]" />

            {/* Floating Icons Updated for better visibility */}
            <FloatingIcon icon={Code2} className="top-10 -left-12" delay={0} />
            <FloatingIcon icon={Cpu} className="bottom-20 -left-14" delay={1} />
            <FloatingIcon icon={Terminal} className="bottom-10 right-4" delay={2} />
          </div>
        </motion.div>
      </div>

      {/* CTA Buttons at the bottom of the section */}


      <AnimatePresence>
        {showCV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
            onClick={() => setShowCV(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050810] border border-[#3b82f6]/30 w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] relative"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/40">
                <User className="w-5 h-5 text-[#3b82f6]" /> Hemanth_Kumar_Reddy_Resume.pdf
                <button
                  onClick={() => setShowCV(false)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-[#ff0055] transition-colors text-white cursor-pointer group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
              <iframe
                src="/certificates/Hemanth.pdf"
                className="w-full flex-grow bg-white border-none"
                title="CV Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Spline - Absolute positioned at the very bottom */}
      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-auto z-10 transition-opacity duration-1000 overflow-visible">
        {isHeroInView && (
          <Spline scene="https://prod.spline.design/XsM5ixmTunsJ4Xem/scene.splinecode" className="overflow-visible" />
        )}
      </div>

      {/* Bottom Gradient Mask */}
      <div className="hero-bottom-mask" />
    </section>
  );
}
