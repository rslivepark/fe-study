const buttons = document.querySelectorAll('button');
const userDisplay = document.querySelector('.user > img');
const computerDisplay = document.querySelector('.computer > img');
let countDisplay = document.querySelector('.count');
let userScore = document.querySelector('.user > .score');
let computerScore = document.querySelector('.computer > .score');
let winner = document.querySelector('.winner');

const result = ['scissors', 'rock', 'paper'];

let count = 10;
let userWinCount = 0;
let computerWinCount = 0;

const game = (user, computer) => {
  if (count > 0) {
    if (
      (user === 'rock' && computer === 'rock') ||
      (user === 'scissors' && computer === 'scissors') ||
      (user === 'paper' && computer === 'paper')
    ) {
    }

    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'scissors' && computer === 'paper') ||
      (user === 'paper' && computer === 'rock')
    ) {
      userWinCount += 1;
      userScore.textContent = userWinCount;
    } else {
      computerWinCount += 1;
      computerScore.textContent = computerWinCount;
    }
  }
  count -= 1;
  countDisplay.textContent = count;

  if (count === 0) {
    if (userWinCount > computerWinCount) {
      winner.style.color = 'black';
      winner.textContent = '플레이어 우승!!';
    } else if (userWinCount < computerWinCount) {
      winner.style.color = 'black';
      winner.textContent = '컴퓨터 우승!!';
    } else {
      winner.style.color = 'black';
      winner.textContent = '무승부!!';
    }
    buttons.forEach((button) => {
      button.disabled = true; // 버튼 비활성화
    });
    alert('남은 횟수가 없습니다. 하단의 "다시 시작하기"를 눌러주세요.');
  }
};

const play = (event) => {
  const user = event.target.alt;
  const randomIdx = Math.floor(Math.random() * 3);
  const computer = result[randomIdx];

  game(user, computer);
};

buttons.forEach((button) => {
  button.addEventListener('click', play);
});

const buttonDisabled = () => {
  buttons.forEach((button) => {
    button.disabled = false; // 버튼 활성화
  });
};

const gameReset = () => {
  count = 10;
  userWinCount = 0;
  computerWinCount = 0;

  countDisplay.textContent = count;
  userScore.textContent = userWinCount;
  computerScore.textContent = computerWinCount;
  winner.textContent = '';
  winner.style.color = 'white';
};

document.querySelector('.resetBtn').addEventListener('click', () => {
  gameReset();
  buttonDisabled();
});
