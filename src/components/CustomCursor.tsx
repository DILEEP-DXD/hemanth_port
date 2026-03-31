import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Real mouse position
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  // Outer ring position (interpolated via rAF)
  const ringX = useRef(0);
  const ringY = useRef(0);
  
  // Use framer motion values for the DOM style binding
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const outlineX = useMotionValue(-100);
  const outlineY = useMotionValue(-100);

  // Smooth springs for the inner dot
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide cursor on initial load by putting it off-screen, then attach moves
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
    outlineX.set(window.innerWidth / 2);
    outlineY.set(window.innerHeight / 2);
    mouseX.current = window.innerWidth / 2;
    mouseY.current = window.innerHeight / 2;
    ringX.current = window.innerWidth / 2;
    ringY.current = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      // Target dot immediately tracks mouse
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, [role='button'], .hover-magnetic")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Render loop for outer ring lerping (Ultra smooth 0 lag)
    let animationFrameId: number;
    const render = () => {
      // Lerp ring towards real mouse position
      ringX.current += (mouseX.current - ringX.current) * 0.2;
      ringY.current += (mouseY.current - ringY.current) * 0.2;

      outlineX.set(ringX.current);
      outlineY.set(ringY.current);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY, outlineX, outlineY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center transform-gpu"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(0, 255, 255, 0.5)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 255, 0.1)" : "transparent",
          borderColor: isHovering ? "rgba(124, 58, 237, 0.8)" : "rgba(0, 255, 255, 0.5)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            className="absolute w-full h-full bg-[#3b82f6] rounded-full blur-[10px]" 
          />
        )}
      </motion.div>
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#3b82f6] rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#3b82f6] transform-gpu"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
