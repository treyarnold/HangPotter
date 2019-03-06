let words           = ["Dumbledore", "Muggle", "Squib", "Basilisk", "Hippogriff", "Nagini", "Mandrake", "Bellatrix", 
                         "Draco", "Arithmancy", "Transfiguration", "Obliviate", "Riddikulus", "Sectumsempra", "Avada Kedavra", 
                         "Alohomora", "Lumos", "Expelliarmus", "Wingardium Leviosa", "Accio", "Expecto Patronum"];
let currentWord     = "";
let numGuesses      = 10;
let wins            = 0;
let losses          = 0;
let guesses         = [];
let blanks          = "";
const input         = document.querySelector('body');

input.addEventListener('keydown', checkLetter);

function isAlphaCharacter(letter) {
     let check = letter.toLowerCase();
     if ((check <= "z") && (check >= "a")) {
          return true;
     }
     return false;
}

function randNum (max) {
     return Math.floor(Math.random() * Math.floor(max));
}

function reset () {
     let lastWord = currentWord;
     blanks = "";
     guesses = [];
     while (lastWord == currentWord) {
          currentWord = words[randNum(words.length)];
     }
     numGuesses = 10;
     for (var i = 0; i < currentWord.length; i++) {
          if (currentWord[i] == " ") {
               blanks += "/";
          }
          else {
               blanks += "_";
          }
     }
     document.getElementById("guesses").textContent = numGuesses;
     document.getElementById("blanks").textContent = blanks;
     document.getElementById("guessed").textContent = guesses;
}

function winner () {
     let result = document.getElementById("result")
     result.style.color = "green";
     result.textContent = "Mischief Managed";
     wins += 1;
     document.getElementById("wins").textContent = wins;
     reset();
}

function loser () {
     let result = document.getElementById("result")
     result.style.color = "red";
     result.textContent = "You're a Muggle";
     losses += 1;
     document.getElementById("losses").textContent = losses;
     reset();
}

function correct (letter) {
     let newBlanks = "";
     for (var i = 0; i < currentWord.length; i++) {
          if ((isAlphaCharacter(blanks[i])) || (blanks[i] == "/")) {
               newBlanks += blanks[i];
          } else {
               if (currentWord[i].toLowerCase() == letter) {
                    if ((i == 0) || (newBlanks[i-1] == "/")) {
                         newBlanks += letter.toUpperCase();
                    } else {
                         newBlanks += letter;
                    }
               } else {
                    newBlanks += "_";
               }
          }
     }
     blanks = newBlanks;
     document.getElementById("blanks").textContent = blanks;
     if (!(blanks.includes("_"))) {
          winner();
     }
}

function wrong (letter) {
     numGuesses -= 1;
     document.getElementById("guesses").textContent = numGuesses;
     if (numGuesses == 0) {
          loser ();
     }
}

function checkLetter(event) {
     let letter = event.key;
     let lowerWord = currentWord.toLowerCase();
     if ((isAlphaCharacter(letter) && (letter.length == 1))) {
          if (!(guesses.includes(letter.toLowerCase()))) {
               guesses.push(letter);
               document.getElementById("guessed").textContent = guesses;
               if (lowerWord.includes(letter)) {
                    correct(letter);
               } else {
                    wrong(letter);
               }
          }
     }
}

reset();