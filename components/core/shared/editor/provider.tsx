"use client"

import { createContext, useContext, useState } from "react"

export function EditorProvider({ children }: EditorProviderProps) {
    const [content, setContent] = useState(`{
  "metadata": {
    "owner": "5208980",
    "name": "ape-quest",
    "chain": "84532",
    "title": "Staking Ape Coin",
    "description": "This is a template for creating a new learn path",
    "image": "https://placehold.co/600x400"
  },
  "quests": [
    {
      "path": "01_ape_coin",
      "type": "transaction",
      "chain": "11155111",
      "contract": "0x755457DBC2aAa7568169C58942755c8Bf2b406d1",
      "abi": [
        "function mint(address to, uint256 amount)"
      ]
    }
  ]
}`)

    return (
        <EditorContext.Provider
            value={{
                content,
                setContent
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}

interface EditorProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const EditorContext = createContext({
    content: "",
    setContent: (content: string) => { }
})

export const useEditor = () => useContext(EditorContext)