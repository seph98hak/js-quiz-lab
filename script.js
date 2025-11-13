const questions = [
  {
    q: "Which keyword creates a block-scoped variable in JavaScript?",
    opts: ["var", "let", "const", "define"],
    correct: 1
  },
  {
    q: "What does DOM stand for?",
    opts: [
      "Document Object Model",
      "Display Object Manager",
      "Document Order Module",
      "Digital Operation Mode"
    ],
    correct: 0
  },
  {
    q: "What will 'typeof []' return?",
    opts: ["array", "object", "list", "undefined"],
    correct: 1
  },
  {
    q: "How do you write a function in JavaScript?",
    opts: [
      "def myFunction()",
      "function myFunction()",
      "func myFunction()",
      "create myFunction()"
    ],
    correct: 1
  },
  {
    q: "Which method converts JSON text into a JS object?",
    opts: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    correct: 0
  }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 20;

function showQuestion() {
  const q = questions[current];
  document.getElementById("question-text").textContent = q.q;

  const choiceBox = document.getElementById("choices");
  choiceBox.innerHTML = "";
  q.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add("choice");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    choiceBox.appendChild(btn);
  });

  document.getElementById("next").style.display = "none";
  document.getElementById("current").textContent = current + 1;
  document.getElementById("total").textContent = questions.length;
  updateBar();
  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[current].correct;
  const buttons = document.querySelectorAll(".choice");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
    else if (i === selected && selected !== correct) btn.classList.add("wrong");
  });

  if (selected === correct) score++;
  document.getElementById("next").style.display = "inline-block";
}

function nextQ() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("points").textContent = score;
  document.getElementById("total-q").textContent = questions.length;

  const percent = (score / questions.length) * 100;
  let msg = "";
  if (percent >= 80) msg = "🔥 JavaScript Pro! Excellent work!";
  else if (percent >= 60) msg = "👍 Nice job! You’re getting there!";
  else msg = "📘 Keep learning! Practice makes perfect.";

  document.getElementById("remark").textContent = msg;
}

function restartGame() {
  current = 0;
  score = 0;
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function startTimer() {
  timeLeft = 20;
  document.getElementById("time").textContent = timeLeft;
  document.getElementById("time-fill").style.width = "100%";

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("time-fill").style.width = (timeLeft / 20) * 100 + "%";
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQ();
    }
  }, 1000);
}

function updateBar() {
  const progress = ((current + 1) / questions.length) * 100;
  document.getElementById("bar-fill").style.width = progress + "%";
}

document.addEventListener("DOMContentLoaded", showQuestion);