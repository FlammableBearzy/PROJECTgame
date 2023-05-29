const pool = require("../config/database");
const MatchDecks = require("./deckModel");
const Settings = require("./gameSettings.js");


// auxiliary function to check if the game ended 
async function checkEndGame(game) {
    return game.turn >= Play.maxNumberTurns;
}


class Play {
    // At this moment I do not need to store information so we have no constructor

    // Just a to have a way to determine end of game
    static maxNumberTurns = 50;


    // we consider all verifications were made
    static async startGame(game) {
        try {
            // Randomly determines who starts    
            let myTurn = (Math.random() < 0.5);
            let p1Id = myTurn ? game.player.id : game.opponents[0].id;
            let p2Id = myTurn ? game.opponents[0].id : game.player.id;
            // Player that start changes to the state Playing and order 1 
            await pool.query(`Update user_game set ug_state_id=?,ug_order=? where ug_id = ?`, [2, 1, p1Id]);
            // Player that is second changes to order 2
            await pool.query(`Update user_game set ug_order=? where ug_id = ?`, [2, p2Id]);

            // Changing the game state to start
            await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [2, game.id]);

            // ---- Specific rules for each game start bellow
            console.log("Checking");
            await MatchDecks.genPlayerDeck(p1Id);
            console.log("Did it generate?");

            /*
            // ----- even more specific, bypass proper buildings.
            //Starting building for player
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (0, 1, 100, ?)`, [game.player.id]);
            //Starting Building for Opponent
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (0, 1, 100, ?)`, [game.opponents[0].id]);

            //buildings player
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (1, 3, 100, ?)`, [game.player.id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (2, 3, 100, ?)`, [game.player.id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (3, 4, 100, ?)`, [game.player.id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (4, 5, 100, ?)`, [game.player.id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (5, 6, 100, ?)`, [game.player.id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (6, 8, 100, ?)`, [game.player.id]);

            //buildings Opponent
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (1, 3, 100, ?)`, [game.opponents[0].id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (2, 3, 100, ?)`, [game.opponents[0].id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (3, 4, 100, ?)`, [game.opponents[0].id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (4, 5, 100, ?)`, [game.opponents[0].id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (5, 6, 100, ?)`, [game.opponents[0].id]);
            await pool.query(`insert into board_building (bb_pos, bb_building_id, bb_building_hp, bb_user_game_id) values (6, 8, 100, ?)`, [game.opponents[0].id]);
            */



        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // This considers that only one player plays at each moment, 
    // so ending my turn starts the other players turn
    // We consider the following verifications were already made:
    // - The user is authenticated
    // - The user has a game running
    // NOTE: This might be the place to check for victory, but it depends on the game
    static async endTurn(game) {
        try {
            // Change player state to waiting (1)
            await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`,
                [1, game.player.id]);
            // Change opponent state to playing (2)
            await pool.query(`Update user_game set ug_state_id=? where ug_id = ?`,
                [2, game.opponents[0].id]);

            // 1 Player playing = 1 turn, 
            // Both players played
            /*
            if (game.player.order == 2) {
                // Criteria to check if game ended
                if (await checkEndGame(game)) {
                    return await Play.endGame(game);
                } else {
                    // Increase the number of turns and continue 
                    await pool.query(`Update game set gm_turn=gm_turn+1 where gm_id = ?`,
                        [game.id]);
                }
            */
/*


                    //I need to use an empty object | let something = {}; | so i can get verify the hp correctly (cuz im sending a string and not a list of multiple values)
            let castleCheck = await pool.query(`select * from board_building where bb_build_id = 1 and bb_build_hp = 0 and (bb_user_game_id = ? or bb_user_game_id = ?);`,
                [game.player.id, game.opponents[0].id]);

            
            if(castleCheck.rows.length > 0)
            {
                return await Play.endGame(game);
            } else {
                console.log("Checking CastleCheck");
            }
*/                
            if (await checkEndGame(game)) 
            {
                return await Play.endGame(game);
            } 
            else
            {
                // Increase the number of turns and continue 
                await pool.query(`Update game set gm_turn = gm_turn+1 where gm_id = ?`, [game.id]);
            }

            await Play.baseDestroyed(game)


            //Check is Any

            // removes the cards of the player that ended and get new cards to the one that will start
            await MatchDecks.resetPlayerDeck(game.player.id);
            await MatchDecks.genPlayerDeck(game.opponents[0].id);

            await pool.query("update board_stats set bs_ap = bs_ap + bs_regenAP where bs_user_game_id = ?", [game.player.id]);
            await pool.query("update board_stats set bs_rp = bs_rp + bs_regenRP where bs_user_game_id = ?", [game.player.id]);

            return { status: 200, result: { msg: "Your turn ended." } };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async baseDestroyed(game)
    {

            try{

                //Need to select building.
                let [dbBoard] = await pool.query(`select * from board_building 
                            where bb_build_id = 1 and (bb_user_game_id = ? or bb_user_game_id = ?);`,
                            [game.player.id, game.opponents[0].id]);
                
                //Need to get the board from both players here.
                let playerBoard = []; 
                let oppBoard = [];

                for(let i = 0; i < dbBoard.length; i++)
                {

                let ConstructBoard =
                {
                    position: dbBoard[i].bb_pos,
                    health: dbBoard[i].bb_build_hp,
                }

                if (dbBoard[i].bb_user_game_id == game.player.id)
                {
                    playerBoard.push(ConstructBoard);
                } else {
                    oppBoard.push(ConstructBoard);
                }

                }
                console.log(playerBoard);
                console.log(oppBoard);

                if (playerBoard[0].health <= 0)
                {
                    let sqlPlayer = `Update user_game set ug_state_id = ? where ug_id = ?`;
                    await pool.query(sqlPlayer, [3, game.player.id]);
                    await pool.query(sqlPlayer, [3, game.opponents[0].id]);
                    // Set game to finished (id = 3)
                    await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [3, game.id]);
        
                    // Insert score lines with the state and points.
                    // For this, the player player (id = 2) lost. 
                    let sqlScore = `Insert into scoreboard (sb_user_game_id,sb_state_id,sb_points) values (?,?,?)`;
                    await pool.query(sqlScore, [game.player.id,2,0]);
                    await pool.query(sqlScore, [game.opponents[0].id,3,1]);

                } 
                else if (oppBoard[0].health <= 0) 
                {
                    
                    let sqlPlayer = `Update user_game set ug_state_id = ? where ug_id = ?`;
                    await pool.query(sqlPlayer, [3, game.player.id]);
                    await pool.query(sqlPlayer, [3, game.opponents[0].id]);
                    // Set game to finished (id = 3)
                    await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [3, game.id]);
        
                    // Insert score lines with the state and points.
                    // For this, the player player (id = 3) Won. 
                    let sqlScore = `Insert into scoreboard (sb_user_game_id,sb_state_id,sb_points) values (?,?,?)`;
                    await pool.query(sqlScore, [game.player.id,3,1]);
                    await pool.query(sqlScore, [game.opponents[0].id,2,0]);
                }

                return { status: 200, result: { msg: "Game ended. Check scores." } };
            } catch (err) {
                console.log(err);
                return { status: 500, result: err };
            }
            
    }

    // Makes all the calculation needed to end and score the game
    static async endGame(game) {
        try {
            // Both players go to score phase (id = 3)
            let sqlPlayer = `Update user_game set ug_state_id = ? where ug_id = ?`;
            await pool.query(sqlPlayer, [3, game.player.id]);
            await pool.query(sqlPlayer, [3, game.opponents[0].id]);
            // Set game to finished (id = 3)
            await pool.query(`Update game set gm_state_id=? where gm_id = ?`, [3, game.id]);

            // Insert score lines with the state and points.
            // For this template both are  tied (id = 1) and with one point 
            let sqlScore = `Insert into scoreboard (sb_user_game_id,sb_state_id,sb_points) values (?,?,?)`;
            await pool.query(sqlScore, [game.player.id,1,1]);
            await pool.query(sqlScore, [game.opponents[0].id,1,1]);

            return { status: 200, result: { msg: "Game ended. Check scores." } };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}

module.exports = Play;