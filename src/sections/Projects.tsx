import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code2, X, MonitorPlay, Terminal, Cpu, Database, Layout } from "lucide-react";

const projects = [
  {
    title: "Java Full Stack Gym Web App",
    description: "Constructed a gym website where users can register and explore exercise and diet-related pages.",
    extendedDescription: "Integrated user authentication using Servlets and JSP to validate credentials. Architected and managed the MySQL database for storing user data. Built following MVC architecture for a structured workflow, achieving 100% success rate during authentication tests.",
    tags: ["Java", "Servlets", "JSP", "MySQL", "HTML/CSS"],
    link: "https://github.com/HemanthKumarReddy", 
    github: "https://github.com/HemanthKumarReddy",
    image: "/gym-app.png",
    category: "FULL_STACK",
    status: "COMPLETE"
  },
  {
    title: "Sign Gesture Interpreter (CNN)",
    description: "Developed a Deaf Sign Language Prediction system using a CNN model to interpret gestures.",
    extendedDescription: "Collected and pre-processed sign language gesture images using Python, Matplotlib, and CV2. Optimized accuracy with dropout and batch normalization. Assists in communication for the deaf community by translating gestures into text or speech.",
    tags: ["Python", "CNN", "CV2", "Matplotlib", "Deep Learning"],
    link: "https://github.com/HemanthKumarReddy",
    github: "https://github.com/HemanthKumarReddy",
    image: "/sign-interpreter.png",
    category: "COMPUTER_VISION",
    status: "COMPLETE"
  },
  {
    title: "ML Travel Time Predictor",
    description: "Developed a predictive model using Random Forest to estimate travel times based on real-world data.",
    extendedDescription: "Processed and analysed transportation data using Pandas, NumPy, and Seaborn for data cleaning and visualization. Trained machine learning models using Scikit-Learn, improving accuracy through feature selection and rigorous metric evaluation (MAE, F1-score).",
    tags: ["Python", "Random Forest", "Scikit-Learn", "Pandas"],
    link: "https://github.com/HemanthKumarReddy",
    github: "https://github.com/HemanthKumarReddy",
    image: "/travel-predictor.png",
    category: "AI/ML",
    status: "COMPLETE"
  },
];

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "AI/ML": return <Cpu className="w-4 h-4" />;
    case "COMPUTER_VISION": return <Layout className="w-4 h-4" />;
    case "FULL_STACK": return <Database className="w-4 h-4" />;
    default: return <Terminal className="w-4 h-4" />;
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDemoView, setIsDemoView] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  const closeDialog = () => {
    setSelectedProject(null);
    setIsDemoView(false);
  };

  return (
    <section id="projects" className="relative min-h-screen w-full py-24 px-6 overflow-hidden cyber-grid">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
            <h2 className="text-4xl md:text-5xl font-black font-orbitron tracking-tighter">PROJECTS_HUB</h2>
            <div className="flex-grow h-px bg-white/10 ml-4" />
          </div>
          <p className="text-gray-500 font-mono text-sm max-w-xl">{"[LOG: Accessing local repository... 100% SECURE]"}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              layoutId={`card-${project.title}`}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative"
            >
              {/* Industrial Cyber Border Component */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-[var(--color-primary)]/50 transition-colors duration-500" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl overflow-hidden bg-[#020408]/80 backdrop-blur-xl h-full flex flex-col p-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                    <CategoryIcon category={project.category} />
                    <span className="text-[10px] font-bold font-orbitron text-gray-400">{project.category}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-primary)] animate-pulse">{project.status}</span>
                </div>

                {/* Project Image Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-white/5">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                   {project.image ? (
                     <motion.img 
                       layoutId={`image-${project.title}`}
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center opacity-20">
                        <Code2 className="w-12 h-12" />
                     </div>
                   )}
                </div>

                {/* Content */}
                <motion.h3 layoutId={`title-${project.title}`} className="text-xl font-black font-orbitron mb-3 text-white truncate">{project.title}</motion.h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Footer Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-black/40 border border-white/5 rounded font-mono text-gray-500 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Action */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-16 text-center"
        >
          <a
            href="https://github.com/HemanthKumarReddy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[var(--color-primary)] hover:text-black hover:border-[var(--color-primary)] transition-all font-orbitron font-bold text-sm"
          >
            <Github className="w-5 h-5" /> REPOSITORY_ROOT
          </a>
        </motion.div>
      </div>

      {/* Modal - Unified Interface */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] cursor-pointer"
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.title}`}
                className="bg-[#020408] border border-white/10 rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,1)]"
              >
                <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                    {/* Visual Side */}
                    <div className="md:w-1/2 relative bg-black flex items-center justify-center">
                        {selectedProject.image ? (
                          <motion.img 
                            layoutId={`image-${selectedProject.title}`}
                            src={selectedProject.image} 
                            className="w-full h-full object-cover opacity-60" 
                          />
                        ) : (
                          <Code2 className="w-24 h-24 text-white/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] md:bg-gradient-to-r md:from-transparent md:to-[#020408]" />
                        
                        <div className="absolute top-6 left-6 z-20">
                           <div className="flex items-center gap-2 p-2 bg-black/60 border border-white/10 backdrop-blur-md rounded-xl">
                              <CategoryIcon category={selectedProject.category} />
                              <span className="text-xs font-bold font-orbitron">{selectedProject.category}</span>
                           </div>
                        </div>
                    </div>

                    {/* Data Side */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col bg-[#020408]">
                        <div className="flex justify-between items-start mb-8">
                           <motion.h2 layoutId={`title-${selectedProject.title}`} className="text-3xl md:text-5xl font-black font-orbitron tracking-tighter text-white">{selectedProject.title}</motion.h2>
                           <button onClick={closeDialog} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-[var(--color-primary)]">
                              <X className="w-8 h-8" />
                           </button>
                        </div>

                        <div className="space-y-6 flex-grow">
                           <p className="text-gray-400 text-lg font-light leading-relaxed">
                              {selectedProject.extendedDescription}
                           </p>
                           
                           <div className="flex flex-wrap gap-2">
                             {selectedProject.tags.map(tag => (
                               <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-[var(--color-primary)]">
                                 {tag}
                               </span>
                             ))}
                           </div>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                           {selectedProject.github && (
                             <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-orbitron font-bold text-sm hover:bg-[var(--color-primary)] transition-colors">
                               <Github className="w-5 h-5" /> SOURCE_CODE
                             </a>
                           )}
                           {selectedProject.link && (
                             <button onClick={() => setIsDemoView(true)} className="flex-1 flex items-center justify-center gap-3 border border-white/10 bg-white/5 py-4 rounded-2xl font-orbitron font-bold text-sm hover:border-[var(--color-primary)]/50 transition-all">
                               <MonitorPlay className="w-5 h-5 text-[var(--color-primary)]" /> LIVE_DEMO
                             </button>
                           )}
                        </div>
                    </div>
                </div>

                {/* Sub-Modal Overlay (Demo) */}
                <AnimatePresence>
                  {isDemoView && (
                    <motion.div 
                       initial={{ y: "100%" }}
                       animate={{ y: 0 }}
                       exit={{ y: "100%" }}
                       transition={{ type: "spring", damping: 30, stiffness: 300 }}
                       className="absolute inset-0 bg-[#020408] z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                           <button onClick={() => setIsDemoView(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl font-orbitron font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors">
                              <X className="w-4 h-4" /> REVERT_TO_DATA
                           </button>
                           <span className="text-xs font-mono text-gray-500 animate-pulse">CONNECTING TO SIMULATOR...</span>
                        </div>
                        <iframe src={selectedProject.link} className="w-full flex-grow border-none bg-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
