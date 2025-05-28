"use client";

import Link from "next/link";
import Slider from "../ui/slider";
import { Slide1 } from "../ui/slides/slide1";
import CardsGrid from "./cards-grid";
import Notification from "./notification";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Slide2 } from "../ui/slides/slide2";

interface HomeClientProps {
  totalLinks: number;
}

interface TrendingTool {
  title: string;
  topic: string;
  subtopic: string
  description: string;
}

export function HomeClient({ totalLinks }: HomeClientProps) {
  const [trendingTools, setTrendingTools] = useState<TrendingTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        const response = await fetch('/api/trending');
        const data = await response.json();
        setTrendingTools(data.tools);
      } catch (error) {
        console.error('Error fetching trending tools:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTools();
  }, []);

  const slides = [
    { component: <Slide2 video={"/slide2-video.mp4"} /> },
    { component: <Slide1 image={"/slide1-bg.png"} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Notification />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full mb-8"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
          <Slider slides={slides} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >

          {/* Trending Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div 
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="relative">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <h3 className="text-xl text-center md:text-right font-semibold text-foreground">
                  Trending Now
                </h3>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-border/50 animate-pulse h-[160px]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-muted"></div>
                        <div>
                          <div className="h-4 w-24 bg-muted rounded"></div>
                          <div className="h-3 w-16 bg-muted rounded mt-2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-muted rounded"></div>
                  </div>
                ))
              ) : (
                trendingTools?.map((tool, index) => (
                  <Link href={`/${tool.topic}/${tool.subtopic}`} key={index}>
                    <motion.div
                      key={tool.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className={cn(
                        "relative bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-border/80 transition-all group cursor-pointer h-[160px]",
                        "hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] transform-gpu"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{tool.title}</h4>
                            <p className="text-sm text-muted-foreground">{tool.subtopic}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-4 h-4 text-primary"
                        >
                          <Sparkles />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              )}
            </div>
          </motion.div>

          <CardsGrid totalLinks={totalLinks} />
        </motion.div>
      </div>
    </div>
  );
} 