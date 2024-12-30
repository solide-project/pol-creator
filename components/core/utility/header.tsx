import { cn } from "@/lib/utils"

interface UtilityHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
}

export function UtilityHeader({ className, title, description = "" }: UtilityHeaderProps) {
    return (
        <div className={cn("mx-auto flex flex-col items-start gap-2 w-full my-4", className)}>
            <div className="text-3xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                {title}
            </div>
            {description &&
                <p className="max-w-2xl text-lg text-foreground">{description}</p>}
        </div>
    )
}