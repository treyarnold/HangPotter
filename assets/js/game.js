const input         = document.querySelector('body');
let game            = {
     words           : ["Dumbledore", "Muggle", "Squib", "Basilisk", "Hippogriff", "Nagini", "Mandrake", "Bellatrix", 
                              "Draco", "Arithmancy", "Transfiguration", "Obliviate", "Riddikulus", "Sectumsempra", "Avada Kedavra", 
                              "Alohomora", "Lumos", "Expelliarmus", "Wingardium Leviosa", "Accio", "Expecto Patronum"],
     currentWord     : "",
     numGuesses      : 10,
     wins            : 0,
     losses          : 0,
     guesses         : [],
     blanks          : "",

     reset : function () {
          let lastWord = game.currentWord;
          game.blanks = "";
          game.guesses = [];
          while (lastWord == game.currentWord) {
               game.currentWord = game.words[randNum(game.words.length)];
          }
          game.numGuesses = 10;
          for (var i = 0; i < game.currentWord.length; i++) {
               if (game.currentWord[i] == " ") {
                    game.blanks += "/";
               }
               else {
                    game.blanks += "_";
               }
          }
          document.getElementById("guesses").textContent = game.numGuesses;
          document.getElementById("blanks").textContent = game.blanks;
          document.getElementById("guessed").textContent = game.guesses;
          for (let i =10; i < 36; i++) {
               let id = i.toString(36);
               document.getElementById(id).classList.remove("d-none");
          }
     },

     winner : function () {
          let result = document.getElementById("result")
          result.style.color = "green";
          result.textContent = "Mischief Managed";
          game.wins += 1;
          document.getElementById("wins").textContent = game.wins;
          document.getElementById("previous").textContent = "The word was " + game.currentWord;
          game.reset();
     },

     loser: function () {
          let result = document.getElementById("result")
          result.style.color = "red";
          result.textContent = "You're a Muggle";
          game.losses += 1;
          document.getElementById("losses").textContent = game.losses;
          document.getElementById("previous").textContent = "The word was " + game.currentWord;
          game.reset();
     },

     correct: function (letter) {
          let newBlanks = "";
          for (var i = 0; i < game.currentWord.length; i++) {
               if ((isAlphaCharacter(game.blanks[i])) || (game.blanks[i] == "/")) {
                    newBlanks += game.blanks[i];
               } else {
                    if (game.currentWord[i].toLowerCase() == letter) {
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
          game.blanks = newBlanks;
          document.getElementById("blanks").textContent = game.blanks;
          if (!(game.blanks.includes("_"))) {
               game.winner();
          }
     },

     wrong: function (letter) {
          game.numGuesses -= 1;
          document.getElementById("guesses").textContent = game.numGuesses;
          if (game.numGuesses == 0) {
               game.loser ();
          }
     },

     checkLetter: function (event) {
          let letter;
          if (typeof(event) === "object"){
               letter = event.key;
          } else {
               letter = event;
          }
          let lowerWord = game.currentWord.toLowerCase();
          if ((isAlphaCharacter(letter) && (letter.length == 1))) {
               if (!(game.guesses.includes(letter.toLowerCase()))) {
                    game.guesses.push(letter);
                    document.getElementById("guessed").textContent = game.guesses;
                    document.getElementById(letter).classList.add("d-none");
                    if (lowerWord.includes(letter)) {
                         game.correct(letter);
                    } else {
                         game.wrong(letter);
                    }
               }
          }
     }, 

     clickListeners: function () {
          for (let i =10; i < 36; i++) {
               let id = i.toString(36);
               // console.log(id);
               let button = document.getElementById(id);
               button.addEventListener("click", function(){
                    game.checkLetter(this.id);
               })
          }
     }
}

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

input.addEventListener('keydown', game.checkLetter);
game.clickListeners();
game.reset();