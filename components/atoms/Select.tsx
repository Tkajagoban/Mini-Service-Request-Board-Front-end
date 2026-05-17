import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select className={`select ${className}`} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
