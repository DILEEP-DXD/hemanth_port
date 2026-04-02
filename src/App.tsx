import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import LoadingScreen from "./components/LoadingScreen";
import { 
  Menu, X, Home, Folder, Trophy, Mail, User, Code2, Award, 
  FileText, GraduationCap, ArrowUp, Download, ExternalLink, 
  Eye, Monitor, FileDown, Rocket, ChevronUp 
} from "lucide-react";

// Lazy load heavy components and sections
const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Education = lazy(() => import("./sections/Education"));
const Skills = lazy(() => import("./sections/Skills"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Trainings = lazy(() => import("./sections/Trainings"));
const Contact = lazy(() => import("./sections/Contact"));

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showResumeHUD, setShowResumeHUD] = useState(false);

  const resumeLink = "/hemanth-cv.pdf";

  // Eliminate React scroll jank by using native hardware-accelerated scroll tracking
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Bottom detection logic
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", num: "01", icon: Home },
    { name: "About", href: "#about", num: "02", icon: User },
    { name: "Skills", href: "#skills", num: "03", icon: Code2 },
    { name: "Projects", href: "#projects", num: "04", icon: Folder },
    { name: "Certifications", href: "#certifications", num: "05", icon: Award },
    { name: "Education", href: "#education", num: "06", icon: GraduationCap },
    { name: "Contact", href: "#contact", num: "07", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Variants for navbar tooltips to fix hover visibility
  const tooltipVariants = {
    initial: { opacity: 0, y: 10, scale: 0.8, x: "-50%" },
    hover: { 
      opacity: 1, 
      y: -45, 
      scale: 1, 
      x: "-50%",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <MagneticCursor
      magneticFactor={0.1}
      blendMode="normal"
      cursorColor="#00f5ff"
      cursorClassName="shadow-[0_0_20px_rgba(0,245,255,0.6)] z-[9999]"
      cursorSize={12}
    >
      <AnimatePresence mode="wait">
        {initialLoading && <LoadingScreen key="loader" onComplete={() => setInitialLoading(false)} />}
      </AnimatePresence>

      <div className={`bg-[var(--color-bg-dark)] text-white min-h-screen font-sans selection:bg-[var(--color-primary)]/30 selection:text-white relative transition-opacity duration-1000 ${initialLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        
        {/* Navigation - Floating Dock Style */}
        <motion.nav
          initial={{ y: 50, opacity: 0, x: "-50%" }}
          animate={{ 
            y: initialLoading ? 100 : 0, 
            opacity: 1, 
            x: "-50%",
            left: "50%"
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
          className="fixed bottom-12 z-50 w-auto max-w-fit px-4 py-2"
        >
          <div className="bg-[#050505]/80 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl flex items-center gap-1 p-1.5">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                data-magnetic
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="relative group p-3 rounded-xl transition-colors hover:bg-white/5 z-10"
              >
                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                
                {/* Fixed Tooltip using Variants */}
                <motion.span 
                  variants={tooltipVariants}
                  className="absolute left-1/2 px-3 py-1.5 bg-black/90 border border-[var(--color-primary)]/40 text-[var(--color-primary)] text-[9px] font-gaming font-bold rounded-lg pointer-events-none whitespace-nowrap tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)]"
                >
                  {link.name.toUpperCase()}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black border-r border-b border-[var(--color-primary)]/40 rotate-45" />
                </motion.span>
                
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_5px_var(--color-primary)]" />
              </motion.a>
            ))}

            <div className="w-px h-6 bg-white/10 mx-2" />

            {/* UPDATED RESUME BUTTON WITH NEW ICON */}
            <div className="flex items-center bg-white/5 rounded-xl border border-white/5 overflow-hidden group/resume">
               <motion.button
                 data-magnetic
                 whileHover={{ backgroundColor: "rgba(0, 245, 255, 0.1)" }}
                 onClick={() => setShowResumeHUD(true)}
                 className="flex items-center gap-2 px-4 py-2 text-[10px] font-gaming font-bold text-gray-300 hover:text-[var(--color-primary)] transition-colors border-r border-white/5"
               >
                 <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                 PREVIEW
               </motion.button>
               <motion.a
                 data-magnetic
                 href={resumeLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ backgroundColor: "rgba(0, 245, 255, 0.1)" }}
                 className="flex items-center justify-center p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                 title="Download CV"
               >
                 <FileDown className="w-4 h-4" />
               </motion.a>
            </div>
          </div>
        </motion.nav>

        {/* Enhanced Back to Top Button - Aggressive Gaming Style */}
        <AnimatePresence>
          {isAtBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 100, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 100, rotate: 20 }}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-12 right-12 z-[150] cursor-pointer group"
              data-magnetic
            >
              <div className="relative">
                {/* Multi-layered Glow */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-3xl rounded-full scale-150 group-hover:bg-[var(--color-primary)]/40 transition-all duration-700" />
                
                {/* Industrial Octagonal Frame */}
                <div className="relative w-20 h-20 bg-[#020408]/90 border-2 border-[var(--color-primary)]/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_40px_rgba(0,245,255,0.4)]"
                     style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 via-transparent to-transparent opacity-50" />
                   <div className="absolute inset-0 hud-scanline opacity-30" />
                   
                   {/* Orbiting Ring */}
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 border border-t-[var(--color-primary)] border-transparent rounded-full opacity-20"
                   />

                   <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="relative z-10 flex flex-col items-center"
                   >
                      <Rocket className="w-7 h-7 text-[var(--color-primary)] filter drop-shadow-[0_0_8px_var(--color-primary)]" />
                   </motion.div>
                </div>

                {/* Cyber Label - Using variants for consistent hover */}
                <motion.div 
                   variants={{
                     initial: { opacity: 0, y: 10, scale: 0.8, x: "-50%" },
                     hover: { opacity: 1, y: -10, scale: 1, x: "-50%" }
                   }}
                   initial="initial"
                   className="absolute left-1/2 w-max px-4 py-1.5 bg-[#12141a]/95 border border-[var(--color-primary)]/30 rounded-md backdrop-blur-xl flex flex-col items-center gap-1 pointer-events-none"
                >
                   <span className="text-[10px] font-gaming font-black text-[var(--color-primary)] tracking-[0.5em] uppercase drop-shadow-[0_0_5px_rgba(0,245,255,1)]">
                     NAV_TO_TOP
                   </span>
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[var(--color-primary)]/40 rounded-full animate-ping" />
                      <div className="w-1 h-1 bg-[var(--color-primary)]/40 rounded-full" />
                      <div className="w-1 h-1 bg-[var(--color-primary)]/40 rounded-full" />
                   </div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-[var(--color-primary)] text-black font-gaming font-bold text-[8px] px-2 py-0.5 rounded shadow-[0_0_10px_var(--color-primary)]">
                   {Math.round(scrollYProgress.get() * 100)}%
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* RESUME PREVIEW HUD (Previous content preserved) */}
        <AnimatePresence>
          {showResumeHUD && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
              onClick={() => setShowResumeHUD(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#050810] border-2 border-[var(--color-primary)]/30 w-full max-w-6xl h-[90vh] rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,245,255,0.2)] relative"
              >
                {/* HUD Header */}
                <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                      <FileText className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="text-white font-gaming text-lg tracking-widest uppercase mb-1">IDENT_RESUME_V2.0</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                        <span className="text-[10px] font-terminal text-gray-500 uppercase tracking-widest">STATUS: AUTHENTICATED_ACCESS</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={resumeLink}
                      target="_blank"
                      className="px-6 py-3 bg-[var(--color-primary)] text-black font-gaming font-bold text-[10px] tracking-widest rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)]"
                    >
                      <ExternalLink className="w-4 h-4" /> OPEN_IN_DRIVE
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      href={resumeLink} 
                      className="p-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-all"
                      title="Download CV"
                    >
                      <Download className="w-5 h-5" />
                    </motion.a>
                    <div className="w-px h-8 bg-white/10 mx-2" />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowResumeHUD(false)}
                      className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Content Frame */}
                <div className="flex-1 bg-black/40 p-4 relative">
                  <div className="absolute inset-0 bg-[#00f5ff]/5 pointer-events-none z-10" />
                  <div className="absolute inset-0 hud-scanline opacity-10 pointer-events-none z-10" />
                  <iframe
                    src={resumeLink}
                    className="w-full h-full border-none rounded-2xl relative z-0"
                    title="Resume Preview"
                  />
                  
                  {/* Digital Borders for aesthetic enhancement */}
                  <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[var(--color-primary)]/30 rounded-tr-3xl pointer-events-none" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[var(--color-primary)]/30 rounded-bl-3xl pointer-events-none" />
                </div>
                
                {/* HUD Footer Decor */}
                <div className="p-4 bg-black/60 border-t border-white/5 flex justify-center">
                   <div className="flex items-center gap-12 font-terminal text-[10px] text-gray-600 tracking-[0.4em] uppercase">
                      <div className="flex items-center gap-2"><div className="w-1 h-1 bg-[var(--color-primary)]" /> SECURE_PHASE</div>
                      <div className="flex items-center gap-2"><div className="w-1 h-1 bg-[var(--color-primary)]" /> ENCRYPTION_ACTIVE</div>
                      <div className="flex items-center gap-2"><div className="w-1 h-1 bg-[var(--color-primary)]" /> PACKET_STABLE</div>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center gap-8 md:hidden will-change-transform"
            >
              {navLinks.map((link) => (
                <a
                   key={link.name}
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center text-2xl font-medium text-gray-300 hover:text-[#00ffff] transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {!initialLoading && (
          <Suspense fallback={<div className="min-h-screen" />}>
            <main className="relative z-10 w-full flex flex-col items-center overflow-x-hidden">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Trainings />
              <Certifications />
              <Education />
              <Contact onPreviewResume={() => setShowResumeHUD(true)} />
            </main>
          </Suspense>
        )}

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 py-8 text-center bg-[#020408]/80 backdrop-blur-md font-mono text-xs">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Hemanth Kumar Reddy. Crafted with passion, consistently pushing boundaries in tech.
          </p>
        </footer>
      </div>
    </MagneticCursor>
  );
}
