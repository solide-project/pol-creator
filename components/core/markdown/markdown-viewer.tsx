"use client"

import React, {  } from "react";
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import { cn } from "@/lib/utils";
import { CodeSnippet } from "@/components/core/shared/code-snippet";
import { useMarkdown } from "@/components/core/markdown/editor/provider";

interface MarkdownViewerProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MarkdownViewer({ className }: MarkdownViewerProps) {
    const { markdownContent } = useMarkdown()

    return <div className={cn("container", className)}>
        {markdownContent
            ? <Markdown
                remarkPlugins={[remarkGfm, remarkFrontmatter]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ className, ...props }) => (
                        <h1
                            className={cn(
                                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h2: ({ className, ...props }) => (
                        <h2
                            className={cn(
                                "mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h3: ({ className, ...props }) => (
                        <h3
                            className={cn(
                                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h4: ({ className, ...props }) => (
                        <h4
                            className={cn(
                                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h5: ({ className, ...props }) => (
                        <h5
                            className={cn(
                                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h6: ({ className, ...props }) => (
                        <h6
                            className={cn(
                                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    p: ({ className, ...props }) => (
                        <p
                            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
                            {...props}
                        />
                    ),
                    ul: ({ className, ...props }) => (
                        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
                    ),
                    ol: ({ className, ...props }) => (
                        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
                    ),
                    li: ({ className, ...props }) => (
                        <li className={cn("mt-2", className)} {...props} />
                    ),
                    strong: ({ className, ...props }) => (
                        <strong className={cn("text-primary", className)} {...props} />
                    ),
                    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
                    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
                        <div className="my-6 w-full overflow-y-auto">
                            <table className={cn("w-full", className)} {...props} />
                        </div>
                    ),
                    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
                        <tr
                            className={cn("m-0 border-t p-0 even:bg-muted", className)}
                            {...props}
                        />
                    ),
                    th: ({ className, ...props }) => (
                        <th
                            className={cn(
                                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                                className
                            )}
                            {...props}
                        />
                    ),
                    td: ({ className, ...props }) => (
                        <td
                            className={cn(
                                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                                className
                            )}
                            {...props}
                        />
                    ),
                    code: ({ className, ...props }) => {
                        const { children, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || "")
                        return match
                            ? <CodeSnippet language={match[1]}>
                                {String(children).replace(/\n$/, "")}
                            </CodeSnippet>
                            : (<code
                                className={cn(
                                    "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
                                    className
                                )}
                                {...props}
                            />)
                    },
                    img: ({ className, ...props }) => (
                        <div className="w-full flex items-center justify-center py-1">
                            <img
                                className={cn(
                                    "rounded-md",
                                    className
                                )}
                                {...props}
                            />
                        </div>
                    ),
                    blockquote: ({ className, ...props }) => (
                        <blockquote className="w-full mt-4" {...props} />
                    ),
                    a: ({ className, ...props }) => (
                        <a className={cn(
                            "hover:underline text-secondary",
                            className
                        )} {...props} target="_blank" />
                    ),
                }}>
                {markdownContent}
            </Markdown>
            : <div className="h-[80vh] flex items-center justify-center text-center">
                <div>
                    <div>
                        Nothing to see here. Move to the next resource

                    </div>
                    <div>
                        If you think this is a mistake, please do a PR @
                        <a href="#" target="_blank">Here</a>
                    </div>
                </div>
            </div>}
    </div>
}