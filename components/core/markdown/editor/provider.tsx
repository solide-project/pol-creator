"use client"

import { createContext, useContext, useState } from "react"

export function MarkdownProvider({ children }: MarkdownProviderProps) {
    const [markdownContent, setMarkdownContent] = useState("d")

    return (
        <MarkdownContext.Provider
            value={{
                markdownContent,
                setMarkdownContent,
            }}
        >
            {children}
        </MarkdownContext.Provider>
    )
}

interface MarkdownProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const MarkdownContext = createContext({
    markdownContent: "",
    setMarkdownContent: (content: string) => { },
})

export const useMarkdown = () => useContext(MarkdownContext)