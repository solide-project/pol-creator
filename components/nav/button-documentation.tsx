import { buttonVariants } from "@/components/ui/button";

export function ButtonDocumentation() {
    const uri = "https://docs.solide0x.tech/docs/pol/intro"

    return (
        <a href={uri} target="_blank"
            className={buttonVariants({ variant: "outline" })}>
            Docs
        </a>
    )
}