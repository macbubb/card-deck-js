function Deck(color, hasJokers) {
    this.stack = [];
    this.color = color;
    this.hasJokers = hasJokers;
}

function Card(value, suit, shuffleIndex) {
    this.value = value;
    this.suit = suit;
    this.shuffleIndex = shuffleIndex;
}

function Hand(playerName) {
    this.playerName = playerName;
    this.handStack = [];
}

Hand.prototype.takeCard = function(card) {
    this.handStack.push(card);
}

Card.prototype.announce = function() {
    return this.value + " of " + this.suit;
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
    console.log("Dealing to " + args.length + " players.");
    for (let i = 0; i <+ cardsPerHand; i++) {
        for (let j = 0; j < args.length; j++) {
            args[j].takeCard(this.stack.pop(this.stack.length));
        }
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

var redDeck = new Deck('Red', true);

redDeck.makeStack();

//console.table(redDeck.stack);

redDeck.shuffleDeck(100);

//console.table(redDeck.stack);

var Mac = new Hand("Mac");
var Jude = new Hand("Jude");
var Ezra = new Hand("Ezra");
var Laura = new Hand("Laura");

redDeck.deal(13, Mac, Jude, Ezra, Laura);

console.table(Jude.handStack);
console.table(redDeck.stack);