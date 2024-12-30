"use client"

import { buttonVariants } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image"
import { useCreator } from "@/components/providers/creator-provider"

interface SelectChainProps extends React.HTMLAttributes<HTMLDivElement> {
    chainList: any
    getIconByChainId: (chain: string) => string
    getNetworkNameFromChainID: (chain: string) => string
}

export function SelectChain({
    chainList,
    getIconByChainId,
    getNetworkNameFromChainID,
}: SelectChainProps) {
    const { chainId, setChainId } = useCreator();

    const [open, setOpen] = useState(false)

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={cn("flex items-center space-x-2 cursor-pointer",
            buttonVariants({ variant: "ghost" }))}>
            <Image src={getIconByChainId(chainId)} alt="icon" height={24} width={24}
                className="shrink-0" />
        </PopoverTrigger>
        <PopoverContent className="p-0">
            <Command>
                <CommandInput placeholder="Search chain..." className="h-9" />
                <CommandEmpty>Chain not supported</CommandEmpty>
                <ScrollArea className="">
                    <CommandGroup>
                        <CommandList>
                            {Object.values(chainList).map((network: any, index: number) => (
                                <CommandItem
                                    className="flex items-center space-x-2 cursor-pointer"
                                    key={index}
                                    value={getNetworkNameFromChainID(network)}
                                    onSelect={(currentValue: string) => {
                                        setChainId(network)
                                        setOpen(false)
                                    }}
                                >
                                    <Image src={getIconByChainId(network)} alt="icon" height={6} width={6} className="h-6 w-6" />
                                    <div>{getNetworkNameFromChainID(network)}</div>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </ScrollArea>
            </Command>
        </PopoverContent>
    </Popover >
}