document.addEventListener('DOMContentLoaded', () => {
    // Запуск теста
    if (typeof showQuestion === 'function') {
        showQuestion();
    }

    // Обработчик для аудио (останавливает другие аудио при воспроизведении нового)
    document.addEventListener('play', function(e) {
        if (e.target.tagName === 'AUDIO') {
            const audios = document.getElementsByTagName('audio');
            for(let audio of audios) {
                if(audio !== e.target) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        }
    }, true);

    // Обработка ошибок
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Ошибка:', {
            message: msg,
            url: url,
            line: lineNo,
            column: columnNo,
            error: error
        });
        return false;
    };
});
