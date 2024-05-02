// const quizes = [
//   { quiz: '4 + 2?', answers: [2, 6, 8], answer: '6' },
//   { quiz: '1 + 2?', answers: [4, 8, '정답 없음'], answer: '정답 없음' },
//   { quiz: '6 + 7?', answers: [12, 13, 14, 15], answer: '13' },
//   { quiz: '3 * 2?', answers: [24, 6], answer: '6' },
//   { quiz: '10 / 2?', answers: [6, 9, '정답 없음'], answer: '정답 없음' },
//   { quiz: '35 + 2?', answers: [28, 37, '정답 없음'], answer: '37' },
// ];

const quizes = [
  {
    quiz: '해리포터의 호그와트 기숙사는?',
    answers: ['그리핀도르', '슬리데린', '래번클로', '후플푸프'],
    answer: '그리핀도르',
  },
  {
    quiz: '해리포터의 무당벌레가 특이한 점은?',
    answers: [
      '날 수 있다',
      '말을 할 수 있다',
      '인간처럼 걷는다',
      '불이 나온다',
    ],
    answer: '말을 할 수 있다',
  },
  {
    quiz: '해리포터가 비밀의 방에서 발견한 것은?',
    answers: ['피니', '빌어레가디', '바틀리비', '바라쿠다'],
    answer: '바틀리비',
  },
  {
    quiz: '해리포터의 최초의 완드를 만든 이는?',
    answers: ['오리버 스코어', '댈릭 하플퍼', '짐슈', '오리반드'],
    answer: '오리버 스코어',
  },
  {
    quiz: '해리포터의 아이의 이름은?',
    answers: ['알버스 서버스', '해리', '제임스', '셜리'],
    answer: '알버스 서버스',
  },
  {
    quiz: '해리포터의 행마부의 위치는?',
    answers: ['다이어걸리 앨리', '리버턴', '킹스 크로스', '리버풀'],
    answer: '다이어걸리 앨리',
  },
];

let quizIdx = -1;
let clickCnt = 0;

const body = document.querySelector('body');
const quizTitle = document.querySelector('#quizTitle');
const answerList = document.querySelector('.answerList');

const button = document.querySelector('button');

// window.onload = createQuiz;

answerList.addEventListener('click', (e) => {
  if (e.target.tagName === 'DIV') return;
  if (clickCnt === 0) return;
  clickCnt = clickCnt - 1;

  e.target.parentNode.childNodes.forEach((span) => {
    if (span.innerText === quizes[quizIdx].answer) {
      span.style.background = '#58dd94';
      span.style.color = '#f8f9fa';
    } else {
      span.style.background = '#dee2e6';
    }
  });

  if (e.target.innerText === quizes[quizIdx].answer) {
    button.innerHTML = '다음 <i class="fa-solid fa-angles-right"></i>';
  } else {
    button.innerHTML =
      '다시하기 <i class="fa-solid fa-arrow-rotate-right"></i>';
  }
  button.style.display = 'block';
});

button.addEventListener('click', createQuiz);

function createQuiz() {
  let idx;

  while (true) {
    idx = Math.floor(Math.random() * quizes.length);
    if (idx !== quizIdx) {
      quizIdx = idx;
      break;
    }
  }

  clickCnt = clickCnt + 1;

  quizTitle.innerText = quizes[quizIdx].quiz;

  answerList.innerHTML = '';
  quizes[quizIdx].answers.forEach((item) => {
    const span = document.createElement('span');
    span.innerText = item;

    answerList.appendChild(span);
  });

  button.style.display = 'none';
}

createQuiz();
