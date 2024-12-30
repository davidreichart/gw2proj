/**
 * @file Gw2ApiClient.ts
 * @description This file contains utility functions for querying the guild wars 2 API.
 * @functions
 *     - {@linkcode fetchWvWMatchData}(matchID: string): Promise<{@linkcode WvWMatch}>
 *     - {@linkcode fetchCurrentMatches}(): Promise<string[]>
 */

import {WvWMatch} from "../model/WvWMatch.ts";

/**
 * Fetches the most current WvW match data.
 * @param matchID The ID for the match to fetch.
 * @return A {@linkcode WvWMatch} object holding all data for the requested match.
 */
async function fetchWvWMatchData(matchID: string): Promise<WvWMatch> {
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
async function fetchCurrentMatches(): Promise<string[]> {
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