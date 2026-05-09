import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
const variants: Record<Variant, string> = {
  primary: "bg-teal-gradient text-white shadow-brand hover:shadow-lg hover:-translate-y-0.5",
  outline: "glass text-ink hover:bg-white",
  ghost: "text-ink hover:bg-white/60",
  dark: "bg-ink text-white hover:bg-ink/90",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface BaseProps {
  variant?: Variant; size?: Size; arrow?: boolean; className?: string; children: ReactNode;
}
type LinkBtnProps = BaseProps & { to: string };
type ButtonBtnProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

export const Button = forwardRef<HTMLButtonElement, ButtonBtnProps>(function Button(
  { variant = "primary", size = "md", arrow, className, children, ...rest }, ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="size-4" />}
    </button>
  );
});

export function LinkButton({ to, variant = "primary", size = "md", arrow, className, children }: LinkBtnProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
      {arrow && <ArrowRight className="size-4" />}
    </Link>
  );
}
