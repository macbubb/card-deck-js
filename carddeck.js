
//card object. suit, number
//deck object

function Card(value, suit) {
    this.value = value;
    this.suit = suit;
    this.stack = [];
}

Card.prototype.announce = function() {
    return this.value + " of " + this.suit;
}

Card.prototype.makeStack = function() {
    if (this.stack.length === 0) {
        console.log("making deck");
        let suits = ["Hearts","Diamonds","Spades","Clubs"];
        let faceCards = ["Jack", "Queen", "King", "Ace"];

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 11; j++) {
                this.stack.push([j,suits[i]]);
            }
            for (let n = 0; n < 4; n++) {
                this.stack.push([faceCards[n],suits[i]]);
            }
        }
    }
}

/*
var randomCard = function(deck) {
    return deck[Math.floor(Math.random() * 52)];
}

for (var n = 0; n < 10;n++) {
   console.log(randomCard(deck2));
}
*/

var asdf = new Card('Ace', 'Spades');

asdf.makeStack();

console.log(asdf.announce());
console.table(asdf.stack);
//console.log(deck2[5].announce); 
