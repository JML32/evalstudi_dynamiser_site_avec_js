
/******************************************************************************************/
/* Variables Definition and setup of variables with function named newGameVariablesSetup  */
/******************************************************************************************/

    let player1GlobalScore, player2GlobalScore, player1CurrentScore, player2CurrentScore, score, currentPlayer,gameRun;

/*************/
/* functions */
/*************/

const newGameVariablesSetup = () => {
    player1GlobalScore = 0;
    player2GlobalScore = 0;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    score = 0;
    currentPlayer = 1;
    gameRun = true;
    document.querySelector('.player1Name').innerHTML = "Player 1<span class=\"player1Turn\">&#8226;</span>";
    document.querySelector('.player1Name').style.fontWeight = 900;
    document.querySelector('.player2Name').innerHTML = "Player 2<span class=\"player2Turn\">&#8226;</span>";
    document.querySelector('.player2Name').style.fontWeight = 'lighter';
    document.querySelector('.player1Turn').style.display = 'inline';
    document.querySelector('.player2Turn').style.display = 'none';
    document.querySelector('.player1GlobalScore').innerHTML = 0;
    document.querySelector('.player2GlobalScore').innerHTML = 0;
    document.querySelector('.player1CurrentScore').innerHTML = 0;
    document.querySelector('.player2CurrentScore').innerHTML = 0;
    document.querySelector('.dice').style.display = 'none';
}

const playerChange = () => {
    score = 0;
    document.querySelector('.player1CurrentScore').textContent = 0;
    document.querySelector('.player2CurrentScore').textContent = 0;

    if (currentPlayer === 1){
        currentPlayer = 2;
        document.querySelector('.player1Turn').style.display = 'none';
        document.querySelector('.player2Turn').style.display = 'inline';
        document.querySelector('.player2Name').style.fontWeight = '900';
        document.querySelector('.player1Name').style.fontWeight = 'lighter';
    } else if (currentPlayer === 2 ){
        currentPlayer = 1;
        document.querySelector('.player2Turn').style.display = 'none';
        document.querySelector('.player1Turn').style.display = 'inline';
        document.querySelector('.player2Name').style.fontWeight = 'lighter';
        document.querySelector('.player1Name').style.fontWeight = '900';
    }
}

/******************/
/*   function run */
/******************/

newGameVariablesSetup();

/********************************************/
/*  listening events on clicks on 3 buttons */
/********************************************/

/* listening events on clicks on button 'buttonRollDice' */
document.querySelector('.buttonRollDice').addEventListener("click", () => {

    document.querySelector(".dice").style.animation = "diceRotation 1s ease";

    if (gameRun){
        // lancé de dé aléatoire
        let dice = Math.floor(Math.random() * 6) + 1 ;

        // dice on screen
        let diceOnScreen = document.querySelector('.dice');
        diceOnScreen.style.display = 'block';
        diceOnScreen.src = 'images/dice-' + dice + '.png';

        // if dice value different 1 then player currentScore is incremented <ith the value of the dice, if not change player
        if (dice !=1){
            score += dice;
            document.querySelector('.player' + currentPlayer + 'CurrentScore').innerHTML = score;
        } else {
            document.querySelector('.player' + currentPlayer + 'CurrentScore').innerHTML = 0;
            score = 0;
            player1CurrentScore = 0;
            player2CurrentScore = 0;
            // change to the other player
            playerChange();
        }
    }
})

/* listening events on clicks on button 'buttonHold' */
document.querySelector('.buttonHold').addEventListener('click', () => {

    if (gameRun) {
        // if game still running, update of the global scores
        if (currentPlayer === 1){
            player1GlobalScore += score;
            player1CurrentScore = 0;
            score = 0;
        } else {
            player2GlobalScore += score;
            player2CurrentScore = 0;
            score = 0;
        }
        document.querySelector('.player1GlobalScore').innerHTML = player1GlobalScore;
        document.querySelector('.player2GlobalScore').innerHTML = player2GlobalScore;
    }

    // check if a player won the game
    if (player1GlobalScore >= 100 || player2GlobalScore >= 100) {
        document.querySelector('.player' + currentPlayer + 'Name').textContent = 'Winner!';
        gameRun = false;
    } else {
        // change to the other player
        playerChange();
    }
});


/* listening events on clicks on button 'buttonNewGame' */
document.querySelector('.buttonNewGame').addEventListener('click', newGameVariablesSetup);

