import { Send } from "lucide-react";
import { Flex } from "./flex-box";
import { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface PromptTextareaProps {
    value: string;
    className?:string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void ;
    onSubmit: () => void;
};

export const PromptTextarea: FC<PromptTextareaProps> = ({ value, className, onChange, onSubmit }) =>(
    <Flex col className={
            cn("relative rounded-[24px] border dark:border-[#444444] p-4 h-[132px] dark:bg-[#262626]", className)
        }>
        <textarea value={value} onChange={onChange} className="w-full rounded-md p-4 z-[2] min-h-[64px] max-h-[64px] border-none outline-none focus:ring-0 focus:border-transparent resize-none" placeholder="What would you like to talk about?"/>
        <Button size="icon" className="ml-auto mr-0 mt-[-8]" onClick={onSubmit} variant="default">
            <Send />
        </Button>
    </Flex>
);