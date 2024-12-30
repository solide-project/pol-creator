"use client"

import { ChainID, getIconByChainId, getNetworkNameFromChainID } from "@/lib/chains"
import { ChainType, useCreator } from "@/components/providers/creator-provider"
import { ChainID as MoveChainID } from "@/lib/chains/move/chain-id";
import { getNetworkNameFromChainID as getMoveNetworkNameFromChainID } from "@/lib/chains/move/name";
import { getIconByChainId as getMoveIconByChainId } from "@/lib/chains/move/icon";
import { SelectChain } from "@/components/core/shared/select-chain";

interface SelectNetworkProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SelectNetwork({
}: SelectNetworkProps) {
    const { chainType } = useCreator();

    return (
        <SelectChain
            chainList={chainType === ChainType.EVM ? ChainID : MoveChainID}
            defaultValue={chainType === ChainType.EVM ? ChainID.ETHEREUM_MAINNET : MoveChainID.SUI_TESTNET}
            getNetworkNameFromChainID={chainType === ChainType.EVM ? getNetworkNameFromChainID : getMoveNetworkNameFromChainID}
            getIconByChainId={chainType === ChainType.EVM ? getIconByChainId : getMoveIconByChainId}
        />
    )
}