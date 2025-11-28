import { ComponentProps } from "react";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      className={`w-full rounded-md px-3 py-2 bg-transparent border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white/20 transition-colors ${className}`}
      {...props}
    />
  );
}
