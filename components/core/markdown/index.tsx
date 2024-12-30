"use client"

import { UtilityHeader } from "../utility/header";
import { MarkdownEditor } from "./editor";
import { MarkdownViewer } from "@/components/core/markdown/markdown-viewer";

interface UtilityMarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UtilityMarkdown({ }: UtilityMarkdownProps) {
    return (
        <div className="px-8">
            <div className="grid grid-cols-12 gap-4">
                <div className="sticky top-0 col-span-12 lg:col-span-6 h-[90vh] flex flex-col items-center justify">
                    <UtilityHeader title="Course Content Editor" className="my-0" />
                    <MarkdownEditor />
                </div>
                <div className="col-span-12 lg:col-span-6 py-8">
                    <MarkdownViewer />
                </div>
            </div>
        </div>
    )
}