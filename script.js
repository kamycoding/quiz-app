const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Main Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: 1,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: ["let", "style", "section", "html"],
    correctAnswer: 0,
  },
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Object Model",
      "Data Object Method",
      "Design Order Module",
      "Digital Output Mode",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which method selects an HTML element by its ID?",
    answers: [
      "document.query()",
      "document.getElementById()",
      "document.findId()",
      "document.selectId()",
    ],
    correctAnswer: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");

const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");

const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");

const scoreElement = document.getElementById("score");
const finalTotalElement = document.getElementById("final-total");

const correctSound = new Audio("audio/true.mp3");
const wrongSound = new Audio("audio/wrong.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";

function playFeedbackSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function initQuiz() {
  totalQuestionsElement.textContent = questions.length;
  finalTotalElement.textContent = questions.length;
}

function resetQuizState() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;

  progressBar.style.width = "0%";
  progressLabel.textContent = "0%";
  nextButton.disabled = true;
}

function showWelcomeScreen() {
  resetQuizState();

  quizScreen.classList.add("d-none");
  endScreen.classList.add("d-none");
  welcomeScreen.classList.remove("d-none");
}

function startQuiz() {
  resetQuizState();

  welcomeScreen.classList.add("d-none");
  endScreen.classList.add("d-none");
  quizScreen.classList.remove("d-none");

  renderQuestion();
}

function renderQuestion() {
  hasAnswered = false;
  nextButton.disabled = true;

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  currentQuestionElement.textContent = currentQuestionIndex + 1;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = createAnswerButton(answer, index);

    answersContainer.appendChild(answerButton);
  });

  updateProgress();
}

function createAnswerButton(answer, index) {
  const button = document.createElement("button");

  button.className = "answer-btn";
  button.type = "button";
  button.textContent = answer;

  button.addEventListener("click", () => {
    handleAnswerClick(button, index);
  });

  return button;
}

function handleAnswerClick(selectedButton, selectedIndex) {
  if (hasAnswered) {
    return;
  }

  hasAnswered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll(".answer-btn");
  const isCorrect = selectedIndex === currentQuestion.correctAnswer;

  disableAnswerButtons(answerButtons);

  if (isCorrect) {
    playFeedbackSound(correctSound);
    selectedButton.classList.add("correct");
    score++;
  } else {
    playFeedbackSound(wrongSound);
    selectedButton.classList.add("wrong");
    answerButtons[currentQuestion.correctAnswer].classList.add("correct");
  }

  nextButton.disabled = false;
}

function disableAnswerButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function showNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    showEndScreen();
    return;
  }

  renderQuestion();
}

function showEndScreen() {
  quizScreen.classList.add("d-none");
  endScreen.classList.remove("d-none");

  scoreElement.textContent = score;

  progressBar.style.width = "100%";
  progressLabel.textContent = "100%";

  nextButton.disabled = true;
}

function updateProgress() {
  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100,
  );

  progressBar.style.width = `${progress}%`;
  progressLabel.textContent = `${progress}%`;
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", showWelcomeScreen);

initQuiz();
