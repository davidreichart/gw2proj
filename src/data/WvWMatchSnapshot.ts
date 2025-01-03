/**
 * @file WvWMatchSnapshot.ts
 * @description This file defines what a WvW match snapshot is and provides utility functions to fetch information
 * from the GW2 API that creates an array of these snapshot objects.
 * A WvW match snapshot is a minimal representation of a WvW match that includes the IDs and names of the three
 * worlds participating in the match.
 * An array of these snapshots can be created using the {@linkcode generateMatchSnapShots} function.
 */

/**
 * This enum reveals the name of each server based on its ID provided by the GW2 API.
 * ServerName[{id}] will provide the string-name of a server based on an id.
 */
enum ServerName {
    "Anvil Rock" = 1001,
    "Borlis Pass" = 1002,
    "Yak's Bend" = 1003,
    "Henge of Denravi" = 1004,
    "Maguuma" = 1005,
    "Sorrow's Furnace" = 1006,
    "Gate of Madness" = 1007,
    "Jade Quarry" = 1008,
    "Fort Aspenwood" = 1009,
    "Ehmry Bay" = 1010,
    "Stormbluff Isle" = 1011,
    "Darkhaven" = 1012,
    "Sanctum of Rall" = 1013,
    "Crystal Desert" = 1014,
    "Isle of Janthir" = 1015,
    "Sea of Sorrows" = 1016,
    "Tarnished Coast" = 1017,
    "Northern Shiverpeaks" = 1018,
    "Blackgate" = 1019,
    "Ferguson's Crossing" = 1020,
    "Dragonbrand" = 1021,
    "Kaineng" = 1022,
    "Devona's Rest" = 1023,
    "Eredon Terrace" = 1024,
    "Fissure of Woe" = 2001,
    "Desolation" = 2002,
    "Gandara" = 2003,
    "Blacktide" = 2004,
    "Ring of Fire" = 2005,
    "Underworld" = 2006,
    "Far Shiverpeaks" = 2007,
    "Whiteside Ridge" = 2008,
    "Ruins of Surmia" = 2009,
    "Seafarer's Rest" = 2010,
    "Vabbi" = 2011,
    "Piken Square" = 2012,
    "Aurora Glade" = 2013,
    "Gunnar's Hold" = 2014,
    "Jade Sea [FR]" = 2101,
    "Fort Ranik [FR]" = 2102,
    "Augury Rock [FR]" = 2103,
    "Vizunah Square [FR]" = 2104,
    "Arborstone [FR]" = 2105,
    "Kodash [DE]" = 2201,
    "Riverside [DE]" = 2202,
    "Elona Reach [DE]" = 2203,
    "Abaddon's Mouth [DE]" = 2204,
    "Drakkar Lake [DE]" = 2205,
    "Miller's Sound [DE]" = 2206,
    "Dzagonur [DE]" = 2207,
    "Baruch Bay [SP]" = 2301,
}

/**
 * This class represents the minimal data required to represent a WvW match between three teams.
 * The worlds of each team are determined at object creation as specified by {@linkcode ServerName}.
 * @param redID The ID of the red team's server.
 * @param blueID The ID of the blue team's server.
 * @param greenID The ID of the green team's server.
 * @param matchID The ID of the match.
 * @param redWorldName The name of the red team's server.
 * @param blueWorldName The name of the blue team's server.
 * @param greenWorldName The name of the green team's server.
 */
class MatchSnapshot {
    private redID: number;
    private blueID: number;
    private greenID: number;
    private matchID: string;
    private redWorldName: string;
    private blueWorldName: string;
    private greenWorldName: string;

    public constructor(redID: number, blueID: number, greenID: number, matchID: string) {
        this.redID = redID;
        this.blueID = blueID;
        this.greenID = greenID;
        this.matchID = matchID;

        this.redWorldName = ServerName[this.redID];
        this.blueWorldName = ServerName[this.blueID];
        this.greenWorldName = ServerName[this.greenID];
    }

    /**
     * Converts the match snapshot data to a JSON string.
     * @return A JSON string representing the match snapshot data.
     */
    public toJsonString(): string {
        const matchSnapshotData = {
            redID: this.redID,
            blueID: this.blueID,
            greenID: this.greenID,
            matchID: this.matchID,
            redWorldName: this.redWorldName,
            blueWorldName: this.blueWorldName,
            greenWorldName: this.greenWorldName
        };

        return JSON.stringify(matchSnapshotData);
    }
}

/**
 * Fetches the list of all currently active WvW match IDs from the GW2 API.
 * @return An array of strings representing the available matches.
 */
async function fetchCurrentMatchList(): Promise<string[]> {
    try {
        const response: Response = await fetch('https://api.guildwars2.com/v2/wvw/matches');

        if (!response.ok) {
            throw new Error(`Fetch error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fetch error ${error}`);
    }
}

/**
 * Fetches the WvW match snapshots for each match in the provided list.
 * A match snapshot consists of the IDs and names of the three worlds participating in a match.
 * @param matchList An array of strings representing the IDs of the matches to fetch snapshots for.
 * @return An array of {@linkcode MatchSnapshot} objects.
 * @see {@linkcode MatchSnapshot}
 * @param matchList
 */
async function fetchMatchSnapshots(matchList: string[]): Promise<MatchSnapshot[]> {
    const snapshots: MatchSnapshot[] = [];
    for (const match of matchList) {
        try {
            const response: Response = await fetch(`https://api.guildwars2.com/v2/wvw/matches/overview?id=${match}`);
            if (!response.ok) {
                throw new Error(`Snapshot fetch error ${response.status}`);
            }

            const jsonObject = await response.json();
            snapshots.push(new MatchSnapshot(jsonObject.worlds.red, jsonObject.worlds.blue, jsonObject.worlds.green, jsonObject.id));
        } catch (error) {
            throw new Error(`Snapshot fetch error ${error}`);
        }
    }
    return snapshots;
}

/**
 * Generates an array of {@linkcode MatchSnapshot} objects for all currently active WvW matches.
 */
async function generateMatchSnapShots(): Promise<MatchSnapshot[]> {
    const matchList: string[] = await fetchCurrentMatchList();
    const snapshots: MatchSnapshot[] = await fetchMatchSnapshots(matchList);
    return snapshots;
}
