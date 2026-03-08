import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-sans font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-amber-600 text-white hover:bg-amber-700": variant === "primary",
          "border border-stone-200 text-stone-600 hover:bg-stone-50": variant === "secondary",
          "text-stone-500 hover:text-stone-800": variant === "ghost",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5": size === "md",
          "px-8 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
