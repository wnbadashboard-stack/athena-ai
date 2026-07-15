// ATHENA STATS SERVICE
// Sprint 21

export async function getPlayerStats(playerName) {

    try {

        return {

            name: playerName,

            minutes: null,

            fppm: null,

            usage: null,

            pace: null,

            offensiveRating: null,

            defensiveRating: null,

            rebounds: null,

            assists: null,

            steals: null,

            blocks: null,

            turnovers: null,

            last5: [],

            updated: new Date().toISOString()

        };

    }

    catch(error){

        console.error("Stats Service Error:",error);

        return null;

    }

}
