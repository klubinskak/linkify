import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLabel(label: string): string {
  console.log('label?', label)
  let formattedLabel: string = label;
  if(label === "ai"){
    formattedLabel = formattedLabel.toUpperCase()
  }
  if(label.includes('%20')){
    formattedLabel = formattedLabel.replace('%20', ' ');
    formattedLabel = capitalizeSecondPhrase(formattedLabel);
  }

  if(label.includes('ui')){
    formattedLabel = formattedLabel.replace('ui', 'UI ');
  }

  return formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1)
}
