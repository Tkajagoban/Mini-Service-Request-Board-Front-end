import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}
