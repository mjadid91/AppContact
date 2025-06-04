import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  const merged = twMerge(clsx(...inputs))
  const unique: string[] = []
  for (const cls of merged.split(/\s+/)) {
    if (cls && !unique.includes(cls)) {
      unique.push(cls)
    }
  }
  return unique.join(" ")
}
