"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UtilityHeader } from "@/components/core/utility/header"
import JsonEditor from "@/components/core/quest/editor"
import { useEditor } from "@/components/core/shared/editor/provider"
import { SampleQuestProp } from "@/components/core/quest/sample/shared"
import { ChainType, useCreator } from "@/components/providers/creator-provider"
import { getRPC } from "@/lib/chains"
import { createPublicClient, http, TransactionNotFoundError } from "viem"
import { QuestTestToolbar } from "./toolbar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    generateDataHash,
    processContractData, processDeploymentSubmission, processDeployTransaction,
    processNativeValueTransaction, SubmissionReceipt
} from "@polearn/core"

interface QuestTesterProps extends React.HTMLAttributes<HTMLDivElement> {
}

class JSONParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "JSONParseError";
        Object.setPrototypeOf(this, JSONParseError.prototype);
    }
}

export function QuestTester({ }: QuestTesterProps) {
    const creator = useCreator()
    const editor = useEditor()

    const [value, setValue] = useState("")
    const [nonTransaction, setNonTransaction] = useState(false)

    const [output, setOutPut] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleValueChange = (item: SampleQuestProp) => {
        editor.setContent(JSON.stringify(item.quest, null, 2))
        item.transaction && setValue(item.transaction)

        creator.setChainType(item.type || ChainType.EVM)
        creator.setChainId(item.quest.chain)
    }

    const handleTest = async () => {
        try {
            setIsLoading(true)
            setOutPut("")
            creator.chainType === ChainType.EVM
                ? await handleEVMTest()
                : await handleMoveTest()
            // toast.success("Success")
            setOutPut("Success")
        } catch (e: any) {
            console.log(e)
            if (e instanceof TransactionNotFoundError) {
                setOutPut("Transaction Not Found. Make sure it exist in explorer")
            } else if (e instanceof JSONParseError) {
                setOutPut(e.message)
            } else {
                setOutPut("Fail to validate quest")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const generateBody = () => {
        if (nonTransaction || !value.startsWith("0x")) {
            return {
                id: "0x" as `0x${string}`,
                transactionHash: generateDataHash(value) as `0x${string}`,
                user: "0x" as `0x${string}`,
            }
        }

        return {
            id: "0x" as `0x${string}`,
            transactionHash: value as `0x${string}`,
            user: "0x" as `0x${string}`,
        }
    }

    const generateSubmission = () => {
        try {
            return JSON.parse(editor.content);
        } catch {
            throw new JSONParseError("Unable to parse quest")
        }
    }

    const handleEVMTest = async () => {
        const body = generateBody()
        const submission: any = generateSubmission()

        const opts: any = {
            testing: true
        }

        const rpc = getRPC(submission.chain)
        const client = createPublicClient({
            transport: http(rpc),
        })

        let reciept: SubmissionReceipt = {
            result: false
        }
        switch (submission.type) {
            case "deployment":
                reciept = await processDeploymentSubmission(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            case "value":
                reciept = await processNativeValueTransaction(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            case "data":
                reciept = await processContractData(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Contract Value")
                break;
            default:
                reciept = await processDeployTransaction(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }


        if (!reciept.result)
            throw new Error("Invalid Submission")
    }

    const handleMoveTest = async () => {
        const body = generateBody()
        const submission: any = generateSubmission()

        const opts: any = {
            testing: true
        }

        // const rpc = getMoveRPC(submission.chain)
        // const client = new SuiClient({ url: rpc });

        // let reciept: SubmissionReceipt = {
        //     result: false
        // }
        // switch (submission.type) {
        //     case "deployment":
        //         reciept = await processMoveDeploymentSubmission(client, body, submission, opts)
        //         if (!reciept.result) throw new Error("Invalid Deployment")
        //         break;
        //     default:
        //         reciept = await processMoveDeployTransaction(client, body, submission, opts)
        //         if (!reciept.result) throw new Error("Invalid Transaction")
        //         break;
        // }


        // if (!reciept.result)
        //     throw new Error("Invalid Submission")
    }

    return (
        <div className="grid grid-cols-12 px-8 gap-4">
            <div className="col-span-12 lg:col-span-4">
                <UtilityHeader title="Quest Test" />

                <QuestTestToolbar handleValueChange={handleValueChange}
                    input={value} />

                <Input value={value} onChange={(e) => setValue(e.target.value)}
                    placeholder="Transaction Hash" />

                <div className="flex items-center gap-2 my-2">
                    <div>Non Transaction</div>
                    <Checkbox checked={nonTransaction}
                        onCheckedChange={(e) => setNonTransaction(!nonTransaction)} />
                </div>

                <Button className="my-2 w-full" disabled={isLoading} onClick={handleTest}>
                    {isLoading ? "Validating..." : "Submit"}
                </Button>

                <div className="my-2 px-3">
                    {output && <div className="break-all">{output}</div>}
                </div>
            </div>
            <div className="col-span-12 lg:col-span-8 order-first py-8">
                <JsonEditor />
            </div>
        </div>
    )
}