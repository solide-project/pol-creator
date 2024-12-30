"use client"

import { ResourceLoader } from "./components/resource-loader";
import { QuestProvider } from "../providers/quest-provider";

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function App({ className }: AppProps) {
    return <div className="min-h-screen-patched flex w-full flex-col sm:flex-row">

        <main className="relative min-h-full max-h-screen overflow-auto flex-1">
            <div>Viewer</div>
            <QuestProvider>
                <ResourceLoader />
            </QuestProvider>
        </main>
    </div>
}