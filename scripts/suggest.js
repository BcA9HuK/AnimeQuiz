document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggestForm');
    const addQuestionBtn = document.getElementById('addQuestion');
    const questionsContainer = document.getElementById('questionsContainer');
    
    // Функция создания нового блока вопроса
    function createQuestionBlock(questionNumber) {
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        questionBlock.dataset.question = questionNumber;
        
        questionBlock.innerHTML = `
            <div class="question-header">
                <h3>Вопрос ${questionNumber}</h3>
                <button type="button" class="remove-question" title="Удалить вопрос">×</button>
            </div>
            
            <div class="form-group">
                <label>Вопрос/Описание</label>
                <textarea class="question-text" rows="3" required 
                    placeholder="Опишите ваш вопрос"></textarea>
            </div>

            <div class="form-group">
                <label>Правильный ответ</label>
                <input type="text" class="correct-answer" required
                    placeholder="Укажите правильный ответ">
            </div>

            <div class="form-group">
                <label>Варианты ответов</label>
                <textarea class="other-answers" rows="3" required
                    placeholder="Укажите другие варианты ответов (по одному в строке)"></textarea>
            </div>

            <div class="form-group">
                <label>Ссылка на медиафайл (если есть)</label>
                <input type="url" class="media-link"
                    placeholder="Ссылка на изображение/аудио">
            </div>
        `;
        
        return questionBlock;
    }

    // Добавление нового вопроса
    addQuestionBtn.addEventListener('click', () => {
        const questionNumber = questionsContainer.children.length + 1;
        const newQuestion = createQuestionBlock(questionNumber);
        questionsContainer.appendChild(newQuestion);
    });

    // Удаление вопроса
    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-question')) {
            const questionBlock = e.target.closest('.question-block');
            if (questionsContainer.children.length > 1) {
                questionBlock.remove();
                // Обновляем нумерацию
                Array.from(questionsContainer.children).forEach((block, index) => {
                    block.dataset.question = index + 1;
                    block.querySelector('h3').textContent = `Вопрос ${index + 1}`;
                });
            } else {
                alert('Должен остаться хотя бы один вопрос!');
            }
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            testType: document.getElementById('testType').value,
            testTitle: document.getElementById('testTitle').value,
            authorType: document.querySelector('input[name="authorType"]:checked').value,
            // Если пользователь выбрал указать имя, берем его из заголовка
            authorName: document.querySelector('input[name="authorType"]:checked').value === 'withName' 
                ? document.querySelector('.header .title').textContent 
                : null,
            questions: Array.from(questionsContainer.children).map(questionBlock => ({
                questionText: questionBlock.querySelector('.question-text').value,
                correctAnswer: questionBlock.querySelector('.correct-answer').value,
                otherAnswers: questionBlock.querySelector('.other-answers').value
                    .split('\n')
                    .filter(answer => answer.trim()),
                mediaLink: questionBlock.querySelector('.media-link').value
            })),
            comment: document.getElementById('comment').value
        };

        try {
            // Здесь будет отправка данных на сервер
            console.log('Отправка данных:', formData);
            
            // Временно просто показываем уведомление
            alert('Спасибо за ваше предложение! Мы рассмотрим его в ближайшее время.');
            form.reset();
            
            // Оставляем только один вопрос
            while (questionsContainer.children.length > 1) {
                questionsContainer.lastChild.remove();
            }
            
            // Возвращаем радио-кнопку в состояние "Анонимно"
            document.querySelector('input[name="authorType"][value="anonymous"]').checked = true;
            
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        }
    });
});
