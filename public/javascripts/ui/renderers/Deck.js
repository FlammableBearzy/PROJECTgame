class Card {
    static width = 16*6;
    static height = 16*10;
    constructor(card,x,y,img) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
    }
    draw() {
        if (!this.card.active)
        {
            tint(200, 200, 200, 150);
            
        } 
        image(this.img, this.x,this.y, Card.width, Card.height);
        
        textAlign(CENTER,CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(12);
        stroke(0);
        strokeWeight(2);
        text("AP: " + this.card.APcost,this.x+Card.width*0.5,this.y+Card.height*0.075);
        text("RP: " + this.card.RPcost,this.x+Card.width*0.5,this.y+Card.height*0.175);
        strokeWeight(1);
        noStroke();
        fill(0);
        textSize(16);
        text(this.card.name,this.x+Card.width*0.5,this.y+Card.height*0.4);
        textSize(12);
        textAlign(CENTER,TOP); 
        text(this.card.effect,this.x+Card.width*0.1,this.y+Card.height*0.68,
            Card.width*0.8,Card.height*0.1);
        if (this.card.note) {
            text(this.card.note,this.x+Card.width*0.1,this.y+Card.height*0.8,
                    Card.width*0.8,Card.height*0.15);
        }
        textStyle(NORMAL);
        noTint();
    }
    click() {
        return mouseX > this.x && mouseX < this.x+Card.width &&
               mouseY > this.y && mouseY < this.y+Card.height;
    }
}

class Deck {
    static titleHeight=40;
    static nCards = 5;

    constructor(title,cardsInfo,x,y,clickAction,images) {
        this.title = title; 
        this.x = x;
        this.y = y;
        this.width = Card.width*Deck.nCards;
        this.clickAction = clickAction;
        this.cardImg = images.cardImg;
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            let img = this.getCardImage(cardInfo.name);
            cards.push(new Card(cardInfo,x,this.y+Deck.titleHeight,img));
            x += Card.width;
        }
        return cards;
    }
    
    getCardImage(cardType) {
    //Determine the image based on the building type
        switch (cardType) {
            case "Attack 1":
            case "Attack 2":
            case "Attack 3":
            case "Attack 4":
            case "Attack 5":
                return GameInfo.images.card;
            
            case "Heal 1":
            case "Heal 2":
            case "Heal 3":
            case "Heal 4":
                return GameInfo.images.cardb;
            
            default:
                return GameInfo.images.card;    
        }

    }
    
    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }


    draw () {
        image(GameInfo.images.tapete, this.x - this.width/20, this.y - Deck.titleHeight/2, this.width + this.width/10 , Card.height + Deck.titleHeight*2 );
        fill(0);
        noStroke();
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.title,this.x,this.y,this.width,Deck.titleHeight);
        for (let card of this.cards) {
            card.draw();
        }
    }

    click() {
        if (this.clickAction) {
            for (let card of this.cards) {
                if (card.click()) {
                    this.clickAction(card.card);
                } 
            }
        }
    }
}

// ----------------------------------------------------------------------//
class CardHidden {
    static width = 40;
    static height = 80;
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    draw() {
        image(this.img, this.x, this.y, CardHidden.width, CardHidden.height);
    }

    click() {
        return mouseX > this.x && mouseX < this.x + CardHidden.width &&
               mouseY > this.y && mouseY < this.y + CardHidden.height;
    }
}

class DeckHidden {
    static titleHeight = 30;
    static nCards = 5;

    constructor(title, x, y, cardImg) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = CardHidden.width * DeckHidden.nCards;
        this.cardImg = cardImg;
        this.cards = this.createCards();
    }

    createCards() {
        let cards = [];
        let x = this.x;
        for (let i = 0; i < DeckHidden.nCards; i++) {
            cards.push(new CardHidden(x, this.y + DeckHidden.titleHeight, this.cardImg));
            x += CardHidden.width;
        }
        return cards;
    }

    update() {
        this.cards = this.createCards();
    }

    draw() {
        fill(0);
        stroke(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.title, this.x, this.y, this.width, DeckHidden.titleHeight);
        for (let card of this.cards) {
            card.draw();
        }
    }
    
}
