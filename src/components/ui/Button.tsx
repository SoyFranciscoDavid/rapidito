import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "white" | "dark";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-hover border-none rounded-full",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white rounded-full",
  white: "border border-border rounded-md text-inherit hover:bg-gray-50",
  dark: "bg-gray-900 text-white border-none rounded-md hover:bg-gray-800",
};

const sizeStyles = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
