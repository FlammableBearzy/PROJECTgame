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
            // Set the flag before calling pickBuilding
            GameInfo.selectingBuilding = true;
            GameInfo.playerBoard = new Board(GameInfo.matchBoard.myBoard, 100, 550, GameInfo.images, pickBuilding);
        }

        if(GameInfo.oppBoard)
        {
            GameInfo.oppBoard.update(GameInfo.matchBoard.oppBoard)
        } else {
            GameInfo.oppBoard = new Board(GameInfo.matchBoard.oppBoard, 500, 140, GameInfo.images, pickBuilding);
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
            GameInfo.playerDeck = new Deck("My Cards", GameInfo.matchDecks.mycards, 1050, 500, selectCard, GameInfo.images);
            
        }

        if (GameInfo.oppDeck) {
            GameInfo.oppDeck.update(GameInfo.matchDecks.oppcards);
        } else {
            GameInfo.oppDeck = new DeckHidden("Opponent Cards", 1300, 120, GameInfo.images.cardHidden);
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

        
        if (GameInfo.playerStats)
        {
            GameInfo.playerStats.update(GameInfo.matchStats.myStats);
        } else {
            GameInfo.playerStats = new StatsModifiers(GameInfo.matchStats.myStats, 300, 100, GameInfo.images.card);
        }
        /*
        if (GameInfo.opponentStats)
        {
            GameInfo.opponentStats.update(GameInfo.matchStats.myStats);
        } else {
            GameInfo.opponentStats = new StatsModifiers(GameInfo.matchStats.oppStats, 950, 50, GameInfo.images.card);
        }
        */
    }
}

async function selectCard(card) {
    //This is a target later on.
    GameInfo.selectedCard = card;
    await playCard();
}

async function pickBuilding(board) {
  if (!GameInfo.selectingBuilding) {
    alert("No building selection in progress.");
    return;
  }

  if (!board) {
    alert("No building selected.");
    return;
  }
    if (confirm(`Do you want to pick the "${board.name}"?`)) {
        GameInfo.selectedBuilding = board;
        alert("You've selected: "+GameInfo.selectedBuilding.name);
    return GameInfo.selectedBuilding;
  }
}

async function playCard(board) {
  console.log("Testing if this is called");

  let card = GameInfo.selectedCard;

  if (!card) {
    alert("No card selected.");
    return;
  }

  if (card.played) {
    alert("That card was already played.");
    return;
  }

  console.log("Before confirmation: ", card.name);

  if (confirm(`Do you want to play the "${card.name}" card?`)) {
    console.log("Inside confirmation: ", card.name);


    if (GameInfo.selectedBuilding != undefined) {
      let result = await requestPlayCard(card.deckId, GameInfo.selectedBuilding.boardId);

      alert("You played the card!");

      if (result.successful) {
        await getGameInfo();
        await getDecksInfo();
        await getBoardInfo();

        GameInfo.selectedCard = undefined;
        GameInfo.selectedBuilding = undefined;
      }
    } else {
      alert("No building selected.");
    }
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

function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }