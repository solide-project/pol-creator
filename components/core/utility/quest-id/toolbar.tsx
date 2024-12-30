import { Copy, SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react"
import { SampleDrawer } from "./sample"
import { SampleItemProp } from "./sample/shared"
import { CopyText } from "@/components/core/shared/copy-text"
import { cn } from "@/lib/utils"
import { githubUri } from "./shared"

interface QuestIdToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleValueChange: (item: SampleItemProp) => void
    input: string,
    output: string,
}

export function QuestIdToolbar({ handleValueChange, input, output }: QuestIdToolbarProps) {
    const iconSize = "h-5 w-5"
    return (
        <div className="flex items-center justify-between my-2">
            <SampleDrawer onValueChange={handleValueChange} />

            <div className="flex items-center gap-2">
                {!input.startsWith(githubUri)
                    ? <SquareArrowOutUpRight className={cn("text-grayscale-250 cursor-not-allowed", iconSize)} />
                    : <a href={input} target="_blank">
                        <SquareArrowOutUpRight className={iconSize} />
                    </a>}
                {!output.startsWith("0x")
                    ? <Copy className={cn("text-grayscale-250 cursor-not-allowed", iconSize)} />
                    : <CopyText className={iconSize} payload={output} />}
            </div>
        </div>
    )
}