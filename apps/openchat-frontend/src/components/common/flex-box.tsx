import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, ReactNode } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    col?:boolean;
    right?: boolean;
    between?:boolean;
    group?: boolean;
}

export const Flex: FC<FlexProps> = ({className, col, right, between, group, ...props}) => 
    <div className={
        cn(
            "flex gap-2", 
            className, 
            col && "flex-col", 
            !col && "items-center", 
            right && "ml-auto",
            between && "justify-between",
            group && "group",
         )} {...props} />;