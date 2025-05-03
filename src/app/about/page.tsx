"use client";
import React from "react";
import { Github, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen p-6 md:p-8 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4 font-excon bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/20"></div>
        </motion.div>

        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-12 mb-12"
        >
          <div className="flex-1">
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-lg mb-6 text-gray-200 relative">
                Hi there! I&apos;m{" "}
                <a
                  href="https://klubinska.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-400 hover:text-blue-300 transition-colors relative group/link"
                >
                  Klaudia
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                </a>
                , a Software Developer from Poland 🇵🇱
              </p>
              <p className="text-gray-400 mb-6 relative">
                I&apos;m passionate about creating beautiful and functional web applications that make a difference.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Linkify Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 font-excon text-gray-200">🤔 Why I Built Linkify</h2>
          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-gray-300 relative">
              I&apos;ve been sharing useful resources, such as websites, on my Threads profile and wanted to create a hub where I can easily organize them and share them with everyone :)
            </p>
          </div>
        </motion.div>

        {/* Connect Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 font-excon text-gray-200">Connect With Me</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="https://github.com/klubinskak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Github size={20} className="text-gray-300 relative" />
              <span className="text-gray-300 relative">GitHub</span>
            </a>
            <a
              href="https://x.com/klaudiadev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Twitter size={20} className="text-gray-300 relative" />
              <span className="text-gray-300 relative">Twitter</span>
            </a>
            <a
              href="https://www.instagram.com/klaudiadev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Instagram size={20} className="text-gray-300 relative" />
              <span className="text-gray-300 relative">Instagram</span>
            </a>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12 mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 font-excon text-gray-200">Support My Work</h2>
          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-gray-300 mb-6 relative">
              If you find my work valuable, consider supporting me by buying me a coffee! Your support helps me continue creating and maintaining projects like Linkify.
            </p>
            <div className="mt-4 relative">
              <a
                href="https://www.buymeacoffee.com/klaudiadev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-lg font-bold text-gray-900 bg-[#FFDD00] rounded-xl border-2 border-gray-900 
                hover:scale-105 transform transition-all duration-200 ease-in-out shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 hover:bg-[#FFD700] relative overflow-hidden group/button"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>
                <span className="mr-3 text-2xl relative" role="img" aria-label="coffee">☕</span>
                <span className="ml-3 relative">Buy me a coffee</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
