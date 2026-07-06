import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl font-semibold transition duration-standard ease-out focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-orange disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-ink bg-brand-orange px-5 text-ink shadow-paper hover:bg-brand-orange-deep hover:text-cream",
  secondary:
    "border-2 border-ink bg-cream px-5 text-ink shadow-paper hover:bg-peach",
  ghost:
    "rounded-lg text-ink underline decoration-brand-orange decoration-2 underline-offset-4 hover:decoration-ink",
  inverse:
    "border-2 border-cream bg-cream px-5 text-ink shadow-[4px_4px_0_#F97316] hover:bg-peach",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-sm sm:text-base",
  lg: "min-h-12 px-6 text-base",
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="duration-standard size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
    >
      <path
        d="M4 10h11m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
