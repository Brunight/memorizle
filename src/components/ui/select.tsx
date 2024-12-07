"use client";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export function Select({ onValueChange, ...props }: SelectProps) {
  return (
    <select
      {...props}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="rounded border bg-background px-2 py-1"
    />
  );
}
