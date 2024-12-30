import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CodeSnippet } from "../../shared/code-snippet"
import { $schema } from "@/lib/quest/validate"

interface ButtonSchemaProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function ButtonSchema({ }: ButtonSchemaProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Get Schema</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[75vh]">
                <DialogHeader className="max-h-[80vh] overflow-auto">
                    <DialogTitle>Quest Configuration Schema</DialogTitle>
                    <CodeSnippet>
                        {JSON.stringify($schema, null, 2)}
                    </CodeSnippet>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}