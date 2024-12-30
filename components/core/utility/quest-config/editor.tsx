import Editor, { useMonaco } from '@monaco-editor/react';
import { useEditor } from '@/components/core/shared/editor/provider';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { editorConfig, editorTheme } from '@/components/core/shared/editor/editor';

export default function MarkdownEditor() {
    const { theme } = useTheme()
    const { content, setContent } = useEditor()
    const monaco = useMonaco()

    const onChange = async (val: string | undefined, event: any) => {
        if (!val) return

        setContent(val)
    }

    // Change Theme
    useEffect(() => {
        editorTheme(monaco, theme)
    }, [monaco, theme])

    return (
        <Editor height="75vh" defaultLanguage="markdown"
            onChange={onChange}
            defaultValue={"{}"}
            value={content}
            options={editorConfig}
            onMount={(editor, monaco) => {
                editorTheme(monaco, theme)
            }}
        />
    )
}