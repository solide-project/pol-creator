import { SuiClient } from "@mysten/sui/client";
// import { getCode, getPackageByDigest } from "../move/sui";
import { sha256 } from "viem";
import {
    ContractData, Deployment, NativeValue,
    SubmissionBody,
    SubmissionOpt,
    Transaction,
    SubmissionReceipt,
    defaultOpts
} from "@/lib/polearn/core";
import { getCode, getPackageByDigest } from "@/lib/move/sui";

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

    console.log(transaction)

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