"use client"

import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
    payload: string,
    copyIcon?: string,
    strokeWidth?: number
}

export function CopyText({
    payload,
    className,
    strokeWidth = 2
}: CopyTextProps) {
    const copyText = () => {
        navigator.clipboard.writeText(payload)
        toast.success("Copied to clipboard")
    }

    return <Copy
        className={cn(className, "cursor-pointer")}
        strokeWidth={strokeWidth}
        onClick={copyText}
    />
}