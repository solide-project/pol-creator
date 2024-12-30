import { SampleDrawer } from "./sample"
import { SampleItemProp } from "./sample/shared"
import { ButtonSchema } from "./button-schema"

interface QuestConfigToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    handleValueChange: (item: SampleItemProp) => void
}

export function QuestConfigToolbar({ handleValueChange }: QuestConfigToolbarProps) {
    return (
        <div className="flex items-center justify-between my-2 gap-2">
            <SampleDrawer onValueChange={handleValueChange} />

            <ButtonSchema />
        </div>
    )
}