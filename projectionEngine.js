// ========================================
// ATHENA PROJECTION ENGINE
// Sprint 23
// ========================================

import { getPlayerStats } from "./statsService.js";
import { getPlayerInjury } from "./injuryService.js";

export async function buildProjection(player){

    const stats = await getPlayerStats(player.name);

    const injury = await getPlayerInjury(player.name);

    if(!stats){

        return null;

    }

    let minutes = stats.minutes ?? 30;

    let fppm = stats.fppm ?? 1.00;

    // Injury Adjustments

    minutes += injury.expectedMinutesAdjustment;

    const usageBoost = injury.usageAdjustment;

    // Base Projection

    const projection =

        (minutes * fppm)

        + usageBoost;

    // Ceiling / Floor

    const ceiling = projection * 1.25;

    const floor = projection * 0.80;

    // DraftKings Value

    const value =

        projection /

        (player.salary / 1000);

    // Athena Rating

    const athenaRating =

        projection * .60 +

        value * 12 +

        ceiling * .15;

    return{

        player:player.name,

        minutes,

        fppm,

        projection:Number
