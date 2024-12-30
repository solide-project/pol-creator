export interface NavItemData {
    title: string
    items: NavItemData[] | string
}

export const data: NavItemData[] = [
    {
        title: "Test",
        items: "/quest"
    },
    {
        title: "Markdown",
        items: "/markdown"
    },
    {
        title: "Utility",
        items: [
            {
                title: "Contract Hash",
                items: "/utility/contract"
            },
            {
                title: "Quest Id",
                items: "/utility/quest"
            },
            {
                title: "Quest Configuration",
                items: "/utility/config"
            },
        ]
    }
] 