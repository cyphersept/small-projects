//TODO: REFACTOR WITH OBJECT LISTS!!

const rock = {
    name:"Rock",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.left'),
    emoji:"✊",
    weakness:paper
}

const paper = {
    name:"Paper",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.mid'),
    emoji:"🖐",
    weakness:scissors
}

const scissors = {
    name:"Scissors",
    upper:this.name.toUpperCase(),
    button:document.querySelector('.right'),
    emoji:"✌",
    weakness:rock
}

const score = {
    playerPts:0,
    cpuPts:0,
}

const display = {
    play: document.querySelector('.rps .play'),
    msg: document.querySelector('.rps .msg'),
    player: document.querySelector('.rps .player'),
    cpu: document.querySelector('.rps .cpu')
}

const options = [rock, paper, scissors];
let selection //selected button


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
    updateText(`CPU chose ${result.name}!`);
    return result;
}

function playerPlay(mode) {    
    let result;
    if (mode == "UI") result = selection;
    else result = playerInput("Rock, paper, or scissors?"); //repeats until valid
    updateText(`You chose ${result.name}!`);
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

function playRound(mode) {
    const player = playerPlay(mode);
    const cpu = computerPlay();
    const winner = pickWinner(player, cpu);
    updateText(winner);
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
    return text;
}

function playGame(mode) {   

    if (mode == "UI") while (player < 5 && cpu < 5) playRound(UI);
    else for (let i = 0; i < 5; i++) playRound();
    
    let text = "[It's a tie! Play again?]";
    if (score.playerPts > score.cpuPts) text = ("[Congratulations! You're the winner!]");
    else text = ("[The CPU is the winner. Better luck next time!]");
    updateText(text);   
}

function updateText(str) {
    console.log(str);
    display.msg.textContent = str;
}

function reset(){
    clearSelection();
    score.playerPts = 0;
    score.cpuPts = 0;
}

function clearSelection(){
    rockBtn.classList.remove("selected");
    paperBtn.classList.remove("selected");
    scissorsBtn.classList.remove("selected");
    selection = null;
}

function updateSelection(btn) {
    clearSelection();
    btn.classList.add("selected");
    selection = options[parseInt(btn.getAttribute("data-index"))];
}

