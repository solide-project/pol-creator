import { ChainType } from "@/components/providers/creator-provider";

export interface SampleQuestProp {
    quest: any
    transaction?: string
    title: string
    description?: string
    type?: ChainType
}

export const samples: SampleQuestProp[] = [
    {
        quest: {
            "path": "01_deploy_your_first_token/05_deploy",
            "type": "deployment",
            "chain": "656476",
            "bytecode": "0x86d1b8039b28cf6e8bfbc8ec91d3e4cda65348f689bdc101b1fe39a9f590dcba"
        },
        transaction: "0x59fe50b3e2aa15399b2334b5701243ab27b5150aa59f325067a121f80c798409",
        title: "Deploy a setter contract",
        description: ""
    },
    {
        quest: {
            "path": "01_deploy_your_first_token/05_deploy",
            "type": "deployment",
            "chain": "1282977196",
            "bytecode": "0xab1e7fe48a2491a5f6932f8d78b10809f1d70f029a964aa0870daf563748afe7"
        },
        transaction: "J83un887QYEidTptqwgVEzWEKzL3zyMw4UBR7ocWsu6G",
        title: "Deploy a Package",
        description: "",
        type: ChainType.MOVE
    },
    {
        quest: {
            "path": "01_ape_coin/02_approving_ape_staking_contract",
            "description": "Prerequisite to appoving tokens for ApeCoin Staking",
            "type": "transaction",
            "chain": "11155111",
            "contract": "0x755457DBC2aAa7568169C58942755c8Bf2b406d1",
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            "args": [
                "0x69a2e10e626a08654017075B7B0B1797ae67fe50",
                "100000000000000000000"
            ]
        },
        transaction: "0x4e2f24422ed1795625d3ea0dc262e0491fe2f1c9aa571ba0b5a15e07effd0560",
        title: "Approve 100 $APE to an address",
        description: "Quest that requires users to execute an approve method on a specific contract with specific arguments."
    },
    {
        quest: {
            "path": "02_vrrf/01_deploying_a_random_dice",
            "type": "deployment",
            "chain": "89",
            "bytecode": "0x2b5fffe956bfe371b20415f9549604bd3236d60c8eecb9754438bb98f8973bac"
        },
        transaction: "0x46beaa78bbd54dd2e67f94d8a9313e1816bb9e2d889a37ec2575d8556248d382",
        title: "Deploy smart contract",
        description: ""
    }
]