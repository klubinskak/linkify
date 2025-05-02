"use client";

import { IconData } from "@/models/link";
import {
  Box,
  Code2,
  Headphones,
  Palette,
  Languages,
  Bot,
  Layout,
  Newspaper,
  PenTool,
  AppWindow,
  GraduationCap,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Box,
  Code2,
  Headphones,
  Palette,
  Languages,
  Bot,
  Layout,
  Newspaper,
  PenTool,
  AppWindow,
  GraduationCap
};

interface IconProps {
  icon?: IconData;
  className?: string;
}

const defaultIcon: IconData = {
  name: "Box",
  size: "w-5 h-5",
  color: "text-gray-200"
};

export function Icon({ icon = defaultIcon, className }: IconProps) {
  const IconComponent = iconMap[icon.name] || Box;
  return (
    <IconComponent 
      className={`${icon.size} ${icon.color} ${className || ''}`}
    />
  );
} 