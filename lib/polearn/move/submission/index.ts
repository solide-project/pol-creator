import { SuiClient, SuiObjectData } from "@mysten/sui/client";
import { getCode, getCodeAPI, getMoveObjectType, getPackageByDigest } from "../../move/sui";
import { sha256 } from "viem";
import {
    defaultOpts,
    SubmissionOpt,
    SubmissionReceipt,
    Deployment,
    Transaction
} from "../../core";
import { MoveObjectData, SubmissionBody } from "./interface";

export const processDeploymentSubmission = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: Deployment,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const transaction = await client.getTransactionBlock({
        digest: payload.transactionHash,
        options: {
            showEffects: true,
            showInput: false,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false,
        },
    });
    const data = await getPackageByDigest(client, transaction.digest);
    if (!data?.packageId)
        throw new Error(`Invalid digest`)

    const chainHex = await client.getChainIdentifier()
    const chainId = parseInt(chainHex, 16).toString()
    const bytecode = await getCode(chainId, data?.packageId)

    const bytehash = sha256(bytecode as `0x${string}`)
    if (bytehash !== submission.bytecode)
        throw new Error("Invalid Transaction Hash")

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

export const processDeployTransaction = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: Transaction,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const transaction = await client.getTransactionBlock({
        digest: payload.transactionHash,
        options: {
            showEffects: true,
            showInput: false,
            showEvents: false,
            showObjectChanges: false,
            showBalanceChanges: false,
        },
    });

    //TODO

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

export const processPackageTransaction = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: MoveObjectData,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const results: { data: SuiObjectData } = await client.call('sui_getObject', [payload.transactionHash,
        {
            showContent: true,
            showOwner: true,
            showType: true,
        }
    ]);

    if (results.data.content?.dataType !== "moveObject")
        throw new Error(`Invalid Move Object`)

    if (submission.objectType) {
        const objectType = getMoveObjectType(results.data.content?.type) 
        if (submission.objectType.module !== objectType.module ||
            submission.objectType.type !== objectType.type) {
                throw new Error(`Invalid Object Type`)
            }
    }

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

export const processMoveObject = async (
    client: SuiClient,
    payload: SubmissionBody,
    submission: MoveObjectData,
    opts: SubmissionOpt = defaultOpts
): Promise<SubmissionReceipt> => {
    const results: { data: SuiObjectData } = await client.call('sui_getObject', [payload.transactionHash,
        {
            showContent: true,
            showOwner: true,
            showType: true,
        }
    ]);

    if (results.data.content?.dataType !== "moveObject")
        throw new Error(`Invalid Move Object`)

    if (submission.objectType) {
        const objectType = getMoveObjectType(results.data.content?.type) 
        if (submission.objectType.module !== objectType.module ||
            submission.objectType.type !== objectType.type) {
                throw new Error(`Invalid Object Type`)
            }
    }

    if (submission.fields) {

        console.log(results.data.content?.fields)

    }

    // Typically if decodeFunctionData is successful, we can assume the transaction is correct
    return { result: true };
}

function areEqual(obj1: Object, obj2: Object): boolean { 
    for (const [key, value] of Object.entries(obj1)) {  // Use for...of loop
        if (!(key in obj2)) { // Use in operator for key existence check
            return false;
        }

        // if (value !== "_" && obj2[key] !== value) {
        //     return false;
        // }
    }

    return true;
}