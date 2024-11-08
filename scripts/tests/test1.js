const currentTest = {
    id: 'test1',
    title: 'Угадай аниме по скриншоту',
    
    questions: [
        {
            id: 1,
            image: "../media/questions/test1/test1_item1.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Я хочу съесть твою поджелудочную", "Хёка", "Связь сердец", "Как и ожидалось, моя школьная романтическая жизнь не удалась"],
            correctAnswer: "Я хочу съесть твою поджелудочную"
        },
        {
            id: 2,
            image: "../media/questions/test1/test1_item2.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Гинтама", "Детектив-оборотень Инаба", "Вельзепуз", "Человек-бензопила"],
            correctAnswer: "Детектив-оборотень Инаба"
        },
        {
            id: 3,
            image: "../media/questions/test1/test1_item3.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Адский рай", "Токийский гуль", "Иллюзия рая", "Из нового света"],
            correctAnswer: "Иллюзия рая"
        },
        {
            id: 4,
            image: "../media/questions/test1/test1_item4.png",
            question: "Угадай аниме по скриншоту",
            options: ["Брошенный кролик", "Меланхолия Харухи Судзумии", "Этот глупый свин не понимает мечту девочки-зайки", "Аниме-истории"],
            correctAnswer: "Аниме-истории"
        },
        {
            id: 5,
            image: "../media/questions/test1/test1_item5.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Повседневная жизнь старшеклассников", "Дурни, тесты, аватары", "Нет лекарства для моего брата!", "Запредельная четвёрка"],
            correctAnswer: "Повседневная жизнь старшеклассников"
        },
        {
            id: 6,
            image: "../media/questions/test1/test1_item6.png",
            question: "Угадай аниме по скриншоту",
            options: ["Слишком много проигравших героинь!", "Мой «комплекс братика» морали не остановить!", "Как и ожидалось, моя школьная романтическая жизнь не удалась", "Этот глупый свин не понимает мечту девочки-зайки"],
            correctAnswer: "Слишком много проигравших героинь!"
        },
        {
            id: 7,
            image: "../media/questions/test1/test1_item7.png",
            question: "Угадай аниме по скриншоту",
            options: ["Аватар короля", "Драконий жемчуг", "Лунное путешествие приведёт к новому миру", "Дракон-горничная госпожи Кобаяси"],
            correctAnswer: "Аватар короля"
        },
        {
            id: 8,
            image: "../media/questions/test1/test1_item8.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Госпожа Кагуя: в любви как на войне", "Моб Психо 100", "Магическая битва", "Вечеринка мертвецов"],
            correctAnswer: "Госпожа Кагуя: в любви как на войне"
        },
        {
            id: 9,
            image: "../media/questions/test1/test1_item9.png",
            question: "Угадай аниме по скриншоту",
            options: ["Королева со скальпелем", "Шарлотта", "Натюрморт в серых тонах", "Парад смерти"],
            correctAnswer: "Королева со скальпелем"
        },
        {
            id: 10,
            image: "../media/questions/test1/test1_item10.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Магическая битва", "Волейбол!!", "Блич", "Путь аса"],
            correctAnswer: "Магическая битва"
        }
    ],

    // Метод для отображения вопроса
    showQuestion() {
        const question = this.questions[QuizCommon.currentQuestion];
        const container = document.querySelector('.container');
        
        // Создаем копию массива опций и перемешиваем её
        const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
        
        const questionHTML = `
            <div class="question-container">
                <h1 class="quiz-title">${question.question}</h1>
                <img class="question-image" src="${question.image}" alt="Аниме скриншот">
                <div class="question-counter">${QuizCommon.currentQuestion + 1}/${this.questions.length}</div>
                <div class="options-container">
                    ${shuffledOptions.map(option => `
                        <button class="option-button" onclick="QuizCommon.checkAnswer('${option}')">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = questionHTML;

        // Обработка ошибок загрузки изображения
        const img = container.querySelector('.question-image');
        img.onerror = function() {
            this.src = '../../media/error-image.jpg'; // Путь к изображению-заглушке
            console.error(`Ошибка загрузки изображения: ${question.image}`);
        };
    },

    // Метод для предзагрузки изображений (опционально)
    preloadImages() {
        this.questions.forEach(question => {
            const img = new Image();
            img.src = question.image;
        });
    }
};

// Функция для показа текущего вопроса (вызывается из common.js)
function showQuestion() {
    currentTest.showQuestion();
}

// Предзагрузка изображений при загрузке скрипта (опционально)
// currentTest.preloadImages();
