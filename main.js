const DOWN = 'down';
const UP = 'up';
let startingX = 150;
let startingY = 250;
let cards = [];
let gameState = {
    totalPairs: 8,
    flippedCards: [],
    numMatched: 0, 
    attempts: 0,
    waiting: false,
};
let cardback; 
let cardfaceArray = [];
let cardFaceImg;
// let img; (commented this out, but when it is added in it still shows up in the console as an error of "img not defined") sad face

// functions
function preload() {
    cardback = loadImage('images/card_bkg.png');
    cardfaceArray = [
        loadImage('images/food_1.png'),
        loadImage('images/food_2.png'),
        loadImage('images/food_3.png'),
        loadImage('images/food_4.png'),
        loadImage('images/food_5.png'),
        loadImage('images/food_6.png'),
        loadImage('images/food_7.png'),
        loadImage('images/food_8.png')
    ]
}
function setup () {
    //stlying
    createCanvas(760, 840);
    background('pink');
    textFont("azo-sans-uber");
    heading = createElement('h2', ["Match The Foods I Love"]);
    heading.position(100, 80);
    ellipseMode(RADIUS);
    noStroke();
    //functions
    let selectedFaces = [];
    for (let z = 0; z < 8; z++) {
        const randomIdx = floor(random(cardfaceArray.length));
        const face = cardfaceArray[randomIdx];
        selectedFaces.push(face);
        selectedFaces.push(face);
        //remove the used card face so it doesn't get randomly selected again
        cardfaceArray.splice(randomIdx, 1);
    }
    selectedFaces = shuffleArray(selectedFaces);
    for (let j = 0; j < 4; j++) {// creating 4 colums of cards
        for (let i = 0; i < 4; i++) { // creating 4 rows of cards
            let faceImage = selectedFaces.pop();
            cards.push(new Card(startingX, startingY, faceImage));
            startingX += 160;
            // console.log(startingX);
        }
    startingY += 150;
    startingX = 150;
}
}
function draw () {
    background('pink');
    if (gameState.numMatches === gameState.totalPairs) {
        fill('yellow');
        textSize(66);
        text('YOU WIN!!!', 200, 300);
        noLoop();
    }
    for (let k = 0; k < cards.length; k++) {
        if (!cards[k].isMatch) {
            cards[k].face = DOWN;
        }
        cards[k].show();
    }
    noLoop();
    gameState.flippedCards.length = 0;
    gameState.waiting = false;
    fill(255);
    textSize(26);
    text('Attempts: ' + gameState.attempts, 600, 125);
    text('Matches: ' + gameState.numMatched, 600, 150);
}
function mousePressed() {
    if (gameState.waiting) {
        return;
    }
    for (let k = 0; k < cards.length; k++) {
        //first check flipped cards length, and then
        // we can trigger the flip
        if (gameState.flippedCards.length < 2 && cards[k].
            clicked(mouseX, mouseY)) {
            console.log('flipped', cards[k]);
            gameState.flippedCards.push(cards[k]);
    }
}
    if (gameState.flippedCards.length === 2) {
        gameState.attempts++;
        if (gameState.flippedCards[0].cardFaceImg === gameState.flippedCards[1].cardFaceImg) {
            //cards match - time to score! 
            //mark cards as matched so they don't flip back
            gameState.flippedCards[0].isMatch = true;
            gameState.flippedCards[1].isMatch = true;
            // empty the flipped cards array
            gameState.flippedCards.length = 0;
            // increment the score
            gameState.numMatched++;
            loop();
        } else {
            gameState.waiting = true;
            const loopTimeout = window.setTimeout(() => {
                loop();
                window.clearTimeout(loopTimeout);
            }, 2000)
        }
    }
}

class Card {
    constructor (x, y, cardFaceImg) {
        this.x = x; 
        this.y = y; 
        this.r = 70; 
        this.face = DOWN;
        this.cardFaceImg = cardFaceImg;
        this.isMatch = false;
        this.show();
    }
    show() {
        if(this.face=== UP || this.isMatch) {
            fill('#aaa');
            ellipse(this.x, this.y, this.r);
            image(this.cardFaceImg, this.x - 70, this.y - 80);
            
        } else {
            fill(255);
            ellipse(this.x, this.y, this.r);
            image(cardback, this.x - 35, this.y - 25);
            
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
    function shuffleArray (array) {
        let counter = array.length;
        while (counter > 0) {
            // pick random index
            const idx = Math.floor(Math.random() * counter);
            // decrease counter by 1 (decrement)
            counter--;
            // swap the last element with it
            const temp = array[counter];
            array[counter] = array[idx];
            array[idx] = temp;
        }
        return array;
    }
