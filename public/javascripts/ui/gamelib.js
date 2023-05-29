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
GameInfo.images.board = loadImage("/assets/BaseTile.png");
GameInfo.images.castle = loadImage("/assets/Castle.png");
GameInfo.images.blacksmith = loadImage("/assets/Blacksmith.png");
GameInfo.images.tavern = loadImage("/assets/Tavern.png");
GameInfo.images.farm = loadImage("/assets/Farm.png");
GameInfo.images.boardOverlay = loadImage("/assets/HighlightBuild.png");

GameInfo.images.tapete = loadImage("/assets/Tapete.png");

//Cards
GameInfo.images.card = loadImage("/assets/cardA.png");
GameInfo.images.cardb = loadImage("/assets/cardB.png");
GameInfo.images.cardOverlay = loadImage("/assets/CardUsed.png");

GameInfo.images.cardHidden = loadImage("/assets/BackCard.png");


GameInfo.images.background = loadImage("/assets/background.png"); 

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
    GameInfo.endturnButton.position(GameInfo.width/20,4*GameInfo.height/15);
    GameInfo.endturnButton.mousePressed(endturnAction);
    GameInfo.endturnButton.addClass('game')


    GameInfo.prepareUI();
    

    GameInfo.loading = false;
}

function draw() {
    background(GameInfo.images.background);
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

        if(GameInfo.matchStats.myStats != undefined)
        {
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(20);
        textStyle(BOLD);
        image(GameInfo.images.tapete, 10, 110, 200, 150)

            for (let i = 0; i < GameInfo.matchStats.myStats.length; i++)
            {
                text("Attack: " + GameInfo.matchStats.myStats[i].attack , 70, 140 + i * 25);
                text("AP: " + GameInfo.matchStats.myStats[i].ap, 70, 165 + i * 25);
                text("RP: " + GameInfo.matchStats.myStats[i].rp, 70, 190 + i * 25);
            }
        }
    }
}

async function mouseClicked() {
    // Call the player deck click method
    if ( GameInfo.playerDeck) { 
        GameInfo.playerDeck.click(); 
    } 

    if ( GameInfo.playerBoard )
    {
        console.log("Checking for click")
        GameInfo.playerBoard.click();
    }
    if ( GameInfo.oppBoard )
    {
        console.log("Checking for click")
        GameInfo.oppBoard.click();
    }

}

