"use client";

import {
  motion,
  useAnimation,
  PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";

interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
  maxSwipeDistance?: number;
}

export function Swipeable({
  children,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 100,
  maxSwipeDistance = 150,
}: SwipeableProps) {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  // Transform x motion value to opacity for both icons
  const checkOpacity = useTransform(
    x,
    [-maxSwipeDistance, -maxSwipeDistance / 2, 0], // Only show when moving left
    [1, 0, 0],
  );
  const xMarkOpacity = useTransform(
    x,
    [0, maxSwipeDistance / 2, maxSwipeDistance], // Only show when moving right
    [0, 0, 1],
  );

  const handleDragEnd = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    { offset: { x }, velocity: { x: vx } }: PanInfo,
  ) => {
    setIsDragging(false);

    // Calculate if swipe was strong/far enough
    const swipe = Math.abs(x * vx);

    if (swipe > swipeThreshold) {
      // Determine direction and trigger handler
      if (x > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    // Always animate back to center
    controls.start({
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    });
  };

  return (
    <div className="relative h-full">
      <motion.div
        drag="x"
        dragConstraints={{ left: -maxSwipeDistance, right: maxSwipeDistance }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0 }}
        style={{
          x,
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: 20,
        }}
        className="relative h-full touch-pan-y"
      >
        {children}
      </motion.div>
      {/* Overlay Icons */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 h-full w-full -translate-y-1/2 bg-red-500 text-6xl"
        style={{ opacity: checkOpacity }}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <CircleX />
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-0 top-1/2 h-full w-full -translate-y-1/2 bg-green-500 text-6xl"
        style={{ opacity: xMarkOpacity }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <CircleCheck />
        </div>
      </motion.div>
    </div>
  );
}
