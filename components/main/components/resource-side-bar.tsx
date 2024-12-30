"use client"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { QuestStructure } from "@/lib/quest";

interface ResourceSideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    questStructure: QuestStructure
}

export function ResourceSideBar({ questStructure }: ResourceSideBarProps) {
    return <div>
        <div>Quest</div>
        <div className="hidden sm:flex">
            <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-2">
                {/* {Object.keys(questStructure).map((key, index) => {
                    return <SideBarItem key={index} quest={questStructure[key]} isExpanded={false} />
                })} */}
            </ol>
        </div>

        <div className="sm:hidden">
            <Collapsible>
                <CollapsibleTrigger>Quest</CollapsibleTrigger>
                <CollapsibleContent>
                    {/* <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-2">
                        {Object.keys(questStructure).map((key, index) => {
                            return <SideBarItem key={index} quest={questStructure[key]} isExpanded={false} />
                        })}
                    </ol> */}
                </CollapsibleContent>
            </Collapsible>
        </div>
    </div>
}