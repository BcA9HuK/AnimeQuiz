const QuizCommon = {
    // Общие переменные состояния
    currentQuestion: 0,
    correctAnswers: 0,

    // Навигация
    goToHome() {
        window.location.href = '../index.html';
    },
    goProfile() {
        window.location.href = '../pages/profile.html';
    },
    goToSettings() {
        window.location.href = '../pages/settings.html';
    },

    // Перезапуск теста
    restartQuiz() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        if (typeof showQuestion === 'function') {
            showQuestion();
        }
    },

    // Проверка ответа
    checkAnswer(selectedAnswer) {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        if (selectedAnswer === currentTest.questions[this.currentQuestion].correctAnswer) {
            this.correctAnswers++;
        }
        
        this.currentQuestion++;
        if (this.currentQuestion < currentTest.questions.length) {
            showQuestion();
        } else {
            this.showResults();
        }
    },

    // Показ результатов
    showResults() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="question-container">
                <h1 class="quiz-title">Тест завершен!</h1>
                <div class="results">
                    <p>Правильных ответов: ${this.correctAnswers} из ${currentTest.questions.length}</p>
                    <div class="results-buttons">
                        <button class="option-button" onclick="QuizCommon.restartQuiz()">Пройти заново</button>
                        <button class="option-button" onclick="QuizCommon.goToHome()">На главную</button>
                    </div>
                </div>
            </div>
        `;
    },

    // Добавляем функцию для перемешивания массива
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
