import { Monaco } from "@monaco-editor/react";

export const editorTheme = (monaco: Monaco | null, theme: string = "light") => {
    if (!monaco) return;

    let editorTheme = "Dawn"
    if (theme === "dark") {
        editorTheme = "GitHub Dark"
    }

    import(`monaco-themes/themes/${editorTheme}.json`)
        .then(data => {
            monaco.editor.defineTheme('pol-theme', {
                ...data,
                colors: { ...data.colors, ...editorOverviewRuler, }
            } as any);
        })
        .then(_ => monaco.editor.setTheme('pol-theme'))
}

export const editorOverviewRuler = {
    "editorOverviewRuler.addedForeground": "#0000",
    "editorOverviewRuler.modifiedForeground": "#0000",
    "editorOverviewRuler.deletedForeground": "#0000",
    "editorOverviewRuler.infoForeground": "#0000",
    "editorOverviewRuler.warningForeground": "#0000",
    "editorOverviewRuler.errorForeground": "#0000",
    "editorOverviewRuler.bracketMatchForeground": "#0000",
    "editorOverviewRuler.commentForeground": "#0000",
    "editorOverviewRuler.commentUnresolvedForeground": "#0000",
    "editorOverviewRuler.currentContentForeground": "#0000",
    "editorOverviewRuler.commonContentForeground": "#0000",
    "editorOverviewRuler.incomingContentForeground": "#0000",
    "editorOverviewRuler.findMatchForeground": "#0000",
    "editorOverviewRuler.rangeHighlightForeground": "#0000",
    "editorOverviewRuler.selectionHighlightForeground": "#0000",
    "editorOverviewRuler.wordHighlightForeground": "#0000",
    "editorOverviewRuler.wordHighlightStrongForeground": "#0000",
    "editorOverviewRuler.wordHighlightTextForeground": "#0000",
}

export const editorConfig: any = {
    minimap: {
        enabled: false,
    },
    lineNumbers: "off",
    folding: false,
    wordWrap: "on",
}