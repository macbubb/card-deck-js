function Card(value, suit, shuffleIndex) {
    this.value = value;
    this.suit = suit;
    this.shuffleIndex = shuffleIndex;
}

Card.prototype.announce = function() {
    return this.value + " of " + this.suit;
}

function Hand(playerName) {
    this.playerName = playerName;
    this.handStack = [];
}

Hand.prototype.drawCard = function(card) {
    this.handStack.push(card);
}

Hand.prototype.announceHand = function() {
    console.log(this.playerName + "'s hand has " + this.handStack.length + " cards.");
    console.table(this.handStack, ["value", "suit"]);
}

function Deck(color, hasJokers) {
    this.stack = [];
    this.color = color;
    this.hasJokers = hasJokers;
}
//this seems like it should be considered the constructor, but in JS the constructor seems limited to just assigning variables names / values from arguments
Deck.prototype.makeStack = function() {
    if (this.stack.length === 0) {
        console.log("Making deck...");

        let suits = ["Hearts","Diamonds","Spades","Clubs"];
        let faceCards = ["Jack", "Queen", "King", "Ace"];

        for (let i = 0; i < 4; i++) {
            for (let j = 2; j < 11; j++) {
                this.stack.push(new Card(j,suits[i]));
            }
            for (let n = 0; n < 4; n++) {
                this.stack.push(new Card(faceCards[n],suits[i]));
            }
        }
        if (this.hasJokers) {
            this.stack.push(new Card("Joker", "Black")); 
            this.stack.push(new Card("Joker", "Red"));
        }
    }
}

//arguments: number of cards per player, ...players
Deck.prototype.deal = function(cardsPerHand, ...args) {
    if (cardsPerHand <= this.stack.length / args.length) {
        console.log("Dealing to " + args.length + " players.");
        for (let i = 0; i <+ cardsPerHand; i++) {
            for (let j = 0; j < args.length; j++) {
                args[j].drawCard(this.stack.pop(this.stack.length));
            }
        }
    } else {
        console.log("Not enough cards in deck for each player to receive the requested hand size.");
    }
}

Deck.prototype.deckStats = function() {
    return this.stack.length + " card " + this.color + " Deck";
}

Deck.prototype.randomCard = function() {
    return this.stack[Math.floor(Math.random() * this.stack.length)];
}

Deck.prototype.cutDeck = function() {
    //cut the deck at a random spot close to the middle (+/- 4 cards)
    let cutIndex = Math.floor(Math.random() * 8) + this.stack.length / 2 - 4;
    this.stack = this.stack.slice(cutIndex, this.stack.length).concat(this.stack.slice(0, cutIndex));
}

Deck.prototype.newShuffleIndex = function() {
    this.stack.forEach( card => card.shuffleIndex = Math.floor(Math.random()*10000));
}

Deck.prototype.sortShuffleIndex = function() {
    this.stack.sort( (card1, card2) => card1.shuffleIndex - card2.shuffleIndex);
}

Deck.prototype.shuffleDeck = function(shuffles) {
    for (let i = 0; i < shuffles; i++) {
        this.newShuffleIndex();
        this.cutDeck();
        this.sortShuffleIndex();
    }
}

//name of game and players
function Table(gameName, deck, ...args) {
    this.gameName = gameName;
    this.deck = deck;
    this.players = [...args];
}

Table.prototype.describeTable = function() {
    console.log(this.players.length + " players are at the table to play the game " + this.gameName + ".");
    for (let i = 0; i < this.players.length; i++) {
        this.players[i].announceHand();
    }
    console.log("The deck contains,");
    console.table(this.deck.stack);
}

function startGame() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
   }
}

//standard playing card is 64mm x 89mm

//arguments are coordinates of bottom right corner of card, scale of card
Card.prototype.displayCard = function(x, y, scale) {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo((x - 2) * scale, y * scale);
        ctx.lineTo((x - 60) * scale, y * scale);
        ctx.quadraticCurveTo((x - 64) * scale, y * scale, (x - 64) * scale, (y - 2) * scale);
        ctx.lineTo((x - 64) * scale, (y - 60) * scale);
        ctx.stroke();
    }
}

var redDeck = new Deck('Red', true);

redDeck.makeStack();

//console.table(redDeck.stack);

redDeck.shuffleDeck(100);

//console.table(redDeck.stack);

var Mac = new Hand("Mac");
var Jude = new Hand("Jude");
var Ezra = new Hand("Ezra");
var Laura = new Hand("Laura");

var toot = new Card(6, "Hearts");
toot.displayCard(200, 100, .1);

redDeck.deal(8, Mac, Jude, Ezra, Laura);

var Golf = new Table("golf", redDeck, Mac, Jude, Ezra, Laura);

Golf.describeTable();