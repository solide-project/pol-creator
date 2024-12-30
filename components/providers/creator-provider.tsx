"use client"

import { ChainID } from "@/lib/chains"
import { ChainID as MoveChainID } from "@/lib/chains/move/chain-id";

import { createContext, useContext, useEffect, useState } from "react"

export enum ChainType {
    EVM = "evm",
    MOVE = "move",
}

export function CreatorProvider({ children }: CreatorProviderProps) {
    const [chainType, setChainType] = useState<ChainType>(ChainType.EVM)
    const [chainId, setChainId] = useState<string>(ChainID.ETHEREUM_MAINNET)

    useEffect(() => {
        // Reset to default if type change
        setChainId(chainType === ChainType.EVM ? ChainID.ETHEREUM_MAINNET : MoveChainID.SUI_MAINNET)
    }, [chainType])
    
    return (
        <CreatorContext.Provider
            value={{
                chainType,
                setChainType,
                chainId,
                setChainId
            }}
        >
            {children}
        </CreatorContext.Provider>
    )
}

interface CreatorProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const CreatorContext = createContext({
    chainType: ChainType.EVM,
    setChainType: (chain: ChainType) => { },
    chainId: ChainID.ETHEREUM_MAINNET.toString(),
    setChainId: (chain: string) => { },
})

export const useCreator = () => useContext(CreatorContext)