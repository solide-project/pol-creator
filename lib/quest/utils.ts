import { hashMessage } from "viem"
import { QuestStructure, QuestStructureItem, QuestTitle } from "./interface"
import path from "path";
import GitUrlParse from "git-url-parse";

export const ACCOUNT_LINK_MESSAGE = "Sign this message to connect to Proof of Learn."

export const parseTitle = (name: string): QuestTitle | null => {
    const match = name.match(/^(\d+)_([a-zA-Z0-9_]+)$/);

    if (!match) {
        return null
    }

    const number = parseInt(match[1], 10);
    const title = match[2].replace(/_/g, ' ');

    return {
        number,
        title,
        name,
        path: "",
        id: ""
    };
}

export const joinUri = (...paths: string[]): string => {
    if (paths.length === 0) {
        return ""
    }

    paths = paths.map(path => path.replace(/^\/|\/$/g, ""))
    return paths.join("/")
}

export const generateQuestPath = (item: QuestTitle, owner: string, name: string, parent?: QuestTitle) => {
    const source = `https://github.com/${owner}/${name}/blob/master/content`
    const paths = [source]
    if (parent) paths.push(parent.name)
    paths.push(item.name)

    return joinUri(...paths)
}

/**
 * Method to generate Quest id for a given Github URL
 * For example a quest for this content,
 * https://github.com/POLearn/pol-template/blob/master/content/01_deploy_your_first_token/05_deploy/README.md
 * 
 * Will be converted
 * polearn/pol-template/content/01_deploy_your_first_token/05_deploy/README.md
 * 
 * Note that it the README.md is include to validate the quest
 * the path should be lowercase except for the README.md
 */
export const generateQuestId = (uri: string): string => {
    const parsed = GitUrlParse(uri)
    const questPath = path.join(parsed.full_name.toLowerCase(), parsed.filepath.toLowerCase())
    // Hacky method but it should be like this
    const correctedPath = questPath.replace(/readme\.md$/i, 'README.md');

    return hashMessage(correctedPath.replace(/\\/g, "/"))
}

export const generateQuestIdByQuestStructureItem = (item: QuestStructureItem): string => {
    const content = joinUri(item.name.path, "README.md")
    return generateQuestId(content)
}

export const flatten = (data: QuestStructure): { id: string, name: QuestTitle }[] => {
    let result: { id: string, name: QuestTitle }[] = []

    sortStringNumbers(Object.keys(data)).forEach(key => {
        const item = data[key]
        result.push({ id: item.name.id, name: item.name })
        if (item.children) {
            result = result.concat(flatten(item.children))
        }
    })

    return result
}

function sortStringNumbers(arr: string[]): string[] {
    return arr.sort((a, b) => {
        return parseFloat(a) - parseFloat(b);
    });
}

export const mask = (address: string, depth: number = 8): string => {
    return `${address.substring(0, depth)}...${address.substring(address.length - Math.ceil(depth / 2))}`
}