// ATHENA RESEARCH SERVICE
// Sprint 20

export function createResearch(player) {

    return {

        name: player.name,

        team: player.team,

        position: player.position,

        salary: player.salary,

        minutes: null,

        fppm: null,

        usage: null,

        opponent: null,

        pace: null,

        defenseRank: null,

        injuryStatus: null,

        vegasTotal: null,

        spread: null,

        last5: [],

        projection: null,

        ceiling: null,

        floor: null,

        athenaRating: null

    };

}
