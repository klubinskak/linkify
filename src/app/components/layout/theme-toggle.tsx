"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
