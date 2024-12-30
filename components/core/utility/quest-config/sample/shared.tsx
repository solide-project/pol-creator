export interface SampleItemProp {
    name: string;
    value: any
}

export const samples: SampleItemProp[] = [
    {
        name: "Proof of Learn Deploying ERC20",
        value: {
            "metadata": {
                "owner": "5208980",
                "name": "ape-quest",
                "chain": "84532",
                "title": "Staking Ape Coin",
                "description": "This is a template for creating a new learn path",
                "image": "https://placehold.co/600x400"
            },
            "quests": [
                {
                    "path": "01_ape_coin",
                    "type": "transaction",
                    "chain": "11155111",
                    "contract": "0x755457DBC2aAa7568169C58942755c8Bf2b406d1",
                    "abi": [
                        "function mint(address to, uint256 amount)"
                    ]
                }
            ],
            "chain": "1"
        }
    },
]