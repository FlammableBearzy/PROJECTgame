async function refresh() {
    if (GameInfo.game.player.state == "Waiting") { 
        // Every time we are waiting
        await getGameInfo();       
        //call the getBoardInfo();
        await getBoardInfo();
        //Call the getDecksInfo();
        await getDecksInfo();

        await getStatsInfo();

        if (GameInfo.game.player.state != "Waiting") {
            // The moment we pass from waiting to play
            GameInfo.prepareUI();
        }
    } 
    // Nothing to do when we are playing since we control all that happens 
    // so no update is needed from the server
}

function preload() {

//load the tiles. this will be a tile map so ill have to do some adjusting to do
GameInfo.images.board = loadImage("/assets/tile.png");

GameInfo.images.card = loadImage("/assets/card.png");

}


async function setup() {
    let canvas = createCanvas(GameInfo.width, GameInfo.height);
    canvas.parent('game');
    // preload  images
    
    await getGameInfo();
    await getBoardInfo();
    await getDecksInfo();
    await getStatsInfo();


    setInterval(refresh,2000);

    //buttons (create a separated function if they are many)
    GameInfo.endturnButton = createButton('End Turn');
    GameInfo.endturnButton.parent('game');
    GameInfo.endturnButton.position(GameInfo.width-150,GameInfo.height-50);
    GameInfo.endturnButton.mousePressed(endturnAction);
    GameInfo.endturnButton.addClass('game')


    GameInfo.prepareUI();
    

    GameInfo.loading = false;
}

function draw() {
    background(220);
    if (GameInfo.loading) {
        textAlign(CENTER, CENTER);
        textSize(40);
        fill('black');
        text('Loading...', GameInfo.width/2, GameInfo.height/2);
    } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
        GameInfo.scoreWindow.draw();
    } else  {
        GameInfo.scoreBoard.draw();
        
        if(GameInfo.playerBoard)
        {
        GameInfo.playerBoard.draw();
        GameInfo.oppBoard.draw();
        }

        GameInfo.playerDeck.draw();
        GameInfo.oppDeck.draw();

        /*
        GameInfo.playerStats.draw();
        GameInfo.opponentStats.draw();
        */

        //console.log("------------------------------------------ START ------------------------------------------");
        //console.log(GameInfo.matchBoard);
        if(GameInfo.matchStats.myStats != undefined)
        {
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(20);
        textStyle(BOLD);
        

        //I NEED TO CREATE THE CONSTRUCTOR FOR THIS SECTION. The information will be passed but will be written on the side OR as a pop up window.
        //For the render it just needs to show the sprite on that spot.
        //Everything else is hidden behind other stuff, such has upgrade and place and whatnot
       
        for (let i = 0; i < GameInfo.matchStats.myStats.length; i++)
        {
            text("Attack: " + GameInfo.matchStats.myStats[i].attack , 150, 800 + i * 25);
            text(GameInfo.matchStats.myStats[i].ap, 150, 800 + i * 25);
            text(GameInfo.matchStats.myStats[i].rp, 150, 800 + i * 25);
        }


        for (let i = 0; i < GameInfo.matchStats.oppStats.length; i++)
        {
            text("Attack: " + GameInfo.matchStats.oppStats[i].attack , 150, 800 + i * 25);
            text(GameInfo.matchStats.oppStats[i].ap, 150, 800 + i * 25);
            text(GameInfo.matchStats.oppStats[i].rp, 150, 800 + i * 25);
        }
        /*
        for (let i = 0; i < GameInfo.matchBoard.myBoard.length; i++)
        {
            text(GameInfo.matchBoard.myBoard[i].name, 100, 150 + i * 25);
            text(GameInfo.matchBoard.myBoard[i].health, 200, 150 + i * 25);
            text(GameInfo.matchBoard.myBoard[i].level, 300, 150 + i * 25);
            text(GameInfo.matchBoard.myBoard[i].effect, 520, 150 + i * 25);
        }

        for (let i = 0; i < GameInfo.matchBoard.oppBoard.length; i++)
        {
            text(GameInfo.matchBoard.oppBoard[i].name, 100, 450 + i * 25);
            text(GameInfo.matchBoard.oppBoard[i].health, 200, 450 + i * 25);
            text(GameInfo.matchBoard.oppBoard[i].level, 300, 450 + i * 25);
            text(GameInfo.matchBoard.oppBoard[i].effect, 520, 450 + i * 25);
        }
        */
        }
        //console.log("------------------------------------------ END ------------------------------------------");
    }
}

async function mouseClicked() {
    // Call the player deck click method
    if ( GameInfo.playerDeck) { 
        GameInfo.playerDeck.click(); 
    } 
}

