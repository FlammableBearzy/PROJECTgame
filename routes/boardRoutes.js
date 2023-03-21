const express = require('express');
const router = express.Router();
const MatchBoard = require("../models/boardModel");
const auth = require("../middleware/auth");

router.get('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Get the board of the game for authenticated user");
        if (!req.game || req.game.opponents.length == 0) {
            res.status(400).send({msg:"Your are not in a game or are still waiting for another player."});
        } 
        let result = await MatchBoard.getMatchBoard(req.game);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;