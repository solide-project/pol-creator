import { buttonVariants } from "@/components/ui/button";

export function ButtonDapp() {
    const uri = "https://pol.solide0x.tech"

    return (
        <a href={uri} target="_blank"
            className={buttonVariants({ variant: "secondary" })}>
            Start Learning
        </a>
    )
}