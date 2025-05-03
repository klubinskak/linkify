import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function capitalizeSecondPhrase(text: string): string {
  const words = text.split(' ');
  if (words.length > 1) {
    words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
  }
  return words.join(' ');
}

export function formatLabel(label: string): string {
  let formattedLabel: string = label;
  
  if (label === "ai") {
    formattedLabel = formattedLabel.toUpperCase();
  }
  
  if (label.includes('%20')) {
    formattedLabel = formattedLabel.replace('%20', ' ');
    formattedLabel = capitalizeSecondPhrase(formattedLabel);
  }

  if (label.includes('ui')) {
    formattedLabel = formattedLabel.replace('ui', 'UI');
  }

  return formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1);
}
