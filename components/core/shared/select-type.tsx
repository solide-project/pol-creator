import { ChainType, useCreator } from "@/components/providers/creator-provider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import Image from 'next/image';

interface SelectTypeProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SelectType({ }: SelectTypeProps) {
    const { chainType, setChainType } = useCreator();

    const onChange = (value: string) => {
        setChainType(value === ChainType.MOVE ? ChainType.MOVE : ChainType.EVM);
    };

    return <Select onValueChange={onChange}>
        <SelectTrigger className="w-fit">
            <Image className="shrink-0" src={`/icons/languages/${chainType.toString().toLocaleLowerCase()}.svg`} alt="lang" width={24} height={24} />
        </SelectTrigger>
        <SelectContent>
            {Object.values(ChainType)
                .filter((v) => isNaN(Number(v)))
                .map(item => (
                    <SelectItem key={item} value={item as string} className="capitalize cursor-pointer">
                        <div className="flex items-center">
                            <Image src={`/icons/languages/${item.toLocaleLowerCase()}.svg`} alt="lang" width={24} height={24} />
                            <div>{item}</div>
                        </div>
                    </SelectItem>
                ))}
        </SelectContent>
    </Select>
}