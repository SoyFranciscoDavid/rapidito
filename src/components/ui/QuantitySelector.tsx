import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  className?: string;
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-24 bg-muted rounded-lg",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={onDecrement}
        disabled={disabled}
        className="w-10 h-10 text-center cursor-pointer text-lg font-medium disabled:opacity-20 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="font-semibold">{quantity}</span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={onIncrement}
        disabled={disabled}
        className="w-10 h-10 text-center cursor-pointer text-lg font-medium disabled:opacity-20 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
