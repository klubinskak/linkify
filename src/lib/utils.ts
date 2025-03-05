import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function capitalizeSecondPhrase(input: string) {
  const words = input.split(" ");
  if (words.length === 2) {
    words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
  }
  return words.join(" ");
}

export function formatLabel(topic: string): string {
  let formattedLabel: string = topic;

  if (topic === "ai") {
    formattedLabel = formattedLabel.toUpperCase();
  }

  if (topic.includes("%20")) {
    formattedLabel = formattedLabel.replace(/%20/g, " ");
  }

  formattedLabel = formattedLabel.replace(/\bui\b/gi, "UI");

  formattedLabel = formattedLabel
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedLabel;
}
