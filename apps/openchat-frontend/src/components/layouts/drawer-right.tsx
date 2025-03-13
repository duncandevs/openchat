import { Caption1, Text } from "../typography";
import { Flex } from "../common/flex-box";
import { Avatar } from "@/components/common/avatar";
import { SelectModelSettings } from "@/components/common/select-model-settings";
import { ThemeToggle } from "../common/theme-toggle";

export function DrawerRight () {
    return <div>
        <div className="p-8">
            <Flex className="gap-4">
                <Avatar />
                <Text>@myusername</Text>
                <Flex right>
                    <ThemeToggle />
                </Flex>
            </Flex>
        </div>
        <hr />
        <Flex col className="p-8 gap-12">
            <Flex col>
                <Caption1 className="font-[600] text-gray-400">Model Settings</Caption1>
                <Flex col className="gap-8">
                    <Flex col>
                        <Text>Model</Text>
                        <SelectModelSettings />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </div>
};