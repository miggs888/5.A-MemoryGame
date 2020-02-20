let myCard;
const DOWN = 'down';
const UP = 'up';
let startingX = 150;
let startingY = 250;
let cards = [];
let gameState;

function setup () {
    createCanvas(760, 840);
    background('pink');
    ellipseMode(RADIUS);
    noStroke();
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            cards.push(new Card(startingX, startingY));
            startingX += 160;
            console.log(startingX);
        }
    startingY += 150;
    startingX = 150;
}
}
function mousePressed() {
    for (let k = 0; k < cards.length; k++) {
        if (cards[k].clicked(mouseX, mouseY)) {
        console.log('flipped');
    }
}
}

class Card {
    constructor (x, y) {
        this.x = x; 
        this.y = y; 
        this.r = 60; 
        this.face = DOWN;
        this.show();
    }
    show() {
        if(this.face === DOWN) {
            fill(255);
            ellipse(this.x, this.y, this.r);
        } else {
            fill('#aaa');
            ellipse(this.x, this.y, this.r);
        }
    }
    clicked (mouseX, mouseY) {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d <= this.r) {
            this.flip();
            return true;
        } else {
            return false;
        }
    }
    flip() {
        if(this.face === DOWN) {
            this.face = UP; 
        } else {
            this.face = DOWN;
        }
        this.show();
    }
}