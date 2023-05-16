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
    static maxNumberTurns = 20;


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
            if (await checkEndGame(game)) {
                return await Play.endGame(game);
            } else {
                // Increase the number of turns and continue 
                await pool.query(`Update game set gm_turn = gm_turn+1 where gm_id = ?`,
                    [game.id]);
            }

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