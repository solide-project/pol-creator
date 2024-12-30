"use client"

import { $getRoot } from 'lexical';
import { useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useMarkdown } from './provider';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export function MarkdownEditor() {
    const { setMarkdownContent } = useMarkdown()
    const { theme } = useTheme()

    const [editorBackground, setEditorBackground] = useState("bg-[#f9f9f9]")

    function onChange(editorState: any) {
        editorState.read(() => {
            const root = $getRoot();
            setMarkdownContent(root.__cachedText || "")
        });
    }

    function onError(error: any) {
        throw error;
    }

    const initialConfig = {
        namespace: 'MarkdownEditor',
        theme: {},
        onError,
    };

    useEffect(() => {
        setEditorBackground(theme === "light" ? "bg-[#f9f9f9]" : "bg-[#24292e]")
    }, [theme])

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <PlainTextPlugin
                contentEditable={<ContentEditable
                    className={cn("rounded-[20px] min-h-[75vh] max-h-[75vh] w-full overflow-auto p-4", editorBackground)} />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <HistoryPlugin />
        </LexicalComposer>
    );
}