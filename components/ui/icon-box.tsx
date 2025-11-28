import { ComponentProps } from "react";

export function IconBox({
  className = "",
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
