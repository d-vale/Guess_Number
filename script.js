"use strict";

//Definir le maximum
const MAX_NUMBER = 20;

// Sélection des éléments
const hint = document.querySelector("#hint");
const answer = document.querySelector("#answer");
const scoreLabel = document.querySelector("#score");
const highscoreLabel = document.querySelector("#highscore");
document.querySelector("#between").textContent = `Between 1 and ${MAX_NUMBER}`;

//Fonction pour créer un nombre aléatoire
const createRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

//Object du jeu (Logique du jeu)
const game = {
    correctAnswer: createRandomNumber(MAX_NUMBER),
    score : MAX_NUMBER,
    highscore : 0,
    isCorrectAnswer(value){
        this.score--;
        return this.correctAnswer === value;
    },
    setHighscore(){
        if(this.score > this.highscore){
            this.highscore = this.score;
        }
        return this;
    },
}

const handleCheck =() => {
    const guess = document.querySelector("#guess");
    //Mauvaise réponse
    if(!game.isCorrectAnswer(+guess.value)){
        //Si c'est pas un nombre valide
        if(isNaN(guess.value) || guess.value < 1 || guess.value > MAX_NUMBER){
            hint.textContent = `💀 Guess must be between 1 and ${MAX_NUMBER}`;
        } else {
            hint.textContent = guess.value > game.correctAnswer ? "🔻 Too high!" : "🔺 Too low!";
        }

    } else {
        //Bonne réponse
        game.setHighscore();

        document.body.style.backgroundColor = "var(--color-tertiary)";
        highscoreLabel.textContent = game.highscore;
        answer.textContent = game.correctAnswer;
        answer.classList.add("correct");
        hint.textContent = "🎉 Correct Number !";
        scoreLabel.textContent = `Highscore: ${game.highscore}`;
    }
    scoreLabel.textContent = game.score;
}

const handleAgain =() => {
    game.correctAnswer = createRandomNumber(MAX_NUMBER);
    game.score = MAX_NUMBER;

    document.body.style.backgroundColor = "var(--color-primary)";
    hint.textContent = "Start guessing...";
    answer.textContent = "?";
    answer.classList.remove("correct");
    scoreLabel.textContent = game.score;
}


//Changement des messages
document.querySelector("#check").addEventListener("click",  handleCheck);
document.querySelector("#again").addEventListener("click", handleAgain);
