"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { data } from "@/components/nav/shared"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { ButtonDocumentation } from "@/components/nav/button-documentation"
import { ButtonDapp } from "@/components/nav/button-dapp"
import { NavItem } from "@/components/nav/nav-item"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MainNavBar({ }: MainNavBarProps) {
    const router = useRouter()

    const handleOnClick = (href: string) => {
        router.push(href)
    }
    return (
        <div className="flex items-center justify-between container">
            <ButtonDapp />
            <NavigationMenu>
                <NavigationMenuList>
                    {data.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            {typeof item.items === "string"
                                ? <Link href={item.items} legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-2.5")}>
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                                : <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "py-2.5")}>{item.title}</NavigationMenuTrigger>}

                            <NavigationMenuContent>
                                <ul className="grid gap-[4px] p-1 grid-cols-12 w-[164px]">
                                    {typeof item.items !== "string" &&
                                        item.items.map((subItem, subIndex) => {
                                            return (
                                                <NavItem key={subIndex}
                                                    onClick={() => handleOnClick(subItem.items as string)}
                                                    title={subItem.title} />
                                            )
                                        })}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center">
                <ThemeToggle />
                <ButtonDocumentation />
            </div>
        </div>
    )
}