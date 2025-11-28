import { ComponentProps } from "react";

export function Badge({
  className = "",
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={`px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300 border border-white/5 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
