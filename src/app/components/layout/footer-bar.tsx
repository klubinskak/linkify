"use client";
import { useSidebar } from "@/app/context/sidebarContext";
import { House, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function FooterBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { openModal } = useSidebar();



  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "flex flex-col justify-center items-center gap-2 cursor-pointer text-sm font-medium tracking-wide";
    const activeClass = isActive ? (theme === "dark" ? "text-white" : "text-black") : "text-[#adb5bd]";

    return `${baseClass} ${activeClass}`;
  };

    return (
    <div className={className}>
      <footer className="p-2 z-10 bg-[#0A0A0A]">
        <div className="mx-auto flex items-center justify-between">
          <nav className="w-full">
            <ul className="flex justify-around w-full p-2 space-x-4">
            <li>
                <Link className={getLinkClass("/")} href="/">
                  <House size={21} />
                  Home
                </Link>
              </li>
              <li>
              <Link className={getLinkClass("/search")} href="#" onClick={(e) => { e.preventDefault(); openModal(); }}>
              <Search size={21} />
                  Search
                </Link>
              </li>
              <li>
                <Link className={getLinkClass("/about")} href="/about">
                  <User size={21} />
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

