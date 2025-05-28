"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface SliderItem {
  component: ReactNode;
}

interface SliderProps {
  slides: SliderItem[];
  autoPlay?: boolean;
  interval?: number;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const dotVariants = {
  active: {
    scale: 1.2,
    backgroundColor: "#ffffff",
    transition: { duration: 0.2 },
  },
  inactive: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: { duration: 0.2 },
  },
};

export default function Slider({ 
  slides, 
  autoPlay = false, 
  interval = 5000 
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = () => {
    setDirection(-1);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setDirection(1);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="relative h-[300px] rounded-lg max-w-full mr-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {slides[currentIndex].component}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {slides.length > 1 && (
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40"
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40"
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </>
      )}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.length > 1 &&
          slides.map((_, index) => (
            <motion.button
              key={index}
              className="w-2 h-2 rounded-full focus:outline-none"
              onClick={() => goToSlide(index)}
              variants={dotVariants}
              animate={index === currentIndex ? "active" : "inactive"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
      </div>
    </div>
  );
}
