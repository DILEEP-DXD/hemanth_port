import React from 'react';
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export default function GlowEdgeCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn("relative rounded-2xl p-[2px] overflow-hidden group", className)}
    >
      {/* Animated glowing edge (hidden until hover) wrapper to allow spinning */}
      <div className="absolute inset-[-100%] group-hover:animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,#3b82f6_360deg)]" />
      </div>
      
      {/* Fallback visible edge without hover */}
      <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
      
      {/* Inner dark surface */}
      <div className="relative h-full w-full bg-[#0a0f1a]/95 backdrop-blur-md rounded-2xl p-6 z-10 border border-transparent shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-inherit" />
        {children}
      </div>
    </motion.div>
  );
}
