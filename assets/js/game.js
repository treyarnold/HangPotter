let words = ["Dumbledore", "Muggle", "Squib", "Basilisk", "Hippogriff", "Nagini", "Mandrake", "Bellatrix", "Draco", "Arithmancy", "Transfiguration", "Obliviate", "Riddikulus", "Sectumsempra", "Avada Kedavra", "Alohomora", "Lumos", "Expelliarmus", "Wingardium Leviosa", "Accio", "Expecto Patronum"];

function randNum (max) {
     return Math.floor(Math.random() * Math.floor(max));
}

let currentWord = words[randNum(words.length)];
let guesses = 10;
let streak = 0;

