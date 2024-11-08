const currentTest = {
    id: 'test3',
    title: 'Угадай персонажа по силуэту',
    
    questions: [
        {
            id: 1,
            image: "../media/questions/test3/silhouette1.png",
            question: "Угадайте персонажа по силуэту:",
            options: ["Наруто Узумаки", "Ичиго Куросаки", "Эрен Йегер", "Луффи"],
            correctAnswer: "Луффи"
        },
        {
            id: 2,
            image: "../media/questions/test3/silhouette2.png",
            question: "Кто этот персонаж?",
            options: ["Микаса Аккерман", "Леви Аккерман", "Саске Учиха", "Зоро Ророноа"],
            correctAnswer: "Леви Аккерман"
        },
        {
            id: 3,
            image: "../media/questions/test3/silhouette3.png",
            question: "Узнаете этого персонажа?",
            options: ["Вегета", "Сайтама", "Гоку", "Ичиго"],
            correctAnswer: "Гоку"
        },
        {
            id: 4,
            image: "../media/questions/test3/silhouette4.png",
            question: "Кто скрывается в тени?",
            options: ["Тандзиро Камадо", "Зенитсу Агацума", "Иноске Хашибира", "Гию Томиока"],
            correctAnswer: "Тандзиро Камадо"
        }
    ],

    showQuestion() {
        const question = this.questions[QuizCommon.currentQuestion];
        const container = document.querySelector('.container');
        
        const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
        
        const questionHTML = `
            <div class="question-container">
                <h1 class="quiz-title">${question.question}</h1>
                <img src="${question.image}" alt="Силуэт персонажа" class="silhouette-image">
                <div class="question-counter">${QuizCommon.currentQuestion + 1}/${this.questions.length}</div>
                <div class="options-container">
                    ${shuffledOptions.map(option => `
                        <button class="option-button" onclick="QuizCommon.checkAnswer('${option}')">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = questionHTML;
    }
};

// Функция для показа текущего вопроса (вызывается из common.js)
function showQuestion() {
    currentTest.showQuestion();
}
