import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface Slide2Props {
  video: string;
}

export function Slide2({ video }: Slide2Props) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-background/95 via-background/90 to-background/80">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(at_center,white,transparent_70%)]" />

      <div className="py-12 container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-2 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 py-12 lg:py-24 ml-8 lg:ml-12 xl:ml-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl xl:text-3xl font-semibold text-foreground leading-tight"
            >
              Modern Portfolio Templates
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs xl:text-sm text-muted-foreground max-w-md leading-relaxed"
            >
              Elevate your online presence with a sleek, modern, and fully
              customizable portfolio website. Designed to showcase your work in
              couple clicks with style!
            </motion.p>

            <Link href="https://klaudiadev.gumroad.com/l/modern-fully-cusotmize-portfolio">
              <button className="mt-12 cursor-pointer group relative bg-[#f8f9fa] hover:bg-zinc-300 text-black text-xs text-sm md:py-2 rounded-md transition-all duration-200 ease-in-out w-28 md:w-36 h-7 md:h-9">
                <div className="relative flex items-center justify-center gap-2">
                  <span className="relative inline-block overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      Start Building
                    </span>
                    <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                      Right Now
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                    viewBox="0 0 24 24"
                  >
                    <circle fill="currentColor" r={11} cy={12} cx={12} />
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="white"
                      d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                    />
                  </svg>
                </div>
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="relative h-full flex items-center justify-center p-6"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 -m-4 bg-gradient-to-br from-primary/30 via-purple-500/20 to-secondary/30 rounded-3xl blur-xl opacity-30 group-hover:opacity-90 transition-all duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/5 mix-blend-overlay rounded-3xl"></div>
            </div>
            <div className="relative w-full max-w-2xl">
              <div className="relative w-full max-w-2xl">
                {/* Discount tag positioned absolutely relative to outer wrapper */}
                <div className="absolute top-0 right-0 sm:-top-26 sm:-right-5 z-20">
                  <div className="relative rotate-[6deg]">
                    <div className="absolute -inset-1 py-0.5 sm:py-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] xs:text-xs sm:text-sm font-bold rounded-md shadow-lg whitespace-nowrap">
                      <span className="xs:inline">CODE: </span>
                      <span className="font-mono">LINKIFY</span>
                      <span className="ml-1 bg-white/20 px-1 sm:px-1.5 py-0.5 rounded text-[9px] xs:text-[10px] sm:text-xs">
                        -25%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video with background and border */}
                <div className="relative bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 shadow-2xl w-full">
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto max-h-[70vh] object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
