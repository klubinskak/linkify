import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Slide1Props {
  image: string;
}

export function Slide1({ image }: Slide1Props) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={image}
        alt="Slide 1"
        width={1200}
        height={1300}
        className="absolute inset-0 w-full h-full object-fill md:object-cover"
      />
      <div className="relative text-white p-4 flex  items-center h-full">
      <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 py-12 lg:py-24 ml-8 lg:ml-12 xl:ml-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-2xl font-semibold text-foreground leading-tight"
            >
               Unlock the Web’s Best Resources
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-2xl font-semibold text-foreground leading-tight"
            >
              in One Place
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm text-muted-foreground max-w-md leading-relaxed"
            >
              Start exploring now!
            </motion.p>

            <Link href="https://klaudiadev.gumroad.com/l/modern-fully-cusotmize-portfolio">
              <button className="mt-12 cursor-pointer group relative bg-[#f8f9fa] hover:bg-zinc-300 text-black text-xs text-sm md:py-2 rounded-md transition-all duration-200 ease-in-out w-28 md:w-36 h-7 md:h-9">
                <div className="relative flex items-center justify-center gap-2">
                  <span className="relative inline-block overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      Get Started
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
      </div>
    </div>
  );
}
