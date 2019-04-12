function Deck() {
    this.stack = [];
}

function Card(value, suit) {
    this.value = value;
    this.suit = suit;
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
                this.stack.push([j,suits[i]]);
            }
            for (let n = 0; n < 4; n++) {
                this.stack.push([faceCards[n],suits[i]]);
            }
        }
    }
}

Deck.prototype.randomCard = function() {
    return this.stack[Math.floor(Math.random() * 52)];
}




/*
for (var n = 0; n < 10;n++) {
   console.log(randomCard());
}
*/

var redDeck = new Deck();

redDeck.makeStack();

console.log(redDeck.randomCard());

//console.log(deck2[5].announce); 
