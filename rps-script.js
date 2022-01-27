//TODO: REFACTOR WITH OBJECT LISTS!!

const rock = {
    name:"Rock",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.rock'),
    weakness:paper
}

const paper = {
    name:"Paper",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.paper'),
    weakness:scissors
}

const scissors = {
    name:"Scissors",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.scissors'),
    weakness:rock
}

const score = {
    playerPts:0,
    cpuPts:0,
    playerWins:0,
    cpuWins:0
}

const options = [rock, paper, scissors];
let selection = options[0];


options.forEach(item => {
    item.button.addEventListener('click', event => {
      updateSelection(item);
    })
})

//https://www.delftstack.com/howto/javascript/javascript-toggle-button/

//Refactor into literal "mini" games contained in boxes, several visible on screen at once to minimize clicking

function computerPlay() {    
    const num = Math.floor(Math.random() * 3); //Number from 0-2
    const result = options[num];
    console.log(`CPU chose ${result.name}!`);
    return result;
}

function playerPlay(type) {    
    let result = selection;
    if (type == "console") result = playerInput("Rock, paper, or scissors?"); //repeats until valid
    console.log(`You chose ${result.name}!`);
    return result;
}

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

function playRound(type) {
    let player = playerPlay(type);
    let cpu = computerPlay();
    return pickWinner(player, cpu);
    /*let winner = "";
    if (player == cpu) winner = "Tie";
        else if ((player == cpu + 1) || (player == 0) && (cpu == 2)) winner = "Player";
        else winner = "CPU";
    return winner;*/
}

function pickWinner(player, cpu) {
    let text = "It's a tie!"
    if (player === cpu.weakness) {
        text = "You win the round!"
        score.playerPts++;
    } else if (cpu === player.weakness) {
        text = "I win the round!"
        score.cpuPts++;
    }
}

function playGameText() {
    const player = score.playerPts;
    const cpu = score.cpuPts
    
    for (let i = 0; i < 5; i++) playRound("console");    
    if (player < cpu) console.log("[Congratulations! You're the winner!]");
    else if (player < cpu) console.log("[The CPU is the winner. Better luck next time!]");
    else console.log("[It's a tie! Play again?]");
}

function showResults(){

}


function updateSelection(btn) {
    rockBtn.classList.remove("selected");
    paperBtn.classList.remove("selected");
    scissorsBtn.classList.remove("selected");
    selection = 0;
    if (btn !=="clear") {
        btn.classList.add("selected");
        btn.getAttribute("data-option")
    }
}

