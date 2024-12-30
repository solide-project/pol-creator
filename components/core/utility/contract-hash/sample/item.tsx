"use client"

import { Button } from "@/components/ui/button"
import { getIconByChainId } from "@/lib/chains"
import { getIconByChainId as getMoveIconByChainId } from "@/lib/chains/move/icon";

import { SampleItemProp } from "./shared"
import Image from "next/image"
import { mask } from "@/lib/quest"
import { ChainType } from "@/components/providers/creator-provider"

interface SampleItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    item: SampleItemProp
}

export function SampleItem({ item, ...props }: SampleItemProps) {
    return (
        <Button {...props} variant="outline">
            <div className="flex items-center gap-2">
                <Image
                    src={(!item?.type || item?.type === ChainType.EVM)
                        ? getIconByChainId(item.chain)
                        : getMoveIconByChainId(item.chain)
                    }
                    alt={item.address}
                    height={24}
                    width={24}
                />
                <div>{mask(item.address)} ({item.name})</div>
            </div>
        </Button>
    )
}

