"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import JSZip from 'jszip';
import { flatten, folderItems, generateQuestContractPath, generateQuestId, generateQuestIdByQuestStructureItem, generateQuestPath, QuestStructure, QuestTitle, stripBase } from "@/lib/quest";
import Markdown from "react-markdown";
// import { MarkdownViewer } from "../../core/shared/markdown/markdown-viewer";
import { ResourceSideBar } from "./resource-side-bar";
import { useQuest } from "@/components/providers/quest-provider";

export interface ResourceLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function ResourceLoader({ className }: ResourceLoaderProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const quest = useQuest()
    const [content, setContent] = useState<Record<string, string>>({})

    const handleOnClick = async () => {
        if (file) {
            const zip = new JSZip();
            const zipContent = await zip.loadAsync(file);
            // Process zipContent as needed
            console.log(zipContent)

            // In the zip, check if there is a content folder in root
            const hasContentFolder = Object.keys(zipContent.files).some((fileName) => {
                // Ensure it's a directory and is named "content"
                return fileName === 'content/' && zipContent.files[fileName].dir;
            });

            if (hasContentFolder) {
                console.log("The 'content' folder exists in the root of the zip.");
            } else {
                console.log("No 'content' folder found in the root of the zip.");
            }

            const owner = "test"
            const name = "test"
            const tree: { tree: any[] } = {
                tree: []
            }
            const content: Record<string, string> = {}
            Object.entries(zipContent.files).forEach(async ([key, value]) => {
                tree.tree.push({
                    path: key,
                    mode: "",
                    type: value.dir ? "tree" : "blob",
                    sha: "",
                    url: "",
                })

                if (!value.dir) {
                    const fileContent = await zipContent.files[key].async("string");
                    content[generateQuestId(`https://github.com/${owner}/${name}/blob/master/${key}`)] = fileContent
                }
            })

            // console.log(tree, content)
            setContent(content)
            const structure: QuestStructure = {} as QuestStructure
            // Get all folders under /content and remove /content from the path
            const trees = stripBase(tree.tree, "content/")
            console.log(trees)
            const base = folderItems(trees)
            console.log(base)

            base.forEach(item => {
                const quest = generateQuest(item, owner, name)
                structure[item.number] = quest

                const subTrees = stripBase(trees, `${item.name}/`)
                const subItems = folderItems(subTrees)
                const subStructure = {} as QuestStructure
                subItems.forEach(subItem => {
                    const subQuest = generateQuest(subItem, owner, name, item);
                    subStructure[subItem.number] = subQuest
                })
                if (Object.keys(subStructure).length > 0) {
                    structure[item.number].children = subStructure
                }
            })

            console.log(structure)
            const nav = flatten(structure)
            quest.manualSetQuestStructure({ name: nav[0].name })

            // Set the quest structure
            quest.setQuestStructure(structure)
            quest.setQuestOwner(owner)
            quest.setQuestName(name)
            // quest.setQuestPoap(metadata)
        }
    }

    const generateQuest = (item: QuestTitle, owner: string, name: string, parent?: QuestTitle) => {
        const questItem = { name: item }
        questItem.name.path = generateQuestPath(item, owner, name, parent)
        questItem.name.playground = generateQuestContractPath(item, owner, name, parent)
        questItem.name.id = generateQuestIdByQuestStructureItem(questItem)

        return questItem
    }
    return <div>
        <Input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
        />
        <Button onClick={handleOnClick}>Load</Button>

        <div className="grid grid-cols-12 container">
            <div className="col-span-12 lg:col-span-3 truncate">
                {quest.questStructure && <ResourceSideBar questStructure={quest.questStructure} />}
            </div>
            {/* <div className="col-span-12 lg:col-span-9">
                {quest.selectedQuest?.name.id &&
                    <MarkdownViewer content={content[quest.selectedQuest?.name.id] || "Unknown"} />}
            </div> */}
        </div>
    </div>
}