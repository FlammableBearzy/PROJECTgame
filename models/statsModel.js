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
}


module.exports = MatchStats;