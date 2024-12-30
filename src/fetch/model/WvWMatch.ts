/**
 * @file WvWMatch.ts
 * @description This file is an object model defining all fields that make up a single WvW match between three teams.
 * The endpoint used to collect this data is https://api.guildwars2.com/v2/wvw/matches/${matchID}
 */

/**
 * Represents all data points defining the current state of a given WvW match.
 * @param id The identifier for this WvW match.
 * @param start_time The time this match began.
 * @param end_time The time this match ends/ended.
 * @param scored The overall score for each WvW team across all skirmishes.
 * @param worlds The IDs of each of the three worlds participating in this match.
 * @param all_worlds The IDs of all worlds sectioned by team color.
 * @param deaths The total number of deaths for each WvW team.
 * @param kills The total number of kills earned by each WvW team.
 * @param victory_points The total number of victory points scored by each WvW team.
 * @param skirmishes The list of each skirmish that makes up this WvW match.
 * @param maps The list of each of the four WvW matches and the statistics of each map for this match.
 */
export interface WvWMatch {
    id: string;
    start_time: string;
    end_time: string;
    scored: Scores;
    worlds: Worlds;
    all_worlds: AllWorlds;
    deaths: Deaths;
    kills: Kills;
    victory_points: VictoryPoints;
    skirmishes: Skirmish[];
    maps: Maps[];
}

/**
 * Represents the current scores for each WvW team.
 * @param red The red team's current score.
 * @param blue The blue team's current score.
 * @param green The green team's current score.
 */
export interface Scores {
    red: number;
    blue: number;
    green: number;
}

/**
 * Represents the IDs of the three worlds participating in this WvWMatch.
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
 * Represents the IDs for ALL WvW worlds categorized by team color.
 * @param red The IDs of all worlds currently assigned to the red team.
 * @param blue The IDs of all worlds currently assigned to the blue team.
 * @param green The IDs of all worlds currently assigned to the green team.
 */
export interface AllWorlds {
    red: number[];
    blue: number[];
    green: number[];
}

/**
 * Represents the number of deaths that have occurred for each WvW team.
 * @param red The current number of red team deaths.
 * @param blue The current number of blue team deaths.
 * @param green The current number of green team deaths.
 */
export interface Deaths {
    red: number;
    blue: number;
    green: number;
}

/**
 * Represents the number of kills scored by each WvW team.
 * @param red The current number of kills achieved by the red team.
 * @param blue The current number of kills achieved by the blue team.
 * @param green The current number of kills achieved by the green team.
 */
export interface Kills {
    red: number;
    blue: number;
    green: number;
}

/**
 * Represents the number of victory points scored by each WvW team.
 * @param red The current number of victory points scored by the red team.
 * @param blue The current number of victory points scored by the blue team.
 * @param green The current number of victory points scored by the green team.
 */
export interface VictoryPoints {
    red: number;
    blue: number;
    green: number;
}

/**
 * Represents a skirmish in a WvW match.
 * Each WvW match has many skirmishes where the id of each skirmish increments chronologically, starting at 1.
 * @param id The id of this skirmish.
 * @param scored The scores for each WvW team within this skirmish.
 * @param map_scores: The scores each WvW team scored in this skirmish on each map.
 */
export interface Skirmish {
    id: number;
    scores: Scores;
    map_scores: MapScores[];
}

/**
 * Represents the points scored by each team on one of the four WvW maps.
 * @param type The name of this map.
 * @param scores The scores achieved by each WvW team on this map.
 */
export interface MapScores {
    type: string;
    scores: Scores;
}

/**
 * Represents one of the four WvW maps and their statistics.
 * @param id The ID of this map.
 * @param type The name of this map type.
 * @param scores The scores of each WvW team in this map.
 * @param bonuses The bonuses applied to each WvW team in this map.
 * @param objectives The list of objectives that reside in this map.
 * @param deaths The number of deaths on each WvW team that occurred in this map.
 * @param kills The number of killes scored by each WvW team in this map.
 */
export interface Maps {
    id: number;
    type: string;
    scores: Scores;
    bonuses: Bonus[];
    objectives: Objective[];
    deaths: Deaths;
    kills: Kills;
}

/**
 * Represents a bonus applied to a WvW team.
 * @param type The name of this bonus.
 * @param owner The color of the team that has this bonus applied to.
 */
export interface Bonus {
    type: string;
    owner: string;
}

/**
 * Represents an objective within a WvW map.
 * @param id The ID number for this objective.
 * @param type The type of objective this is.
 * @param owner The ream color that owns this objective.
 * @param last_flipped The latest time when this objective was captured.
 * @param claimed_by The ID of the guild that has claimed this objective.
 * @param claimed_at The time this objective was claimed by its claimant guild.
 * @param points_tick THe number of score points this objective gives each tick.
 * @param points_capture The number of score points earned instantly when this objective is captured.
 * @param yaks_delivered The number of yaks delivered to this objective.
 * @param guild_upgrades The IDs for any guild upgrades given to this objective.
 */
export interface Objective {
    id: string;
    type: string;
    owner: string;
    last_flipped: string;
    claimed_by: string;
    claimed_at: string;
    points_tick: number;
    points_capture: number;
    yaks_delivered: number;
    guild_upgrades: number[];
}