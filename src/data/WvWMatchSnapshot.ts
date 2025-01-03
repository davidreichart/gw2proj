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
}

async function fetchMatchSnapshots() {
    // how many matches are there to create snapshots for?
    let matchCount: number;
    let matchList: Response;
    let data;
    try {
        matchList = await fetch('https://api.guildwars2.com/v2/wvw/matches');
        if (!matchList.ok) {
            console.error(`Fetch error: ${matchList.status}`);
            return;
        }
        data = await matchList.json();
        matchCount = data.length;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        return;
    }

    // query each match from the api to see what servers are assigned against each other and what teams are they on
    const snapshots: MatchSnapshot[] = [];
    const foundMatches: string[] = data;
    for (let i = 0; i < matchCount; i++) {
        try {
            const response = await fetch(`https://api.guildwars2.com/v2/wvw/matches/overview?id=${foundMatches.at(i)}`)
            if (!response.ok) {
                console.error(`Fetch error: ${response.status}`);
                return;
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(`Fetch error: ${error}`);
            return;
        }
    }
}

fetchMatchSnapshots();