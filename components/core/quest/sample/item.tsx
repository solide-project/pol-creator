"use client"

import { Button } from "@/components/ui/button"
import { SampleQuestProp } from "./shared"
import Image from "next/image"
import { getIconByChainId, getNetworkNameFromChainID } from "@/lib/chains"
import { getIconByChainId as getMoveIconByChainId } from "@/lib/chains/move/icon";
import { getNetworkNameFromChainID as getMoveNetworkNameFromChainID } from "@/lib/chains/move/name";
import { ChainType } from "@/components/providers/creator-provider"

interface SampleItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    item: SampleQuestProp
}

export function SampleItem({ item, ...props }: SampleItemProps) {
    const isEVM = (!item?.type || item?.type === ChainType.EVM)
    return (
        <Button {...props}>
            <div className="flex items-center gap-2">
                {item.quest.chain && <Image
                    src={isEVM
                        ? getIconByChainId(item.quest.chain)
                        : getMoveIconByChainId(item.quest.chain)
                    }
                    alt={item.quest.chain}
                    height={24}
                    width={24}
                />}
                <div>
                    {item.title}
                    {item.quest.chain && ` on ${isEVM ? getNetworkNameFromChainID(item.quest.chain) :
                        getMoveNetworkNameFromChainID(item.quest.chain)}`}
                </div>
            </div>
        </Button>
    )
}