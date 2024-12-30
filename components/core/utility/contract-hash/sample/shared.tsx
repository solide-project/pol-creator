import { ChainType } from "@/components/providers/creator-provider";
import { ChainID } from "@/lib/chains";
import { ChainID as MoveChainID } from "@/lib/chains/move/chain-id";

export interface SampleItemProp {
    chain: ChainID | MoveChainID;
    address: string;
    name: string;
    type?: ChainType;
}

export const samples: SampleItemProp[] = [
    {
        chain: ChainID.ETHEREUM_MAINNET,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        name: "USDC"
    },
    {
        chain: ChainID.EDUCHAIN,
        address: "0x435D669eFe1b328F4BA9c24BFBA91b053B34FdEe",
        name: "GRASP Token"
    },
    {
        chain: ChainID.ETHEREUM_MAINNET,
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        name: "Bored Ape Yacht Club"
    },
    {
        chain: ChainID.MOONBEAM_MAINNET,
        address: "0x8c4425e141979c66423A83bE2ee59135864487Eb",
        name: "Chainlink BTC/USD Price Feed"
    },
    {
        chain: ChainID.WORLD_MAINNET,
        address: "0x4200000000000000000000000000000000000006",
        name: "Wrapped Ether"
    },
    {
        chain: MoveChainID.SUI_TESTNET,
        address: "0xcd2a59fc6473e09b3ca71491f4148e39bc590ff2efd45eebe94b52d559c7a81a",
        name: "Package",
        type: ChainType.MOVE
    },
    {
        chain: ChainID.ARBITRUM_ONE,
        address: "0xaD1d5344AaDE45F43E596773Bcc4c423EAbdD034",
        name: "Chainlink AAVE/USD Price Feed"
    },
    {
        chain: ChainID.INK,
        address: "0x3a867fCfFeC2B790970eeBDC9023E75B0a172aa7",
        name: "MailBox"
    },
    {
        chain: ChainID.BNB_MAINNET,
        address: "0x17539cca21c7933df5c980172d22659b8c345c5a",
        name: "Pancake Swap NFT Market"
    },
]