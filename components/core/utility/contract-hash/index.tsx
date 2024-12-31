"use client"

import { useState } from "react"
import { UtilityHeader } from "@/components/core/utility/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SampleItemProp } from "@/components/core/utility/contract-hash/sample/shared"
import { ChainType, useCreator } from "@/components/providers/creator-provider"
import { createPublicClient, http, isAddress, sha256 } from "viem"
import { getRPC } from "@/lib/chains"
import { removeMetadata, replaceAddresses, replacePushData } from "@/lib/quest/utils";
import { getCode } from "@/lib/move/sui"
import { ContractHashToolbar } from "@/components/core/utility/contract-hash/toolbar"

interface UtilityContractHashProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UtilityContractHash({ }: UtilityContractHashProps) {
    const creator = useCreator()

    const [value, setValue] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleOnClick = async () => {
        try {
            setIsLoading(true)
            const output = await doContractHash()
            setOutput(output)
        } catch (error: any) {
            console.error(error)
            if (error instanceof TypeError) {
                setOutput(`Contract might not exist on chain ${creator.chainId}`)
            } else {
                setOutput(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const doContractHash = async () => {
        let bytecode: `0x${string}` = "0x"
        if (creator.chainType === ChainType.EVM) {
            if (!isAddress(value))
                throw Error(`Contract does not exist with ID ${value}`)

            const rpc = getRPC(creator.chainId)
            const client = createPublicClient({
                transport: http(rpc),
            })

            bytecode = await client.getCode(
                { address: value as `0x${string}` }) as `0x${string}`

            bytecode = removeMetadata(bytecode)
            bytecode = replaceAddresses(bytecode)
            bytecode = replacePushData(bytecode)
        } else if (creator.chainType === ChainType.MOVE) {
            bytecode = await getCode(creator.chainId, value);
        }

        return sha256(bytecode)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleValueChange = (item: SampleItemProp) => {
        setValue(item.address)
        creator.setChainType(item.type || ChainType.EVM)
        creator.setChainId(item.chain)
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <UtilityHeader title="Smart Contract Quest Hash" />

                <ContractHashToolbar handleValueChange={handleValueChange}
                    input={value} output={output} />

                <Input onChange={handleOnChange} value={value} placeholder="0x..." />

                <div className="my-2 px-3">
                    {output && <div className="break-all">{output}</div>}
                </div>

                <Button className="w-full"
                    disabled={(!isAddress(value) || isLoading)}
                    onClick={handleOnClick}>
                    {isLoading ? "Loading ..." : "Generate"}
                </Button>
            </div>
        </div>
    )
}

