"use client"

import { MainNavBar } from "@/components/nav/main";
import { MobileNavBar } from "@/components/nav/mobile";

export function NavBar() {
    return (
        <div className="py-2">
            <div className="hidden sm:block">
                <MainNavBar />
            </div>
            <div className="block sm:hidden">
                <MobileNavBar />
            </div>
        </div>
    )
}