/**
 * @file WvWMatchOverview.ts
 * @description This file models an object for the returned JSON from
 * https://api.guildwars2.com/v2/wvw/matches/overview?id=.... which is a shell description of a WvW match that only
 * details what worlds are involved and when the match starts/ends.
 */
import {AllWorlds} from "./WvWMatch.ts";

/**
 * Represents the simple overview of a WvW match between three teams.
 * @param id The ID of this match.
 * @param worlds The IDs of the three worlds participating in this match.
 * @param all_worlds The IDs of all worlds sectioned by their current team color.
 * @param start_time The time this match began.
 * @param end_time The time this match ended/ends.
 */
export interface WvWMatchOverview {
    id: string;
    worlds: Worlds;
    all_worlds: AllWorlds;
    start_time: string;
    end_time: string;
}

/**
 * Represents the three IDs of competing worlds of a WvW match.
 * @param red The ID of the red team's world.
 * @param blue The ID of the blue team's world.
 * @param green The ID of the green team's world.
 */
export interface Worlds {
    red: number;
    blue: number;
    green: number;
}

/**
 * Represents the IDs of all worlds by their current team color.
 * @param red The IDs of all worlds assigned to the red team.
 * @param blue The IDs of all worlds assigned to the blue team.
 * @param green The IDs of all worlds assigned to the green team.
 */
export interface AllWorld {
    red: number[];
    blue: number[];
    green: number[];
}