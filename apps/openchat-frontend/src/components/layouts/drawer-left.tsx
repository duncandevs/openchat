"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Flex } from "../common/flex-box";
import { Display1, Caption1, Text } from "../typography";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

interface DrawerLeftProps {
    className?:string
};

export const DrawerLeft: FC<DrawerLeftProps> = ({ className }) => {
    return <div className={cn(className, "h-screen p-8")}>
        <Flex className="gap-3">
            <Display1>OpenChat</Display1>
            <Caption1>the open source chat</Caption1>
            <MessageSquare strokeWidth={3}/>
        </Flex>
        <Flex col className="mt-12">
            <Flex>
                <Caption1 className="font-[500] text-secondary-foreground">Threads</Caption1>
                <Flex right>
                    <Button size="icon" onClick={()=>null} className="w-8 h-8">
                        <Plus />
                    </Button>
                </Flex>
            </Flex>
            <Flex className="w-full mt-4">
                <MessageSquare height={20}/>
                <Text>Untitled</Text>
            </Flex>
        </Flex>
    </div>
};