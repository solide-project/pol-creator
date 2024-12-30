import { generateQuestId } from '../../../lib/quest/utils'
import { describe, expect, test } from 'vitest'

describe(`Testing variants in Quest Url`, () => {
    const expectedQuestId = "0xd82633c9cac34f3225c7f56b0e62f4b988d5361c9931b02a0c58d985cad6956a"

    test('Case sensitive owner name', () => {
        const uri = "https://github.com/POLearn/staking-ape-coin/blob/master/content/03_ape_stake/03_claim_stake/README.md"

        const actualQuestId = generateQuestId(uri)
        
        expect(actualQuestId).toBe(expectedQuestId)
    })

    test('Case sensitive repo name', () => {
        const uri = "https://github.com/polearn/Staking-APE-Coin/blob/master/content/03_ape_stake/03_claim_stake/README.md"

        const actualQuestId = generateQuestId(uri)
        
        expect(actualQuestId).toBe(expectedQuestId)
    })

    test('Case sensitive owner and repo name', () => {
        const uri = "https://github.com/POLearn/Staking-APE-Coin/blob/master/content/03_ape_stake/03_claim_stake/README.md"

        const actualQuestId = generateQuestId(uri)
        
        expect(actualQuestId).toBe(expectedQuestId)
    })

    test('Case sensitive filepath name', () => {
        const uri = "https://github.com/POLearn/Staking-APE-Coin/blob/master/Content/03_Ape_stake/03_claim_stake/README.md"

        const actualQuestId = generateQuestId(uri)
        
        expect(actualQuestId).toBe(expectedQuestId)
    })

    test('Case sensitive readme', () => {
        const uri = "https://github.com/POLearn/Staking-APE-Coin/blob/master/Content/03_Ape_stake/03_claim_stake/readme.md"

        const actualQuestId = generateQuestId(uri)
        
        expect(actualQuestId).toBe(expectedQuestId)
    })
})