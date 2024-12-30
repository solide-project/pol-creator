import { UtilityMarkdown } from "@/components/core/markdown";
import { MarkdownProvider } from "@/components/core/markdown/editor/provider";

export default async function Page() {
    return <MarkdownProvider>
        <UtilityMarkdown />
    </MarkdownProvider>
}