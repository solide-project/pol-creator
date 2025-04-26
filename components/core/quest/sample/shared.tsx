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
            "path": "01_deploy_your_first_token/04_sui_counter",
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
            "path": "01_deploy_your_first_token/04_sui_module",
            "type": "moveObject",
            "chain": "1282977196",
            "objectType": {
                "module": "counter",
                "type": "Counter"
            }
        },
        transaction: "0x97b9d45a75ccbec247edf1a46f5cc77a2b72e879cf56b68b81ebb55f311e5664",
        title: "Check Module",
        description: "",
        type: ChainType.MOVE
    },
    {
        quest: {
            "path": "01_deploy_your_first_token/04_sui_module",
            "type": "moveObject",
            "chain": "1282977196",
            "objectType": {
                "module": "simple_oracle",
                "type": "SimpleOracle"
            },
            "fields": {
                "description": "pricing2",
                "url": "pricing2"
            }
        },
        transaction: "0xb2cbc8fc36cf0d1aaad2daf2e153695179051aa746998ec57b8a781a64f775c6",
        title: "Check Module",
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
    },
    {
        quest: {
            "path": "01_basic_fundamental/06_getting_ape_testnet",
            "type": "value",
            "chain": "33111",
            "from": "0x05C1A44374eE3dB90bCCEA6d5Bbda138d0874033",
            "value": "1000000000000000000"
        },
        transaction: "0xe6147be08cd71d73d19cd1621ab74af5690463dd9c5683d1f6328f03f88d8b64",
        title: "ApeChain Facuet 1 $APE",
        description: ""
    },
    {
        quest: {
            "path": "01_basic_fundamental/06_getting_ape_testnet",
            "type": "data",
            "chain": "33139",
            "contract": "0x2880aB155794e7179c9eE2e38200202908C17B43",
            "variable": "getPriceNoOlderThan",
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "id",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "age",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPriceNoOlderThan",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "int64",
                                    "name": "price",
                                    "type": "int64"
                                },
                                {
                                    "internalType": "uint64",
                                    "name": "conf",
                                    "type": "uint64"
                                },
                                {
                                    "internalType": "int32",
                                    "name": "expo",
                                    "type": "int32"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "publishTime",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct PythStructs.Price",
                            "name": "price",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            "args": [
                "0x15add95022ae13563a11992e727c91bdb6b55bc183d9d747436c80a483d8c864",
                "1736651044"
            ]
        },
        transaction: `{"price":     "69654195","conf":"133607","expo":      -8,   "publishTime":"1728026940"}`,
        title: "Calling Pyth Oracles getPriceNoOlderThan on ApeChain",
        description: "0xdf81a29cb81c55faa6d2a2690bc7ec8d2e52ae3497a6d4876ed52b39c8e25ca2 "
    },
    {
        quest: {
            "path": "01_basic_fundamental/06_getting_ape_testnet",
            "type": "data",
            "chain": "33139",
            "contract": "0x2880aB155794e7179c9eE2e38200202908C17B43",
            "variable": "wormhole",
            "abi": [
                {
                    "inputs": [],
                    "name": "wormhole",
                    "outputs": [
                        {
                            "internalType": "contract IWormhole",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        },
        transaction: `"0xb27e5ca259702f209a29225d0eDdC131039C9933"`,
        title: "Calling The address of Contract",
        description: "0xdf81a29cb81c55faa6d2a2690bc7ec8d2e52ae3497a6d4876ed52b39c8e25ca2 "
    }
]