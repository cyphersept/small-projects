const rpsMode = {
    rock: {
        id: "Rock",
        lower: "rock",
        button: document.querySelector(".left"),
        weaknesses: {
            paper: "Paper covers rock!"
        },
        emoji: "✊"
    },
    paper: {
        id: "Paper",
        lower: "paper",
        button: document.querySelector('.mid'),
        weaknesses: {
            scissors: "Scissors cut paper!"
        },
        emoji: "🖐" + String.fromCodePoint("65039")
    },
    scissors: {
        id: "Scissors",
        lower: "scissors",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes scissors!"
        },
        emoji: "✌" + String.fromCodePoint("65039")
    },
}

const spockMode = {
    rock: {
        id: "Rock",
        lower: "rock",
        button: document.querySelector(".left"),
        weaknesses: {
            paper: "Paper covers rock!",
            spock: "Spock vaporizes rock!"
        },
        emoji: "✊"
    },
    paper: {
        id: "Paper",
        lower: "paper",
        button: document.querySelector('.mid'),
        weaknesses: {
            scissors: "Scissors cut paper!",
            lizard: "Lizard eats paper!"
        },
        emoji: "🖐" + String.fromCodePoint("65039")
    },
    scissors: {
        id: "Scissors",
        lower: "scissors",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes scissors!",
            spock: "Spock smashes scissors!"
        },
        emoji: "✌" + String.fromCodePoint("65039")
    },
    lizard: {
        id: "Lizard",
        lower: "lizard",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes lizard!",
            scissors: "Scissors decapitate lizard!"
        },
        emoji: "🤏" + String.fromCodePoint("65039")
    },
    spock: {
        id: "Spock",
        lower: "spock",
        button: document.querySelector('.right'),
        weaknesses: {
            paper: "Paper disproves Spock!",
            lizard: "Lizard poisons Spock!"
        },
        emoji: "🖖" + String.fromCodePoint("65039")
    },
}

const wuxingMode = {
    wood: {
        id: "Wood",
        lower: "wood",
        button: document.querySelector(".left"),
        weaknesses: {
            fire: "Fire burns wood!",
            metal: "Metal snaps wood!"
        },
        emoji: "🌳"
    },
    fire: {
        id: "Fire",
        lower: "fire",
        button: document.querySelector('.mid'),
        weaknesses: {
            earth: "Earth smothers fire!",
            water: "Water extinguishes fire!"
        },
        emoji: "🔥" + String.fromCodePoint("65039")
    },
    earth: {
        id: "Earth",
        lower: "earth",
        button: document.querySelector('.right'),
        weaknesses: {
            metal: "Metal impoverishes earth!",
            wood: "Wood depletes earth!"
        },
        emoji: "🌱" + String.fromCodePoint("65039")
    },
    metal: {
        id: "Metal",
        lower: "metal",
        button: document.querySelector('.right'),
        weaknesses: {
            water: "Water rusts metal!",
            fire: "Fire melts metal!"
        },
        emoji: "🪙" + String.fromCodePoint("65039")
    },
    water: {
        id: "Water",
        lower: "water",
        button: document.querySelector('.right'),
        weaknesses: {
            wood: "Wood absorbs water!",
            earth: "Earth blocks water!"
        },
        emoji: "🌊" + String.fromCodePoint("65039")
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
let mode = rpsMode;
let selection; //selected button

document.querySelector('.classic').onclick = () => {changeMode(rpsMode)};
document.querySelector('.spock').onclick = () => {changeMode(spockMode)};
document.querySelector('.wuxing').onclick = () => {changeMode(wuxingMode)};

player.icon.addEventListener("animationend", () => player.icon.classList.remove('shake1', 'shake2'));
cpu.icon.addEventListener("animationend", () => cpu.icon.classList.remove('shake1', 'shake2'));

function changeMode(myMode = wuxingMode) {
    const options = document.querySelector('.options')
    mode = myMode;
    options.textContent = '';
    for (const obj of Object.values(myMode)) {
        const btn = document.createElement('button');
        btn.textContent = obj.emoji
        btn.onclick = () => {selection = obj; playRound(true)};
        btn.setAttribute('title', obj.id);
        options.appendChild(btn);
    }
}

//https://www.delftstack.com/howto/javascript/javascript-toggle-button/

function playRound(uiMode) {
    player.icon.classList.remove('bob')
    cpu.icon.classList.remove('bob')
    if (player.score == 3 || cpu.score == 3) return victory();
    if (!player.score && !cpu.score) {
        updateText("", player.points);
        updateText("", cpu.points);
    }
    const playerPick = playerPlay(uiMode);
    const cpuPick = computerPlay(mode);
    const winner = pickWinner(playerPick, cpuPick);
    updateText(winner, msg);
}

function computerPlay(mode) {    
    const num = Math.floor(Math.random() * Object.keys(mode).length); //Number from 0-2
    const result = Object.values(mode)[num];
    updateText(`CPU chose ${result.id}!`, cpu.text);
    cpu.icon.textContent = result.emoji;
    return result;
}

function playerPlay(uiMode, msg = "Rock, paper, or scissors?") {    
    let result;
    if (uiMode) result = selection;
    else result = playerInput(msg); //repeats until valid
    updateText(`You chose ${result.id}!`, player.text);
    player.icon.textContent = result.emoji;
    return result;
}

function pickWinner(playerPick, cpuPick) {
    let text = "It's a tie!"
    const cpuLoss = cpuPick.weaknesses[playerPick.lower];
    const playerLoss = playerPick.weaknesses[cpuPick.lower];
    if (cpuLoss) {
        text = cpuLoss + " You score!";
        updateScore(player);
        player.icon.classList.add('shake1');
    } else if (playerLoss) {
        text = playerLoss + " CPU scores!";
        updateScore(cpu);
        cpu.icon.classList.add('shake1');
    }
    else {
        player.icon.classList.add('shake2');
        cpu.icon.classList.add('shake2');
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
    player.icon.classList.add('bob');
    cpu.icon.classList.add('bob');

    winner.icon.textContent = "🎉"
    winner.text.textContent = "Hip hip hurray!"
    loser.icon.textContent = "😭"
    loser.text.textContent = "Better luck next time!"
    msg.textContent = (winner == player)
        ? "You won! Click to play again!"
        : "CPU won! Click to play again!"
}

//FOR CONSOLE GAMEPLAY MODE: 
function playerInput(msg) { //Recursively loops until player gives valid input
    const input = prompt(msg);
    const result = validateInput(input);
    return (result)
        ? result
        : playerInput("Invalid input, please enter [rock], [paper], or [scissors]!");
}

function validateInput(input, mode) { //Returns index of valid input OR undefined
    const playerChoice = input.toLowerCase();
    const result = Object.values(mode).find(e => e.lower == playerChoice);
    return result;
}

function playGame(uiMode = true) {   

    if (uiMode) while (player.score < 3 && cpu.score < 3) playRound(true);
    else for (let i = 0; i < 3; i++) playRound();
    
    let text = "[It's a tie! Play again?]";
    if (player.score > cpu.score) text = ("[Congratulations! You're the winner!]");
    else text = ("[The CPU is the winner. Better luck next time!]");
    updateText(text, msg);   
}
