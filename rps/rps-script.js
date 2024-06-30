const rpsMode = {
    rock: {
        id: "Rock",
        lower: "rock",
        button: document.querySelector(".left"),
        weaknesses: {
            paper: "Paper covers rock!"
        },
        emoji: "✊",
        styleClass: "red"
    },
    paper: {
        id: "Paper",
        lower: "paper",
        button: document.querySelector('.mid'),
        weaknesses: {
            scissors: "Scissors cut paper!"
        },
        emoji: "🖐" + String.fromCodePoint("65039"),
        styleClass: "silver"
    },
    scissors: {
        id: "Scissors",
        lower: "scissors",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes scissors!"
        },
        emoji: "✌" + String.fromCodePoint("65039"),
        styleClass: "gold"
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
        emoji: "✊",
        styleClass: "red"
    },
    paper: {
        id: "Paper",
        lower: "paper",
        button: document.querySelector('.mid'),
        weaknesses: {
            scissors: "Scissors cut paper!",
            lizard: "Lizard eats paper!"
        },
        emoji: "🖐" + String.fromCodePoint("65039"),
        styleClass: "silver"
    },
    scissors: {
        id: "Scissors",
        lower: "scissors",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes scissors!",
            spock: "Spock smashes scissors!"
        },
        emoji: "✌" + String.fromCodePoint("65039"),
        styleClass: "gold"
    },
    lizard: {
        id: "Lizard",
        lower: "lizard",
        button: document.querySelector('.right'),
        weaknesses: {
            rock: "Rock crushes lizard!",
            scissors: "Scissors decapitate lizard!"
        },
        emoji: "🤏" + String.fromCodePoint("65039"),
        styleClass: "green"
    },
    spock: {
        id: "Spock",
        lower: "spock",
        button: document.querySelector('.right'),
        weaknesses: {
            paper: "Paper disproves Spock!",
            lizard: "Lizard poisons Spock!"
        },
        emoji: "🖖" + String.fromCodePoint("65039"),
        styleClass: "blue"
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
        emoji: "🌳",
        styleClass: "green"
    },
    fire: {
        id: "Fire",
        lower: "fire",
        button: document.querySelector('.mid'),
        weaknesses: {
            earth: "Earth smothers fire!",
            water: "Water extinguishes fire!"
        },
        emoji: "🔥" + String.fromCodePoint("65039"),
        styleClass: "red"
    },
    earth: {
        id: "Earth",
        lower: "earth",
        button: document.querySelector('.right'),
        weaknesses: {
            metal: "Metal impoverishes earth!",
            wood: "Wood depletes earth!"
        },
        emoji: "🌱" + String.fromCodePoint("65039"),
        styleClass: "gold"
    },
    metal: {
        id: "Metal",
        lower: "metal",
        button: document.querySelector('.right'),
        weaknesses: {
            water: "Water rusts metal!",
            fire: "Fire melts metal!"
        },
        emoji: "🪙" + String.fromCodePoint("65039"),
        styleClass: "silver"
    },
    water: {
        id: "Water",
        lower: "water",
        button: document.querySelector('.right'),
        weaknesses: {
            wood: "Wood absorbs water!",
            earth: "Earth blocks water!"
        },
        emoji: "🌊" + String.fromCodePoint("65039"),
        styleClass: "blue"
    },
}

const player = {
    score: 0,
    points: document.querySelector('.rps .player .points'),
    icon: document.querySelector('.rps .player .icon'),
    text: document.querySelector('.rps .player .text'),
    phrases: ["Let's go!", "Feeling lucky!", "I'm gonna win!", "Game on!"]
}

const cpu = {
    score: 0,
    points: document.querySelector('.rps .cpu .points'),
    icon: document.querySelector('.rps .cpu .icon'),
    text: document.querySelector('.rps .cpu .text'),
    phrases: ["Robots rule!", "Prepare to lose!", "Despair, mortal!", "Let's settle this!"]
}

const msg = document.querySelector('.rps .msg');
let mode = rpsMode;
let selection; //selected button

document.querySelector('.classic').onclick = () => {changeMode(rpsMode)};
document.querySelector('.spock').onclick = () => {changeMode(spockMode)};
document.querySelector('.wuxing').onclick = () => {changeMode(wuxingMode)};

document.querySelector('.rps').addEventListener("animationend", (e) => e.target.classList.remove('jump-shake', 'side-shake', 'bob'));

function randomRange(max) {
    return Math.floor (Math.random() * max);
}

function changeMode(myMode = rpsMode) {
    const options = document.querySelector('.options')
    mode = myMode;

    // Clears current board 
    options.textContent = '';
    msg.textContent = "Click any button to start a new game!";
    player.score                =   cpu.score = 0;
    player.text.textContent     =   cpu.text.textContent = "Pick a hand and play!";
    player.icon.textContent     =   cpu.icon.textContent = "🎲";
    player.points.textContent = `"${player.phrases[randomRange(player.phrases.length)]}"`;
    cpu.points.textContent = `"${cpu.phrases[randomRange(cpu.phrases.length)]}"`;
    player.icon.classList.add('bob');
    cpu.icon.classList.add('bob');

    // Create button for each option of mode
    for (const obj of Object.values(myMode)) {
        const btn = document.createElement('button');
        btn.textContent = obj.emoji
        btn.onclick = () => {selection = obj; playRound(true)};
        btn.setAttribute('title', obj.id);
        btn.classList.add(obj.styleClass, 'jump-shake');
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
    const i = randomRange(Object.keys(mode).length); 
    const result = Object.values(mode)[i];
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
        player.icon.classList.add('jump-shake');
    } else if (playerLoss) {
        text = playerLoss + " CPU scores!";
        updateScore(cpu);
        cpu.icon.classList.add('jump-shake');
    }
    else {
        player.icon.classList.add('side-shake');
        cpu.icon.classList.add('side-shake');
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
    user.points.classList.add('bob');
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
