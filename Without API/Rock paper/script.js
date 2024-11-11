let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

const drawGame = () => {
  msg.innerText = "Its a Draw. Play Again!";
  msg.style.backgroundColor = "#22031f";
};

const showWinner = (usrWin, userChoice, compChoice) => {
  if (usrWin === true) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Loose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let usrWin = true;
    if (userChoice === "rock") {
      //paper,scissors
      usrWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      usrWin = compChoice === "scissors" ? false : true;
    } else {
      // usrChoice === sicssors
      usrWin = compChoice === "rock" ? false : true;
    }
    showWinner(usrWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
