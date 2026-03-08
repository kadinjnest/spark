import { clsx } from "clsx";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("bg-white rounded-2xl border border-stone-100 p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
