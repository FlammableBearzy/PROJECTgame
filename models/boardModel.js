const pool = require("../config/database");
//will need to make settings for the buildings and whatnot.


function fromDBBuildingtoBuilding(dbBuilding) {
    //After database update, need to change build_hp to bb_build_hp
    return new Building(dbBuilding.build_id, dbBuilding.bb_id, dbBuilding.build_ap, dbBuilding.build_rp, dbBuilding.build_hp, dbBuilding.build_name, dbBuilding.build_effect, dbBuilding.build_level);
}

class Building {
    constructor(buildingId, boardId, costAP, costRP, health, name, effect, level) {
        this.buildingId = buildingId;
        this.boardId = boardId;
        this.costAP = costAP;
        this.costRP = costRP;
        this.health = health;
        this.name = name;
        this.effect = effect;
        this.level = level;
    }
}

class MatchBoard {
    constructor(myBoard, oppBoard){
        this.myBoard = myBoard;
        this.oppBoard = oppBoard;
    }


    static async getMatchBoard(game) {
        try {
            let [dbbuilds] = await pool.query(`select * from building inner join board_building on bb_build_id = build_id where bb_user_game_id = ? or bb_user_game_id = ?`, 
                                        [game.player.id, game.opponents[0].id]);

            let playerBoard = [];
            let oppBoard = [];
            for(let dbbuild of dbbuilds)
            {
                let build = fromDBBuildingtoBuilding(dbbuild)
                if (dbbuild.bb_user_game_id == game.player.id) 
                {
                    playerBoard.push(build);
                } else {
                    oppBoard.push(build);
                }
            }
            return { status: 200, result: new MatchBoard(playerBoard, oppBoard)};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err};
        }
    }

}

module.exports = MatchBoard;