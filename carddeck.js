function Deck(color) {
    this.stack = [];
    this.color = color;
}

function Card(value, suit) {
    this.value = value;
    this.suit = suit;
}

//how do I access this function from a Deck object?
//  myDeck.stack[x].announce() does not work.
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
                this.stack.push([j,suits[i]]);
            }
            for (let n = 0; n < 4; n++) {
                this.stack.push([faceCards[n],suits[i]]);
            }
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
    console.log("Cutting deck at " + cutIndex);

    this.stack = this.stack.slice(cutIndex, 52).concat(this.stack.slice(0, cutIndex));
}

var redDeck = new Deck('Red');

redDeck.makeStack();
//console.table(redDeck.stack);
for (let i = 0; i < 10; i++) {redDeck.cutDeck();}

//console.table(redDeck.stack);
//console.log(redDeck.deckStats());
//console.log(redDeck.randomCard());
