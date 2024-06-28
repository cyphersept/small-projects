const rpsMode = {
    rock: {
        name:"Rock",
        upper:this.name.toUpperCase(),
        button: document.querySelector(".left"),
        emoji:"✊"
    },
    paper: {
        name:"Paper",
        upper:this.name.toUpperCase(),
        button: document.querySelector('.mid'),
        emoji:"🖐" + String.fromCodePoint("65039")
    },
    scissors: {
        name:"Scissors",
        upper:this.name.toUpperCase(),
        button: document.querySelector('.right'),
        emoji:"✌" + String.fromCodePoint("65039")
    },
}

const player = {
    score: 0,
    points: document.querySelector('.rps .player .points'),
    icon: document.querySelector('.rps .player .icon'),
    text: document.querySelector('.rps .player .text'),
}

const cpu = {
    score: 0,
    points: document.querySelector('.rps .cpu .points'),
    icon: document.querySelector('.rps .cpu .icon'),
    text: document.querySelector('.rps .cpu .text'),
}

const msg = document.querySelector('.rps .msg');
rock.weaknesses = [paper];
paper.weaknesses = [scissors];
scissors.weaknesses = [rock];
let options = [rock, paper, scissors];
let selection; //selected button



options.forEach((e) => {
    e.button.addEventListener('click', event => {
        selection = e;
        playRound("UI");
    })
})

//https://www.delftstack.com/howto/javascript/javascript-toggle-button/

function playRound(mode) {
    if (player.score == 5 || cpu.score == 5) return victory();
    if (!player.score && !cpu.score) {
        updateText("", player.points);
        updateText("", cpu.points);
    }
    const playerPick = playerPlay(mode);
    const cpuPick = computerPlay();
    const winner = pickWinner(playerPick, cpuPick);
    updateText(winner, msg);
}

function computerPlay() {    
    const num = Math.floor(Math.random() * 3); //Number from 0-2
    const result = options[num];
    updateText(`CPU chose ${result.name}!`, cpu.text);
    cpu.icon.textContent = result.emoji
    return result;
}

function playerPlay(mode, msg = "Rock, paper, or scissors?") {    
    let result;
    if (mode == "UI") result = selection;
    else result = playerInput(msg); //repeats until valid
    updateText(`You chose ${result.name}!`, player.text);
    player.icon.textContent = result.emoji;
    return result;
}

function pickWinner(playerPick, cpuPick) {
    let text = "It's a tie!"
    if (cpuPick.weaknesses.includes(playerPick)) {
        text = "You win the round!"
        updateScore(player)
    } else if (playerPick.weaknesses.includes(cpuPick)) {
        text = "CPU wins the round!"
        updateScore(cpu)
    }
    return text;
}

function updateText(str, loc) {
    console.log(str);
    loc.textContent = str;
}

function updateScore(user) {
    user.score++;
    user.points.textContent += "⭐" + String.fromCodePoint("65039")
}

function victory() {
    const winner = (player.score > cpu.score) ? player : cpu;
    const loser = (player.score < cpu.score) ? player : cpu;
    player.score = 0;
    cpu.score = 0;

    winner.icon.textContent = "🎉"
    winner.text.textContent = "Hip hip hurray!"
    loser.icon.textContent = "😭"
    loser.text.textContent = "Better luck next time!"
    msg.textContent = (winner == player)
        ? "You won the game! Click to play again!"
        : "CPU won the game! Click to play again!"
}

//FOR CONSOLE GAMEPLAY MODE: 
function playerInput(msg) { //Recursively loops until player gives valid input
    const input = prompt(msg);
    const result = validateInput(input);
    return (result)
        ? result
        : playerInput("Invalid input, please enter [rock], [paper], or [scissors]!");
}

function validateInput(input) { //Returns index of valid input OR undefined
    const playerChoice = input.toUpperCase();
    const result = options.find(rps => rps.upper == playerChoice);
    return result;
}

function playGame(mode) {   

    if (mode == "UI") while (player.score < 3 && cpu.score < 3) playRound(UI);
    else for (let i = 0; i < 5; i++) playRound();
    
    let text = "[It's a tie! Play again?]";
    if (player.score > cpu.score) text = ("[Congratulations! You're the winner!]");
    else text = ("[The CPU is the winner. Better luck next time!]");
    updateText(text, msg);   
}
