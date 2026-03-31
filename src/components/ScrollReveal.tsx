import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getHiddenVariant = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 60, rotateX: -15, scale: 0.95 };
      case "down":
        return { opacity: 0, y: -60, rotateX: 15, scale: 0.95 };
      case "left":
        return { opacity: 0, x: 60, rotateY: 15, scale: 0.95 };
      case "right":
        return { opacity: 0, x: -60, rotateY: -15, scale: 0.95 };
      case "none":
        return { opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getHiddenVariant(),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ perspective: 1200, willChange: "transform, opacity" }}
    >
      <div className="transform-gpu h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
