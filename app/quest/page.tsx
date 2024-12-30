import { QuestTester } from "@/components/core/quest";
import { EditorProvider } from "@/components/core/shared/editor/provider";

export default async function Page() {
    return <EditorProvider>
        <QuestTester />
    </EditorProvider>
}