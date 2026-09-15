let scoreStr = localStorage.getItem('score');
let score;
let resultmsg = '';
loadScore(scoreStr);


function loadScore(scoreStr){
    score = scoreStr ? JSON.parse(scoreStr) : {
        win: 0,
        lost: 0,
        tie: 0,
    };

    score.displayScore = function(){
        return `won: ${score.win}, lost: ${score.lost}, Tie: ${score.tie}`;
    };

    showResult();
}

function resetScore(){
    score.win = 0;
    score.lost = 0;
    score.tie = 0;

    localStorage.removeItem('Score');

    document.querySelector('#user-move').innerText = '';
    document.querySelector('#computer-move').innerText = '';
    document.querySelector('#result').innerText = '';
    document.querySelector('#score').innerText = score.displayScore();
}


function getUserChoice(button){
    let userChoice = button.innerText;
    let computerChoice = generateComputerChoice(); 
    getResult(userChoice, computerChoice);
}


function generateComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3);

    if(randomNumber == 0){
        return 'BAT';
    }
    else if(randomNumber == 1){
        return 'BALL';
    }
    else{
        return 'STUMP';
    }
}


function getResult(userChoice, computerChoice){

    if(userChoice == computerChoice){
        resultmsg = "It's a tie!!";
        score.tie ++;
    }
    else if(userChoice == 'BAT' && computerChoice == 'BALL'){
        resultmsg = 'USER WON !!';
        score.win ++;
    }
    else if(userChoice == 'BAT' && computerChoice == 'STUMP'){
        resultmsg = 'COMPUTER WON !!';
        score.lost ++;
    }
    else if(userChoice == 'BALL' && computerChoice == 'BAT'){
        resultmsg = 'COMPUTER WON !!';
        score.lost ++;
    }
    else if(userChoice == 'BALL' && computerChoice == 'STUMP'){
        resultmsg = 'USER WON !!';
        score.win ++;
    }
    else if(userChoice == 'STUMP' && computerChoice == 'BAT'){
        resultmsg = 'USER WON !!';
        score.win ++;
    }
    else if(userChoice == 'STUMP' && computerChoice == 'BALL'){
        resultmsg = 'COMPUTER WON !!';
        score.lost ++;
    }
    else{
        resultmsg = 'wrong choice';
    }
    console.log(score);

    showResult(userChoice, computerChoice, resultmsg);

    alert(`You have chosen ${userChoice}. Computer choice is ${computerChoice}.
        
            ${resultmsg}

            ${score.displayScore()}`
        
    );
}

function showResult(userChoice, computerChoice, resultmsg){
    localStorage.setItem('Score', JSON.stringify(score));

    document.querySelector('#user-move').innerText =
        userChoice ? `You have chosen ${userChoice}` : '';

    document.querySelector('#computer-move').innerText =
        computerChoice ? `Computer choice is ${computerChoice}` : '';

    document.querySelector('#result').innerText = resultmsg || '';

    document.querySelector('#score').innerText = score.displayScore();
}

