let words = ["Dumbledore", "Muggle", "Squib", "Basilisk", "Hippogriff", "Nagini", "Mandrake", "Bellatrix", "Draco", "Arithmancy", "Transfiguration", "Obliviate", "Riddikulus", "Sectumsempra", "Avada Kedavra", "Alohomora", "Lumos", "Expelliarmus", "Wingardium Leviosa", "Accio", "Expecto Patronum"];
let currentWord = "";
let numGuesses = 0;
let wins = 0;
let losses = 0;
let guesses = [];
let blanks = "";
const input = document.querySelector('body');

input.addEventListener('keydown', checkLetter);

function randNum (max) {
     return Math.floor(Math.random() * Math.floor(max));
}

function reset () {
     let lastWord = currentWord;
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
     document.getElementById("blanks").textContent = blanks;
     document.getElementById("result").textContent = currentWord;
}

function correct (letter) {
     newBlanks = "";
     for (var i = 0; i < currentWord.length; i++) {
          if (currentWord[i].toLowerCase() == letter) {
               NewBlanks += letter;
          } else if (currentWord[i] == " ") {
               NewBlanks += " / ";
          } else {
               NewBlanks += "_";
          }
     }
     guesses.push(letter);
     document.getElementById("blanks").textContent = blanks;
     if (blanks.includes("_")) {

     } else {
          winner();
     }
}

function checkLetter(event) {
     let letter = event.key;
     if (!(guesses.includes(letter.toLowerCase()))) {
          if (currentWord.includes(letter)) {
               correct(letter);
          } else {
               wrong(letter);
          }
     }
}

reset();