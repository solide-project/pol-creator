import { SuiClient, SuiTransactionBlockResponse } from "@mysten/sui/client";
import { MoveModule, ContractBytecode } from "./interface";
import { toHex } from "viem";
import { getRPC } from "../../chains/move/rpc";

export const getNormalizedMoveModulesByPackage = async (chain: string, packageAddress: string): Promise<MoveModule> => {
    const rpc = getRPC(chain)
    const client = new SuiClient({ url: rpc });

    return client.call('sui_getNormalizedMoveModulesByPackage', [packageAddress]);
}

export const getCodeAPI = async (chain: string, packageAddress: string) => {
    const response = await fetch(`https://suiscan.xyz/api/sui-backend/testnet-wave-3/api/packages/sources/${packageAddress}`)
    const data = await response.json()
    console.log(data)

    return ""
}

export const getCode = async (chain: string, packageAddress: string) => {
    const contract = await getNormalizedMoveModulesByPackage(chain, packageAddress)
    console.log(contract)
    const bytecode: ContractBytecode = {};
    const sortedModules = Object.entries(contract).sort(([a], [b]) => a.localeCompare(b));
    for (const [contractName, { exposedFunctions }] of sortedModules) {
        const functions = Object.entries(exposedFunctions).map((
            [name, { visibility, parameters, return: returnValues }]
        ) => ({
            name,
            visibility,
            inputs: parameters?.length ?? 0,
            outputs: returnValues?.length ?? 0,
        }))
            .sort((a, b) => a.name.localeCompare(b.name));
        bytecode[contractName] = { functions };
    }
    return toHex(JSON.stringify(bytecode))
}

export const getPackageByDigest = async (client: SuiClient, digest: string) => {
    try {
        const data: SuiTransactionBlockResponse = await client.call('sui_getTransactionBlock', [digest,
            {
                // "showInput": true,
                // "showEffects": true,
                // "showEvents": true,
                // "showBalanceChanges": true,
                "showObjectChanges": true
            }
        ]);

        const published = data.objectChanges?.filter((change) => change.type === 'published').pop();
        if (!published) {
            throw new Error("No published package found")
        }

        return published.type === 'published' ? published : null;
    } catch (e: any) {
        console.error(e)
    }
}

export const getMoveObjectType = (moveObject: string) => {
    const [_, module, type] = moveObject.split("::")
    return { module, type }
}