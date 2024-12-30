"use client"

import { SampleItemProp, samples } from "./shared"
import { SampleItem } from "./item"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SampleDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    onValueChange: (item: SampleItemProp) => void
}

export function SampleDrawer({ onValueChange }: SampleDrawerProps) {
    const [open, setOpen] = useState(false);

    const handleLoadSample = (item: SampleItemProp) => {
        onValueChange(item);
        setOpen(false)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    Load Templates
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="max-h-[256px] overflow-auto">
                    <DrawerTitle>Contract Templates</DrawerTitle>
                    <div className="flex items-center flex-wrap gap-2">
                        {samples.map((item, index) => {
                            return <SampleItem key={index} item={item}
                                onClick={(e) => handleLoadSample(item)} />
                        })}
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        Cancel
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}