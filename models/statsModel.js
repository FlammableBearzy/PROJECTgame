const pool = require("../config/database");
// I can create settings for the game with:
const Settings = require("./gameSettings");


function fromDBStatsToStats(dbStats) {
    return new ShowStats(dbStats.bs_id, dbStats.bs_attack, dbStats.bs_ap, dbStats.bs_rp);
}

class ShowStats
{
    constructor(statsId, attack, ap, rp)
    {
        this.statsId = statsId;
        this.attack = attack;
        this.ap = ap;
        this.rp = rp;
    }
}


class MatchStats {
    constructor(myStats, oppStats)
    {
        this.myStats = myStats;
        this.oppStats = oppStats;
    }

    static async getMatchStats(game)
    {
        try{
            await MatchStats.calculationOfStats(game);

            let [dbstats] = await pool.query(`select * from board_stats where bs_user_game_id = ? or bs_user_game_id = ?`,
                                            [game.player.id, game.opponents[0].id]);

            let playerStats = [];
            let oppStats = [];

            
            for (let dbstat of dbstats)
            {
                let s = fromDBStatsToStats(dbstat);
                if (dbstat.bs_user_game_id == game.player.id)
                {
                    playerStats.push(s);
                } else {
                    oppStats.push(s);
                }
            }
            return { status: 200, result: new MatchStats(playerStats, oppStats)};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err};
        }
    }

    static async calculationOfStats(game)
    {
        try {
            
            let [dbstats] = await pool.query(`select * from board_building inner join building on build_id = bb_build_id inner join board_stats on bs_user_game_id = bb_user_game_id where bb_user_game_id = ? or bb_user_game_id = ?;`, [game.player.id,game.opponents[0].id]);
            
            let playerStats = [];
            let oppStats = [];

            for(let i = 0; i < dbstats.length; i++)
            {
                let ConstructStats =
                {
                    buildingId: dbstats[i].bb_build_id,
                    level: dbstats[i].build_level,
                }

                if (dbstats[i].bb_user_game_id == game.player.id)
                {
                    playerStats.push(ConstructStats);
                } else {
                    oppStats.push(ConstructStats);
                }
            }

            //Player Part
            let pAttackSum = 1;
            let pRegenAP = 1;
            let pRegenRP = 1;

            //ATTACK
            for (let i = 0; i < playerStats.length; i++) {
                const { buildingId, level } = playerStats[i];
                if (buildingId >= 2 && buildingId <= 4) {
                    pAttackSum += level;
                }
            }

            // Perform the update query for playerStats with the calculated attack
            await pool.query(`update board_stats set bs_attack = ? where bs_user_game_id = ?;`,
             [pAttackSum, game.player.id]);

// -------------------------------------------------------------------------- //
            //Action Points
            for (let i = 0; i < playerStats.length; i++) {
                const { buildingId, level } = playerStats[i];
                if (buildingId >= 5 && buildingId <= 7) {
                    pRegenAP += level;
                }
            }
            
            // Perform the update query for playerStats with the calculated attack sum
            await pool.query(`update board_stats set bs_regenAP = ? where bs_user_game_id = ?;`,
             [pRegenAP, game.player.id]);

// -------------------------------------------------------------------------- //
            //Resource Points
            for (let i = 0; i < playerStats.length; i++) {
                const { buildingId, level } = playerStats[i];
                if (buildingId >= 8 && buildingId <= 10) {
                    pRegenRP += level;
                }
            }
            
            // Perform the update query for playerStats with the calculated attack sum
            await pool.query(`update board_stats set bs_regenRP = ? where bs_user_game_id = ?;`,
             [pRegenRP, game.player.id]);

// -------------------------------------------------------------------------- //// -------------------------------------------------------------------------- //

            //Opponent Part
            let oppAttackSum = 1;
            let oppRegenAP = 1;
            let oppRegenRP = 1;

            //ATTACK
            for (let i = 0; i < oppStats.length; i++) {
                const { buildingId, level } = oppStats[i];
                if (buildingId >= 2 && buildingId <= 4) {
                    oppAttackSum += level;
                }
            }

            // Perform the update query for playerStats with the calculated attack
            await pool.query(`update board_stats set bs_attack = ? where bs_user_game_id = ?;`,
             [oppAttackSum, game.opponents[0].id]);

// -------------------------------------------------------------------------- //
            //Action Points
            for (let i = 0; i < oppStats.length; i++) {
                const { buildingId, level } = oppStats[i];
                if (buildingId >= 5 && buildingId <= 7) {
                    oppRegenAP += level;
                }
            }
            
            // Perform the update query for playerStats with the calculated attack sum
            await pool.query(`update board_stats set bs_regenAP = ? where bs_user_game_id = ?;`,
             [oppRegenAP, game.opponents[0].id]);

// -------------------------------------------------------------------------- //
            //Resource Points
            for (let i = 0; i < oppStats.length; i++) {
                const { buildingId, level } = oppStats[i];
                if (buildingId >= 8 && buildingId <= 10) {
                    oppRegenRP += level;
                }
            }
            
            // Perform the update query for playerStats with the calculated attack sum
            await pool.query(`update board_stats set bs_regenRP = ? where bs_user_game_id = ?;`,
             [oppRegenRP, game.opponents[0].id]);



        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = MatchStats;