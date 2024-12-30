import Editor, { useMonaco } from '@monaco-editor/react';
import { useEditor } from '@/components/core/shared/editor/provider';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useCreator } from '@/components/providers/creator-provider';
import { ChainID } from '@/lib/chains';
import { editorTheme } from '@/components/core/shared/editor/editor';

export default function JsonEditor() {
    const { theme } = useTheme()
    const { chainId, setChainId } = useCreator()
    const { content, setContent } = useEditor()
    const monaco = useMonaco()

    const onChange = async (val: string | undefined, event: any) => {
        if (!val) return

        try {
            const quest = JSON.parse(val)
            if (quest.chain && Object.values(ChainID).includes(quest.chain as ChainID)) {
                setChainId(quest.chain)
            } else {
                // Unknown
                setChainId(ChainID.ETHEREUM_MAINNET)
            }
        } catch {
            // Don't do anything, but essentially chainID is not valid
        } finally {
            setContent(val)
        }
    }

    useEffect(() => {
        try {
            const quest = JSON.parse(content)
            quest.chain = chainId
            onChange(JSON.stringify(quest, null, 2), null)
        } catch {
            // Don't do anything, but essentially chainID is not valid
        }
    }, [chainId])

    // Change Theme
    useEffect(() => {
        editorTheme(monaco, theme)
    }, [monaco, theme])

    return (
        <Editor height="75vh" defaultLanguage="markdown"
            onChange={onChange}
            defaultValue={"{}"}
            value={content}
            options={{
                minimap: {
                    enabled: false,
                },
                lineNumbers: "off",
                folding: false,
                wordWrap: "on",
            }}
            onMount={(editor, monaco) => {
                editorTheme(monaco, theme)
            }}
        />
    )
}