import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function initials(name: string) {
    const words = name.split(" ")
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase()
    }
    return `${words[0].substring(0, 1)}${words[words.length - 1].substring(0, 1)}`.toUpperCase()
}
