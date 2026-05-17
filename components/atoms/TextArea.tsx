import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return <textarea className={`textarea ${className}`} {...props} />;
}
