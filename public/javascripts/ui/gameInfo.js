// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo  {
    // settings variables
    static width = 1200;
    static height = 600;

    static loading = true;

    // data
    static game;
    static images = {};
    static sounds = {};
    //Data from both sides of the players
    static matchBoard;
    static matchDeck;

    //Not sure if i need to call this
    static matchStats;


    // rendererers
    static scoreBoard;
    static scoreWindow;

    //boards
    static playerBoard;
    static oppBoard;

    //Decks
    static playerDeck;
    static oppDeck;

    //Stats
    static playerStats;
    static opponentStats;

    // buttons
    static endturnButton;

    // Write your UI settings for each game state here
    // Call the method every time there is a game state change
    static prepareUI() {
        if (GameInfo.game.player.state == "Playing") { 
            GameInfo.endturnButton.show();
        } else if (GameInfo.game.player.state == "Waiting") {
            GameInfo.endturnButton.hide();
        }  else if (GameInfo.game.player.state == "Score") {
            GameInfo.endturnButton.hide();
            GameInfo.scoreWindow.open();
        }
    }
}