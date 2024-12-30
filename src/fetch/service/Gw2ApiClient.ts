/**
 * @file Gw2ApiClient.ts
 * @description This file contains utility functions for querying the guild wars 2 API.
 * @functions
 *     - {@linkcode fetchWvWMatchData}(matchID: string): Promise<{@linkcode WvWMatch}>
 *     - {@linkcode fetchCurrentMatches}(): Promise<string[]>
 */

import {WvWMatch} from "../model/WvWMatch.ts";
import {WvWMatchOverview} from "../model/WvWMatchOverview.ts";

/**
 * Fetches the most current WvW match data.
 * @param matchID The ID for the match to fetch.
 * @return A {@linkcode WvWMatch} object holding all data for the requested match.
 */
export async function fetchWvWMatchData(matchID: string): Promise<WvWMatch> {
    try {
        const response: Response = await fetch(`https://api.guildwars2.com/v2/wvw/matches/${matchID}`);

        if (!response.ok) {
            throw new Error(`HTTP response error: ${response.status}`);
        }

        const data: WvWMatch = await response.json();
        return data;
    } catch (error) {
        console.error(`Error occurred while fetching WvW Match data: ${error}`);
        throw error;
    }
}

/**
 * Fetches a list of all IDs of all active WvW matches.
 * @return An array of strings representing the available matches
 */
export async function fetchCurrentMatchIDs(): Promise<string[]> {
    try {
        const response: Response = await fetch('https://api.guildwars2.com/v2/wvw/matches');

        if (!response.ok) {
            throw new Error(`HTTP response error: ${response.status}`);
        }

        const data: string[] = await response.json();
        return data;
    } catch (error) {
        console.error(`Error occurred while fetching WvW Match list: ${error}`);
        throw error;
    }
}

/**
 * Fetches the IDs of the three worlds participating in the WvW match of the provided ID.
 * @param matchID The ID of the match to extract its participants identifiers from.
 */
export async function fetchMatchWorldIDs(matchID: string): Promise<number[]> {
    try {
        const response: Response = await fetch(`https://api.guildwars2.com/v2/wvw/matches/overview?id=${matchID}`);

        if (!response.ok) {
            throw new Error(`HTTP response error: ${response.status}`);
        }

        const data: WvWMatchOverview = await response.json();
        // convert the Worlds object to its values
        const worlds: number[] = Object.values(data.worlds);
        return worlds;
    } catch (error) {
        console.error(`Error occurred while fetching WvW Match list: ${error}`);
        throw error;
    }
}