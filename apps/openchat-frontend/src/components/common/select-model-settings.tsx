"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModelKey, modelMap } from "@/features/chat/types";
import { useSelectedModel } from "@/features/chat/hooks";

export function SelectModelSettings() {
  const { setSelectedModel, selectedModel } = useSelectedModel();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<ModelKey>(selectedModel || "meta-llama/Llama-3.3-70B-Instruct-Turbo");
  
  React.useEffect(()=>{
    setSelectedModel(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value ? modelMap[value] : "Select a model..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandList>
            <CommandEmpty>No models found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(modelMap).map(([key, label]) => (
                <CommandItem
                  key={key}
                  value={key}
                  onSelect={(currentValue) => {
                    // @ts-expect-error: value is not typed correctly by library
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === key ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
