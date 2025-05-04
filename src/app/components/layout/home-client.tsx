"use client";

import Link from "next/link";
import Slider from "../ui/slider";
import { Slide1 } from "../ui/slides/slide1";
import CardsGrid from "./cards-grid";
import Notification from "./notification";
import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

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
    { component: <Slide1 image={"/slide1-bg.png"} /> },
    //{ component: <Slide2 image={"/slide2-bg.png"} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Notification />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-8"
      >
        <Slider slides={slides} />
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
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-white-500" />
              <h3 className="text-xl font-bold font-excon text-foreground">Trending Now</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-border/80 transition-all group cursor-pointer h-[160px]"
                    >
                      <div className="flex items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center">
                            <Zap className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-foreground transition-colors">{tool.title}</h4>
                            <p className="text-sm text-muted-foreground">{tool.subtopic}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>
                    </motion.div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <CardsGrid totalLinks={totalLinks} />
        </motion.div>
      </div>
    </div>
  );
} 