const startScreen = document.querySelector(".start-container");
const questionScreen = document.querySelector(".question-container");
const resultScreen = document.querySelector(".result-container");
const questionDisplay = document.querySelector(".questions");
const QuestionIndex = document.querySelector(".Question-Index");
const answerCards = document.querySelector(".answer-cards");
const scoreDisplay = document.querySelector(".score");
const finalscoreDisplay = document.querySelector(".final-score");
const QuestionAmount = document.querySelector(".Question-Amount");
const messages = document.querySelector(".messages") ;
const progressDisplay = document.querySelector(".progress");

const questionsData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Mark Twain", "William Shakespeare", "Jane Austen", "Charles Dickens"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: "2"
    },
    {
        question: "Which gas do plants use for photosynthesis?",
        answers: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        correct: "Carbon Dioxide"
    }
];

let currentIndex = 0;
let score = 0;
const totalQuestion = questionsData.length;
let progress = 0;

function startQuiz() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    currentIndex = 0;
    score = 0;
    progressDisplay.style.width = "0%";
    showQuestion();
}

function showQuestion() {
    questionDisplay.textContent = questionsData[currentIndex].question;
    QuestionAmount.innerHTML = totalQuestion;
    QuestionIndex.innerHTML = currentIndex + 1;
    answerCards.innerHTML = "";
    questionsData[currentIndex].answers.forEach((element) => {
        const btn = document.createElement("button");
        btn.classList.add("question");
        btn.addEventListener('click', () => {
            const correctAnswer = questionsData[currentIndex].correct;
            if (correctAnswer === element) {
                btn.classList.add("correct");
                score++;
            } else {
                btn.classList.add("incorrect");
            }

            const allBtn = document.querySelectorAll(".question");
            allBtn.forEach(btn => {
                btn.disabled = true;
                if(btn.textContent === correctAnswer) btn.classList.add("correct") ;
            })

            setTimeout(() => {
                currentIndex++;
                progress = (currentIndex / totalQuestion) * 100;
                update();
                if (currentIndex < questionsData.length) showQuestion();
                else showResult();
            }, 1000);
        });
        btn.textContent = element;

        answerCards.appendChild(btn);
    });
}


function update() {
    QuestionIndex.innerHTML = currentIndex;
    scoreDisplay.innerHTML = score;
    finalscoreDisplay.innerHTML = score;
    progressDisplay.style.width = progress + "%";
}

function showResult() {
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');
    if (score === 0) {
        messages.innerHTML = "You already did your best";
    } else if (score > 0 && score <= 3) {
        messages.innerHTML = "Great Job";
    } else {
        messages.innerHTML = "Well done player";
    }
}

function restart() {
    startScreen.classList.add('active');
    resultScreen.classList.remove('active');
}