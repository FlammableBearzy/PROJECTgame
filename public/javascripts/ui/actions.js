async function getGameInfo() {
    let result = await requestPlayerGame();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.game = result.game;
        if (GameInfo.scoreBoard) GameInfo.scoreBoard.update(GameInfo.game); 
        else GameInfo.scoreBoard = new ScoreBoard(GameInfo.game);
        // if game ended we get the scores and prepare the ScoreWindow
        if (GameInfo.game.state == "Finished") {
            let result = await requestScore();
            GameInfo.scoreWindow = new ScoreWindow(50,50,GameInfo.width-100,GameInfo.height-100,result.score,closeScore);
        }
    }
}

async function getBoardInfo() {

    let result = await requestBoard();
    
    if (!result.successful){
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
    GameInfo.matchBoard = result.matchBoard;
    console.log(result.matchBoard);    
    console.log(GameInfo.matchBoard.myBoard);
        if(GameInfo.playerBoard)
        {
            GameInfo.playerBoard.update(GameInfo.matchBoard.myBoard);
        } else {
            console.log("This is where error is");
            console.log(GameInfo.matchBoard.myBoard);
            console.log(GameInfo.images.board);
            console.log(Board);
            // THIS IS GIVING UNDEFINED IDK WHY AAAAAAAAAAAAAA
            GameInfo.playerBoard = new Board(GameInfo.matchBoard.myBoard, 200, 400, GameInfo.images.board, pickBuilding);
        }

        if(GameInfo.oppBoard)
        {
            GameInfo.oppBoard.update(GameInfo.matchBoard.oppBoard)
        } else {
            GameInfo.oppBoard = new Board(GameInfo.matchBoard.oppBoard, 300, 100, GameInfo.images.board, pickBuilding);
        }
    
    }
}

async function getDecksInfo() {
    let result = await requestDecks();
    if (!result.successful){
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.matchDecks = result.matchDecks;
        console.log(GameInfo.matchDecks.mycards);
        
        if (GameInfo.playerDeck) {
            GameInfo.playerDeck.update(GameInfo.matchDecks.mycards);
        } else {
            GameInfo.playerDeck = new Deck("My Cards", GameInfo.matchDecks.mycards, 900, 300, playCard, GameInfo.images.card);
        }

        if (GameInfo.oppDeck) {
            GameInfo.oppDeck.update(GameInfo.matchDecks.oppcards);
        } else {
            GameInfo.oppDeck = new Deck("Opponent Cards", GameInfo.matchDecks.oppcards, 900, 100, null, GameInfo.images.card);
        }
    }
}

async function getStatsInfo() {
    let result = await requestStats();

    if(!result.successful)
    {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.matchStats = result.matchStats;
        console.log(GameInfo.matchStats.myStats);

        /*
        if (GameInfo.playerStats)
        {
            GameInfo.playerStats.update(GameInfo.matchStats.myStats);
        } else {
            GameInfo.playerStats = new StatsModifiers(GameInfo.matchStats.myStats, 50, 400, GameInfo.images.card);
        }

        if (GameInfo.opponentStats)
        {
            GameInfo.opponentStats.update(GameInfo.matchStats.myStats);
        } else {
            GameInfo.opponentStats = new StatsModifiers(GameInfo.matchStats.oppStats, 950, 50, GameInfo.images.card);
        }
        */
    }
}

async function playCard(card, board) {

    //This is a target later on.
    
    if (card.played) {
        alert("That card was already played.");
        return;
    }

    if (confirm(`Do you want to play the "${card.name}" card?`)) {
       
        if (confirm(`Do you want to select "${board.name}?"`))
        {
            let result = await requestPlayCard(card.deckId, board.boardId);
    
        alert("You played the card! (result currently commented due to errors)")
    
        if (result.successful)
        {
            await getGameInfo();
            await getDecksInfo();
            await getBoardInfo();
        }
        }

        
    }
    

}

async function pickBuilding(building)
{
    if (confirm(`Do you want to pick the "${building.name}"`))
    {
        //let result = await requestBoard();   
        
        alert("You picked the building!");

        // if (result.successful)
        // {
        //     await getGameInfo();
        //     await getDecksInfo();
        //     await getBoardInfo();
        // }

    }
}


async function endturnAction() {
    let result = await requestEndTurn();
    if (result.successful) {
        await  getGameInfo();
        GameInfo.prepareUI();
    } else alert("Something went wrong when ending the turn.")
}

async function closeScore() {
    let result = await requestCloseScore();
    if (result.successful) {
        await checkGame(true); // This should send the player back to matches
    } else alert("Something went wrong when ending the turn.")
}