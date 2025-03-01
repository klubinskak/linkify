"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import { Github, House } from "lucide-react";
import { useTheme } from "next-themes";
import RainbowButton from "./rainbow-button";
import { FaGithub, FaStar } from "react-icons/fa";
import { useEffect } from "react";

const GithubIcon = FaGithub as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const StarIcon = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

export function Navbar() {
  const { theme , setTheme} = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [])

  console.log(theme);
  return (
    <header className="shadow p-5 md:p-2 border bottom-3">
      <div className="mx-2 flex items-center justify-center md:justify-between">
        <Link
          className="mx-12 text-lg font-bold mr-12 flex justify-center items-center"
          href="/"
        >
          🔗<span className="ml-2 font-excon tracking-wider text-md">Linkify</span>
        </Link>
        <div className="flex justify-center items-center gap-8">
          <nav className="hidden md:block">
            <ul className="flex justify-center items-center space-x-3">
              <li className="p-2 border border-1 rounded-md hover:bg-gray-300 hover:bg-opacity-10">
                <Link href="/">
                <House size={18} />
                </Link>
              </li>
              <li className="p-2 border border-1 rounded-md hover:bg-gray-300 hover:bg-opacity-10">
                <Link href="https://github.com/klubinskak" target="_blank">
                  <Github size={18} />
                </Link>
              </li>
              <li className="p-2 border border-1 rounded-md hover:bg-gray-300 hover:bg-opacity-10">
                <Link href="https://x.com/klaudiadev" target="_blank">
                  {theme === "dark" ? (
                    <Image
                      src="/icons8-x-dark.svg"
                      alt="icon"
                      width={18}
                      height={18}
                    />
                  ) : (
                    <Image
                      src="/icons8-x.svg"
                      alt="icon"
                      width={18}
                      height={18}
                    />
                  )}
                </Link>
              </li>
              <li className="p-2 border border-1 rounded-md hover:bg-gray-300 hover:bg-opacity-10">
                <Link
                  href="https://www.threads.net/@klaudiadev"
                  target="_blank"
                >
                  {theme === "dark" ? (
                    <Image
                      src="/icons8-threads-dark.png"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/icons8-threads-light.png"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  )}
                </Link>
              </li>
              {/* Switching off for now - to be continued */}
              {/* <li className="flex items-center">
                {" "}
                <ModeToggle />
              </li> */}
              <li className="p-2">
                <RainbowButton className="p-2 border border-1 rounded-md group">
                  <Link
                    className="flex gap-2 text-xs font-light justify-center items-center"
                    href="https://github.com/klubinskak/linkify"
                    target="_blank"
                  >
                    <GithubIcon />
                    Star on GitHub
                    <StarIcon className="text-gray-500 group-hover:text-yellow-500" />
                  </Link>
                </RainbowButton>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
