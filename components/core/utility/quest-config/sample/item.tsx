"use client"

import { Button } from "@/components/ui/button"

import { SampleItemProp } from "./shared"

interface SampleItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    item: SampleItemProp
}

export function SampleItem({ item, ...props }: SampleItemProps) {
    return (
        <Button {...props} variant="outline">
            <div className="flex items-center gap-2">
                <div>{item.name}</div>
            </div>
        </Button>
    )
}

