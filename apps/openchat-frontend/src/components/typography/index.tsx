import { cn } from "@/lib/utils";
import { FC, ReactNode, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: ReactNode;
}

export const Text: FC<TextProps> = ({ className, children, ...props }) => (
  <p className={cn("font-inter text-[14px]", className)} {...props}>
    {children}
  </p>
);

export const Display1: FC<TextProps> = ({ className, ...props }) => <p className={cn("font-inter text-[24px] font-[600]", className)} {...props} />;

export const Caption1: FC<TextProps>  = ({className, ...props}) => <p className={cn("font-inter text-[12px]", className)} {...props} />;