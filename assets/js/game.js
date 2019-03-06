let words = ["Dumbledore", "Muggle", "Squib", "Basilisk", "Hippogriff", "Nagini", "Mandrake", "Bellatrix", "Draco", "Arithmancy", "Transfiguration", "Obliviate", "Riddikulus", "Sectumsempra", "Avada Kedavra", "Alohomora", "Lumos", "Expelliarmus", "Wingardium Leviosa", "Accio", "Expecto Patronum"];

function randNum (max) {
     return Math.floor(Math.random() * Math.floor(max));
}

let currentWord = "";
let guesses = 0;
let wins = 0;
let losses = 0;

function reset () {
     currentWord = words[randNum(words.length)];
     guesses = 10;
}
