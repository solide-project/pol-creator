"use client"

import { useState } from "react"
import { UtilityHeader } from "../header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreator } from "@/components/providers/creator-provider"
import MarkdownEditor from "./editor"
import { SampleDrawer } from "./sample"
import { validate } from "@/lib/quest/validate"
import { convertImportToMongo } from "@/lib/quest/converter"
import { useEditor } from "../../shared/editor/provider"
import { QuestConfigToolbar } from "./toolbar"

interface UtilityQuestConfigProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UtilityQuestConfig({ }: UtilityQuestConfigProps) {
    const creator = useCreator()
    const { content } = useEditor()

    const [output, setOutput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleValueChange = () => {

    }

    const handleOnClick = async () => {
        try {
            setIsLoading(true)
            setOutput("")
            const items = convertImportToMongo(validate(content))
            setOutput(JSON.stringify(items))
        } catch (e: any) {
            console.error(e)
            if (e instanceof SyntaxError) {
                setOutput("quest.config is not a valid json")
            } else {
                setOutput(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="px-8">
            <div className="grid grid-cols-12 gap-4 my-2">
                <div className="col-span-12 lg:col-span-4">
                    <UtilityHeader title="Validate Quest Config" className="my-0" />

                    <QuestConfigToolbar handleValueChange={handleValueChange} />

                    <Button className="w-full"
                        disabled={isLoading} onClick={handleOnClick}>
                        {isLoading ? "Validating..." : "Submit"}
                    </Button>

                    <div className="my-2">
                        {output && <div className="text-wrap">{output}</div>}
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8 order-first flex flex-col">
                    <MarkdownEditor />
                </div>
            </div>
        </div>
    )
}

