import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Download, X, ChevronLeft, ChevronRight, Award, ShieldCheck, Search, Globe, Eye } from "lucide-react";
import PdfPreview from "../components/ui/PdfPreview";

const certifications = [
  {
    title: "Master Generative AI & Tools",
    issuer: "Udemy",
    date: "Aug '25",
    image: "/hemanth-udemy.jpeg", // Image
    link: "/hemanth-udemy.jpeg",
    id: "UD-GEN-AI-2025",
    score: "COMPLETE"
  },
  {
    title: "Computational Theory",
    issuer: "Infosys",
    date: "Aug '25",
    image: "/hemanth-infosys.pdf", // PDF
    link: "/hemanth-infosys.pdf",
    id: "INF-SB-01",
    score: "COMPLETE"
  },
  {
    title: "DSA Performance",
    issuer: "iamneo",
    date: "Recent",
    image: "/hemanth-dsa.pdf", // PDF
    link: "/hemanth-dsa.pdf",
    id: "IAN-DSA-22",
    score: "A+"
  },

  {
    title: "Computer Networking",
    issuer: "Coursera",
    date: "Recent",
    image: "/hemanth-coursera.pdf", // PDF
    link: "/hemanth-coursera.pdf",
    id: "CR-NET-BITS-01",
    score: "COMPLETE"
  },
];

export default function Certifications() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedCertIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedCertIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((selectedCertIndex + 1) % certifications.length);
    }
  };

  const prevCert = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((selectedCertIndex - 1 + certifications.length) % certifications.length);
    }
  };

  return (
    <section id="certifications" className="relative min-h-screen w-full py-24 px-6 overflow-hidden cyber-grid bg-black/20">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black font-gaming tracking-tighter text-white uppercase">CREDENTIAL_VAULT</h2>
          </div>
          <p className="text-gray-500 font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest">{" >> "} Verification successful. displaying authenticated certificates...</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 group-hover:border-primary/40 overflow-hidden shadow-2xl h-full flex flex-col">
                 
                 {/* ID and Issuer */}
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <span className="text-[10px] font-mono text-gray-500 tracking-tighter">REF: {cert.id}</span>
                    <span className="text-[10px] font-gaming font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">{cert.issuer}</span>
                 </div>

                 {/* Cert Thumbnail with Glow */}
                 <div 
                    className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white/5 relative group/img cursor-pointer"
                    onClick={() => openLightbox(index)}
                 >
                    <PdfPreview fileUrl={cert.image} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                       <div className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_primary]">
                          <Eye className="w-5 h-5 transition-transform group-hover/img:scale-110" />
                       </div>
                    </div>
                 </div>

                 {/* Title */}
                 <h3 className="text-xl font-black font-gaming text-white mb-4 line-clamp-1 leading-none uppercase">{cert.title}</h3>

                 {/* Meta Info */}
                 <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Aquired</span>
                       <span className="text-xs font-bold text-gray-300 tracking-tighter">{cert.date}</span>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Performance</span>
                       <div className="flex items-center justify-end gap-1 text-primary">
                          <ShieldCheck className="w-3 h-3" />
                          <span className="text-xs font-bold">{cert.score}</span>
                       </div>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="mt-8 flex gap-3">
                    <a href={cert.link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors font-gaming font-bold text-[10px] tracking-widest">
                       <Globe className="w-4 h-4 text-primary" /> VERIFY
                    </a>
                    <a href={cert.link} target="_blank" className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white text-gray-100 hover:text-black border border-white/10 rounded-xl transition-all">
                       <Download className="w-4 h-4" />
                    </a>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer p-4 group">
              <X className="w-10 h-10 group-hover:rotate-90 transition-transform" />
            </button>

            <button className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer hidden md:block" onClick={prevCert}>
              <ChevronLeft className="w-16 h-16" />
            </button>
            <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer hidden md:block" onClick={nextCert}>
              <ChevronRight className="w-16 h-16" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 30 }}
              className="relative max-w-5xl w-full max-h-[85vh] p-2 bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_100px_rgba(0,245,255,0.1)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full min-h-[60vh]">
                 <PdfPreview fileUrl={certifications[selectedCertIndex].image} scale={2} />
              </div>
              
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full">
                 <h4 className="text-xl font-black font-gaming text-white uppercase tracking-tighter">{certifications[selectedCertIndex].title}</h4>
                 <p className="text-primary font-mono text-xs uppercase tracking-[0.5em] mt-1">{certifications[selectedCertIndex].issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
