"use strict";

//Chiffre aléatoire entre 1-20
function chiffreAleatoire() {
  const answerFinal = Math.floor(Math.random() * 20) + 1;
  return answerFinal;
}

//Sélection du bouton
const checkButton = document.querySelector("#check");
//Sélection du texte
const text = document.querySelector("p#hint");
//Sélection du body
const body = document.querySelector("body");
//Sélection de la reponse
const answer = document.querySelector("div#answer");

//Variable pour le chiffre aléatoire
let answerFinal = chiffreAleatoire();
//Variable pour le nombre d'essais
let essais = 0;
//Variable pour le highScore
let highScore = Infinity;

//Function si juste
function juste() {
  text.textContent = "Bravo !";
  body.style.backgroundColor = "green";
  text.style.color = "white";
  answer.textContent = answerFinal;
}
//Function si trop bas
function bas() {
  text.textContent = "Trop bas !";
  text.style.color = "red";
}
//Function si trop haut
function haut() {
  text.textContent = "Trop haut !";
  text.style.color = "red";
}
//Function bestScore
function bestScore() {
  if (essais < highScore) {
    highScore = essais;
    document.querySelector("#highscore").textContent = highScore;
  } else {
    document.querySelector("#highscore").textContent = highScore;
  }
}
//Function score
function score() {
  document.querySelector("#score").textContent = essais;
}
//Mettre le score à 0
score(); 

//Vérification de la réponse
checkButton.addEventListener("click", function () {
  let inputValue = document.querySelector("#guess").value;
  essais++;

  if (inputValue < 1 || inputValue > 20) {
    text.textContent = "🚨 Veuillez entrer un nombre entre 1 et 20";
  } else if (inputValue == answerFinal) {
    juste();
    bestScore();
    score();
  } else if (inputValue < answerFinal) {
    bas();
  } else {
    haut();
  }
});

//Recommencer
document.querySelector("#again").addEventListener("click", function () {
  answerFinal = chiffreAleatoire();
  answer.textContent = "?";
  text.textContent = "Start guessing...";
  body.style.backgroundColor = "#222";
  text.style.color = "white";
  document.querySelector("#guess").value = "";
  essais = 0;
  score();
});
