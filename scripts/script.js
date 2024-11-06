const questions = [
    {
        id: 1,
        image: "media/questions/test1/test1_item1.jpg",
        question: "Угадай аниме по скриншоту",
        options: ["Я хочу съесть твою поджелудочную", "Хёка", "Связь сердец", "Как и ожидалось, моя школьная романтическая жизнь не удалась"],
        correctAnswer: "Я хочу съесть твою поджелудочную"
    },
    {
        id: 2,
        image: "media/questions/test1/test1_item2.jpg",
        question: "Угадай аниме по скриншоту",
        options: ["Гинтама", "Детектив-оборотень Инаба", "Вельзепуз", "Человек-бензопила"],
        correctAnswer: "Детектив-оборотень Инаба"
    },
    {
        id: 3,
        image: "media/questions/test1/test1_item3.jpg",
        question: "Угадай аниме по скриншоту",
        options: ["Адский рай", "Токийский гуль", "Иллюзия рая", "Из нового света"],
        correctAnswer: "Иллюзия рая"
    },
    {
        id: 4,
        image: "media/questions/test1/test1_item4.png",
        question: "Угадай аниме по скриншоту",
        options: ["Брошенный кролик", "Меланхолия Харухи Судзумии", "Этот глупый свин не понимает мечту девочки-зайки", "Аниме-истории"],
        correctAnswer: "Аниме-истории"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

// Кэширование DOM-элементов
const container = document.querySelector('.container');
const questionContainer = document.querySelector('.question-container');

function showQuestion() {
    const question = questions[currentQuestion];
    
    const questionHTML = `
        <div class="question-container">
            <h1 class="quiz-title">${question.question}</h1>
            <img class="question-image" src="${question.image}" alt="Аниме скриншот">
            <div class="question-counter">${currentQuestion + 1}/${questions.length}</div>
            <div class="options-container">
                ${question.options.map(option => `
                    <button class="option-button" onclick="checkAnswer('${option}')">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = questionHTML;
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.option-button');
    
    buttons.forEach(button => {
        button.disabled = true;
    });
    
    if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="question-container">
            <h1 class="quiz-title">Тест завершен!</h1>
            <div class="results">
                <p>Правильных ответов: ${correctAnswers} из ${questions.length}</p>
                <button class="option-button" onclick="restartQuiz()">Пройти заново</button>
                <button class="option-button" onclick="goToHome()">На главную</button>
            </div>
        </div>
    `;
}

function goToHome() {
    window.location.replace('index.html');
}

function restartQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}

// Запускаем первый вопрос только если мы на странице теста
if (window.location.pathname.includes('test1.html')) {
    document.addEventListener('DOMContentLoaded', showQuestion);
}
