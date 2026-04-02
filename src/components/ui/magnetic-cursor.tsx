import React, { useRef, useEffect, FC, ReactNode, useState, useMemo } from 'react';
import gsap from 'gsap';

export class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) { this.x = x; this.y = y; }
  lerp(target: Vec2, amount: number) { 
    this.x += (target.x - this.x) * amount; 
    this.y += (target.y - this.y) * amount; 
    return this; 
  }
  clone() { return new Vec2(this.x, this.y); }
  sub(v: Vec2) { this.x -= v.x; this.y -= v.y; return this; }
  copy(v: Vec2) { this.x = v.x; this.y = v.y; return this; }
}
export const vec2 = (x: number, y: number) => new Vec2(x, y);

interface MagneticCursorProps {
  children: ReactNode;
  magneticFactor?: number;
  lerpAmount?: number;
  hoverPadding?: number;
  hoverAttribute?: string;
  cursorSize?: number;
  cursorColor?: string;
  blendMode?: 'difference' | 'exclusion' | 'normal' | 'screen' | 'overlay';
  cursorClassName?: string;
  shape?: 'circle' | 'square' | 'rounded-square';
  disableOnTouch?: boolean;
  speedMultiplier?: number;
  maxScaleX?: number;
  maxScaleY?: number;
  contrastBoost?: number;
}

interface CursorState {
  el: HTMLDivElement | null;
  pos: {
    current: Vec2;
    target: Vec2;
    previous: Vec2;
  };
  hover: { isHovered: boolean };
  isDetaching: boolean;
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
  children,
  lerpAmount = 0.5,
  magneticFactor = 0.2,
  hoverPadding = 12,
  hoverAttribute = 'data-magnetic',
  cursorSize = 24,
  cursorColor = 'white',
  blendMode = 'exclusion',
  cursorClassName = '',
  shape = 'circle',
  disableOnTouch = true,
  speedMultiplier = 0.02,
  maxScaleX = 1,
  maxScaleY = 0.3,
  contrastBoost = 1,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorStateRef = useRef<CursorState | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const activeListeners = useRef<Map<HTMLElement, any>>(new Map());

  const configRef = useRef({
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  });

  useEffect(() => {
    configRef.current = {
      magneticFactor,
      speedMultiplier,
      maxScaleX,
      maxScaleY,
      cursorSize,
      lerpAmount,
      hoverPadding,
    };
  }, [magneticFactor, speedMultiplier, maxScaleX, maxScaleY, cursorSize, lerpAmount, hoverPadding]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.35;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          previous: vec2(-100, -100),
        },
        hover: { isHovered: false },
        isDetaching: false,
      };
    }

    const update = () => {
      const state = cursorStateRef.current;
      if (!state || state.hover.isHovered) return;

      const { speedMultiplier, maxScaleX, maxScaleY, lerpAmount } = configRef.current;
      const effectiveLerp = prefersReducedMotion ? 1 : lerpAmount;

      state.pos.current.lerp(state.pos.target, effectiveLerp);
      const delta = state.pos.current.clone().sub(state.pos.previous);
      state.pos.previous.copy(state.pos.current);

      if (state.isDetaching) {
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          overwrite: 'auto'
        });
      } else {
        const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * speedMultiplier;
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
          scaleX: 1 + Math.min(speed, maxScaleX),
          scaleY: 1 - Math.min(speed, maxScaleY),
          overwrite: 'auto'
        });
      }
    };

    const attachMagnetic = (el: HTMLElement) => {
      if (activeListeners.current.has(el)) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.3)' });

      const handlePointerEnter = () => {
        const state = cursorStateRef.current;
        if (!state) return;
        state.hover.isHovered = true;
        state.isDetaching = false;

        const bounds = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        const magneticColor = el.getAttribute('data-magnetic-color') || cursorColor;
        const { magneticFactor, hoverPadding } = configRef.current;
        const dynamicPadding = hoverPadding * (1 + magneticFactor);

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
          width: bounds.width + dynamicPadding * 2,
          height: bounds.height + dynamicPadding * 2,
          borderRadius: computedStyle.borderRadius,
          backgroundColor: magneticColor,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: true
        });
      };

      const handlePointerLeave = () => {
        const state = cursorStateRef.current;
        if (!state) return;
        state.hover.isHovered = false;
        state.isDetaching = true;

        const currentX = gsap.getProperty(cursorEl, "x") as number;
        const currentY = gsap.getProperty(cursorEl, "y") as number;
        state.pos.current.x = currentX;
        state.pos.current.y = currentY;

        const { cursorSize } = configRef.current;
        const shapeBorderRadius = shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          width: cursorSize,
          height: cursorSize,
          borderRadius: shapeBorderRadius,
          backgroundColor: cursorColor,
          scaleX: 1,
          scaleY: 1,
          duration: detachDuration,
          ease: 'power3.out',
          overwrite: true,
          onComplete: () => { state.isDetaching = false; }
        });
      };

      let rafId: number | null = null;
      const handlePointerMove = (event: PointerEvent) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const { clientX, clientY } = event;
          const { height, width, left, top } = el.getBoundingClientRect();
          const { magneticFactor } = configRef.current;
          xTo((clientX - (left + width / 2)) * magneticFactor);
          yTo((clientY - (top + height / 2)) * magneticFactor);
          rafId = null;
        });
      };

      const handlePointerOut = () => { xTo(0); yTo(0); };

      el.addEventListener('pointerenter', handlePointerEnter);
      el.addEventListener('pointerleave', handlePointerLeave);
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerout', handlePointerOut);

      activeListeners.current.set(el, () => {
        el.removeEventListener('pointerenter', handlePointerEnter);
        el.removeEventListener('pointerleave', handlePointerLeave);
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerout', handlePointerOut);
      });
    };

    const syncMagneticElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(`[${hoverAttribute}]`);
      elements.forEach(attachMagnetic);
    };

    const initializePosition = (event: MouseEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;
      state.pos.current.x = event.clientX;
      state.pos.current.y = event.clientY;
      state.pos.target.x = event.clientX;
      state.pos.target.y = event.clientY;
      gsap.set(cursorEl, { x: event.clientX, y: event.clientY, opacity: 1 });
    };

    const onMouseMove = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;
      state.pos.target.x = event.clientX;
      state.pos.target.y = event.clientY;
      gsap.to(cursorEl, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    gsap.ticker.add(update);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointermove', initializePosition, { once: true });
    
    // Initial sync
    syncMagneticElements();

    // MutationObserver to watch for new elements
    const observer = new MutationObserver(() => {
      syncMagneticElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('pointermove', onMouseMove);
      observer.disconnect();
      activeListeners.current.forEach((cleanup) => cleanup());
      activeListeners.current.clear();
    };
  }, [disableOnTouch, isTouchDevice, hoverAttribute, cursorColor, shape]);

  if (disableOnTouch && isTouchDevice) return <>{children}</>;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`magnetic-cursor ${cursorClassName}`} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform, width, height, border-radius',
          backgroundColor: cursorColor,
          mixBlendMode: blendMode as any,
          width: cursorSize,
          height: cursorSize,
          borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px',
          backdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
          WebkitBackdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
        }} 
      />
      {children}
    </>
  );
};
