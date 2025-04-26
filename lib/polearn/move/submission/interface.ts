import { Submission } from "../../core/src/submission/interface";

export interface SubmissionBody {
    id: `0x${string}`
    transactionHash: string
    user: `0x${string}`
}

/**
 * Represents a Sui Module submission
 * 
 * objectType "0x5d7f3907ceb58b001370787105d9398a42cde8aa9060c52d2e7274e435706d91::counter::Counter"
 * where module is counter and type is Counter. These are non sensitive when testing
 */
export interface MoveObjectData extends Submission {
    type: "moveObject";
    objectType?: {
        module: string
        type: string
    };
    fields: {
        [key: string]: any
    }
}

/**
 * Represents a Sui Module submission
 */
export interface MoveTransaction extends Submission {
    type: "transaction";
}

