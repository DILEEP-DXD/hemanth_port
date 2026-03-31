import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary";
}

export default function GlassCard({ children, className, glowColor, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "glass-surface glass-surface--fallback rounded-2xl p-6 relative overflow-hidden group transform-gpu transition-all duration-300",
        glowColor === "primary" ? "hover:glow-primary" : "",
        glowColor === "secondary" ? "hover:glow-secondary" : "",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer z-0" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
