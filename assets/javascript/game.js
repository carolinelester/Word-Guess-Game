var words = ["lion", "tiger", "chimpanzee", "baboon", "blackbear", "lemur", "cheetah", "camel", "zebra", "peacock", "ostrich"]

var randomWord = "";
var lettersofWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

var wins = 0;
var losses = 0;
var guessesRemaining = 9;


function Game () {
    randomWord = words[Math.floor(Math.random() * words.length)];
    lettersofWord = randomWord.split("");
    blanks = lettersofWord.length;

    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    document.getElementById("currentword").innerHTML = " " + blanksAndCorrect.join(" ");

    console.log(randomWord);
    console.log(lettersofWord);
    console.log(blanks);
    console.log(blanksAndCorrect);
}

function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

function CheckLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    if(letterInWord) {
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
}

function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    if (lettersofWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        reset()
        document.getElementById("winstracker").innerHTML = " " + wins;

    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}

Game()

document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    CheckLetters(guesses);
    complete();
    console.log(guesses);

    document.getElementById("playerguesses").innerHTML = " " + wrongGuess.join(" ");
}