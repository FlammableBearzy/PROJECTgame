const pool = require("../config/database");
// I can create settings for the game with:
const Settings = require("./gameSettings");


function fromDBCardToCard(dbCard) {
    return new Card(dbCard.crd_id, dbCard.ugc_id, dbCard.crd_AP_cost, dbCard.crd_RP_cost, dbCard.crd_name, dbCard.crd_effect, dbCard.ugc_active);
}


class Card {
    constructor (cardId, deckId, APcost, RPcost, name, effect, active) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.APcost = APcost;
        this.RPcost = RPcost;
        this.name = name;
        this.effect = effect;
        this.active = active; 
    }

    static async genCard(playerId) {
        try {
            let [cards] = await pool.query(`select * from card`);
            let rndCard = fromDBCardToCard(cards[Math.floor(Math.random()*cards.length)]);
            // insert the card
            let [result] = await pool.query(`Insert into user_game_card (ugc_user_game_id,ugc_crd_id,ugc_active)
                  values (?,?,?)`, [playerId,rndCard.cardId,true]);
            return {status:200, result: rndCard};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

}

class MatchDecks {
    constructor(mycards,oppcards) {
        this.mycards = mycards;
        this.oppcards = oppcards;
    }

    // No verifications are made since this is consider to be an auxiliary method
    // We consider it will only be called at the right time
    static async genPlayerDeck(playerId) {
        try {
            let cards =[];
            for (let i=0; i < Settings.nCards; i++) {
                let result = await Card.genCard(playerId);
                cards.push(result.result);
            }
            return {status:200, result: cards};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // No verifications are made since this is consider to be an auxiliary method
    // We consider it will only be called at the right time
    static async resetPlayerDeck(playerId) {
        try {
            let [result] = await pool.query(`delete from user_game_card where ugc_user_game_id = ?`, [playerId]);
            return {status:200, result: {msg:"All cards removed"}};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getMatchDeck(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? or ugc_user_game_id = ?`, 
                [game.player.id, game.opponents[0].id]);

                //Testing something else
                console.log("--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ");
                console.log(game.player);

            let playerCards = [];
            let oppCards = [];
            for(let dbcard of dbcards) {
                let card = fromDBCardToCard(dbcard);
                if (dbcard.ugc_user_game_id == game.player.id) {
                    playerCards.push(card);
                } else {
                    oppCards.push(card);
                }
            }
            return {status:200, result: new MatchDecks(playerCards,oppCards)};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    
    static async playDeckCard(game, deckId)
    {
        try{
            let [dbDeckCards] = await pool.query(`Select * from card 
                inner join user_game_card on ugc_crd_id = crd_id
                where ugc_user_game_id = ? and ugc_id = ? and ugc_active=1`, 
                    [game.player.id, deckId]);
                if (dbDeckCards.length == 0) {
                    return {status:404, result:{msg:"Card not found for this player or not active"}};
                }   
                let card =  fromDBCardToCard(dbDeckCards[0]);

                //Need to get the board from both players here.
                let playerBoard = GameInfo.matchBoard.myBoard; 
                let oppBoard = GameInfo.matchBoard.oppBoard;
                
                switch (card.cardId)
                {
                    case 1: Attack1(oppBoard); break;
                    case 2: Attack2(oppBoard); break;
                    case 3: Attack3(oppBoard); break;
                }

                let boardSQL = `update building inner join board_building on bb_build_id = build_id set build_hp = ?
                                 where build_name = "Castle" and bb_user_game_id = ?`

                await pool.query(boardSQL, [playerBoard.build_hp, playerBoard.bb_user_game_id]);
                await pool.query(boardSQL, [oppBoard.build_hp, oppBoard.bb_user_game_id]);

                
                //if(playerBoard.Ap < card.APcost) {
                //    return {status: 400, result:{ msg:"Not enough Action Points" }}
                //}

                //if(playerBoard.RP < card.RPcost)
                
            return {status:200, result: {msg: "Card played!"}};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

}

function Attack1(oppBoard) {
    oppBoard.hp -= 5;
}

function Attack2(oppBoard) {
    oppBoard.hp -= 15;
}

function Attack3(oppBoard) {
    oppBoard.hp -= 2;
}



module.exports = MatchDecks;
