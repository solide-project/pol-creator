; "use client"

import { useState } from "react"
import { UtilityHeader } from "../header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { generateDataHash } from "@/lib/polearn/core"
import { SampleItemProp } from "./sample/shared"
import { QuestIdToolbar } from "./toolbar"

interface DataHashQuestIdProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function DataHashQuestId({ }: DataHashQuestIdProps) {
    const [value, setValue] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleOnClick = async () => {
        try {
            setIsLoading(true)
            const output = generateDataHash(value)
            setOutput(output)
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleValueChange = (item: SampleItemProp) => {
        setValue(item.value)
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <UtilityHeader title="Data Hash" />

                <QuestIdToolbar handleValueChange={handleValueChange}
                    input={value} output={output} />

                <Input onChange={handleOnChange} value={value} placeholder="data" />

                <div className="my-2 px-3">
                    {output && <div className="break-all">{output}</div>}
                </div>

                <Button className="w-full"
                    disabled={isLoading}
                    onClick={handleOnClick}>
                    {isLoading ? "Loading ..." : "Generate"}
                </Button>
            </div>
        </div>
    )
}

