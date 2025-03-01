"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SliderItem {
  component: ReactNode;
}

interface SliderProps {
  slides: SliderItem[];
}



export default function Slider({ slides }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  return (
    <div className="relative w-full mx-auto">
      <div className="relative h-[300px] overflow-hidden rounded-lg max-w-full mr-4">
        {slides[currentIndex].component}
      </div>
      {slides.length > 1 && <><Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4 z-40" />
      </Button><Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40"
        onClick={goToNext}
      >
          <ChevronRight className="h-4 w-4 z-40" />
        </Button></>}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.length > 1 && slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full z-50 ${index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
