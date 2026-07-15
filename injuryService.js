// ========================================
// ATHENA INJURY SERVICE
// Sprint 22
// ========================================

export async function getPlayerInjury(playerName) {

    try {

        return {

            name: playerName,

            status: "Available",

            injury: null,

            expectedMinutesAdjustment: 0,

            usageAdjustment: 0,

            teammatesBoosted: [],

            updated: new Date().toISOString()

        };

    }

    catch(error){

        console.error("Injury Service Error:", error);

        return {

            name: playerName,

            status: "Unknown",

            injury: null,

            expectedMinutesAdjustment: 0,

            usageAdjustment: 0,

            teammatesBoosted: [],

            updated: new Date().toISOString()

        };

    }

}

// ========================================
// Future Function
// ========================================

export function calculateInjuryBoost(player){

    return{

        minutesBoost:0,

        usageBoost:0,

        projectionBoost:0

    };

}
