import Link from "next/link";
import { ComponentProps } from "react";

interface CardProps extends ComponentProps<"div"> {
  href?: string;
  target?: string;
  variant?: "default" | "primary" | "github" | "glass";
}

export function Card({
  className = "",
  variant = "default",
  href,
  children,
  ...props
}: CardProps) {
  const baseStyles = "transition-colors group relative overflow-hidden";

  const variants = {
    default:
      "bg-card/50 border border-white/5 hover:border-primary/30 rounded-3xl p-8",
    primary: "bg-primary text-black hover:bg-primary/90 rounded-3xl p-8",
    github:
      "bg-[#24292e] border border-white/5 hover:bg-[#2f363d] rounded-3xl p-8",
    glass:
      "bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary rounded-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
