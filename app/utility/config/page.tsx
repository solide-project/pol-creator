import { EditorProvider } from "@/components/core/shared/editor/provider";
import { UtilityQuestConfig } from "@/components/core/utility/quest-config";

export default async function Page() {
    return <EditorProvider>
        <UtilityQuestConfig />
    </EditorProvider>
}