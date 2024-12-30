import { Copy, Globe } from "lucide-react"
import { SampleDrawer } from "./sample"
import { CopyText } from "@/components/core/shared/copy-text"
import { cn } from "@/lib/utils"
import { SelectType } from "@/components/core/shared/select-type"
import { SelectNetwork } from "@/components/core/shared/select-network"
import { useCreator } from "@/components/providers/creator-provider"
import { getContractExplorer } from "@/lib/chains"
import { isAddress } from "viem"
import { SampleQuestProp } from "./sample/shared"

interface QuestTestToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleValueChange: (item: SampleQuestProp) => void
    input: string,
    output: string,
}

export function QuestTestToolbar({ handleValueChange, input, output }: QuestTestToolbarProps) {
    const { chainId } = useCreator()

    const iconSize = "h-5 w-5"

    return (
        <div className="flex items-center justify-between my-2">
            <SampleDrawer onValueChange={handleValueChange} />

            <div className="flex items-center gap-2">
                {!isAddress(input)
                    ? <Globe className={cn("text-grayscale-250 cursor-not-allowed", iconSize)} />
                    : <a href={`${getContractExplorer(chainId, input)}`} target="_blank">
                        <Globe className={iconSize} />
                    </a>}
                {!output.startsWith("0x")
                    ? <Copy className={cn("text-grayscale-250 cursor-not-allowed", iconSize)} />
                    : <CopyText className={iconSize} payload={output} />}
                <SelectType />
                <SelectNetwork />
            </div>
        </div>
    )
}