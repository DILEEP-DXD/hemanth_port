import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MagneticCursor } from "./components/ui/magnetic-cursor";
import LoadingScreen from "./components/LoadingScreen";
import { Menu, X, Home, Folder, Trophy, Mail, User, Code2, Award, FileText, GraduationCap, ArrowUp } from "lucide-react";

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
    { name: "Certifications & Courses", href: "#certifications", num: "05", icon: Award },
    { name: "Education", href: "#education", num: "06", icon: GraduationCap },
    { name: "Contact", href: "#contact", num: "07", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            x: isAtBottom ? "-120%" : "-50%",
            left: isAtBottom ? "40%" : "50%"
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 20 }}
          className="fixed bottom-12 z-50 w-auto max-w-fit px-2 py-2"
        >
          <div className="bg-[#050505]/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl flex items-center gap-1 p-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group p-3 rounded-xl transition-colors hover:bg-white/5"
              >
                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                
                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-[10px] font-orbitron font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap tracking-wider shadow-xl">
                  {link.name.toUpperCase()}
                </span>
                
                {/* Active Indicator (subtle dot) */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_5px_var(--color-primary)]" />
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Back to Top Button */}
        <AnimatePresence>
          {isAtBottom && (
            <motion.button
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-12 right-8 z-[100] p-4 bg-black/60 border-2 border-[var(--color-primary)]/50 text-[var(--color-primary)] rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,245,255,0.3)] flex items-center gap-2 group cursor-pointer"
            >
              <span className="text-[10px] font-gaming tracking-widest hidden md:block">BACK_TO_TOP</span>
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </motion.button>
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
              <Contact />
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
