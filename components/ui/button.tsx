import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "outline" | "ghost" | "secondary";
}

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center transition-colors disabled:opacity-50 font-medium";

  const variants = {
    primary: "bg-primary text-black hover:brightness-110",
    secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "hover:bg-white/5",
  };

  const defaultRadius = className.includes("rounded-") ? "" : "rounded-md";
  const defaultPadding =
    className.includes("p-") || className.includes("py-") ? "" : "py-2 px-4";

  const combinedClassName = `${baseStyles} ${variants[variant]} ${defaultRadius} ${defaultPadding} ${className}`;

  return <button className={combinedClassName} {...props} />;
}
