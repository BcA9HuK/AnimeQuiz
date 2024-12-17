const AchievementsManager = {
    ACHIEVEMENTS: {
        FIRST_STEPS: {
            id: 'first_steps',
            title: 'Первые шаги',
            description: 'Пройдите любой тест',
            icon: '🎯'
        },
        ANIME_EXPERT: {
            id: 'anime_expert',
            title: 'Знаток аниме',
            description: 'Пройдите все тесты',
            icon: '🏆'
        },
        PERFECT_SCORE: {
            id: 'perfect_score',
            title: 'Идеальный результат',
            description: 'Получите 100% в любом тесте',
            icon: '⭐'
        },
        HIGH_SCORE: {
            id: 'high_score',
            title: 'Высокий результат',
            description: 'Получите более 80% в любом тесте',
            icon: '✨'
        }
    },

    checkAchievements(testId, score, totalQuestions) {
        // Проверка на первое прохождение теста
        this.grantAchievement('FIRST_STEPS');

        // Проверка на идеальное прохождение
        if (score === totalQuestions) {
            this.grantAchievement('PERFECT_SCORE');
        }

        // Проверка на высокий результат (более 80%)
        if (score >= totalQuestions * 0.8) {
            this.grantAchievement('HIGH_SCORE');
        }

        // Проверка на прохождение всех тестов
        const testsProgress = UserManager.getTestsProgress();
        const uniqueTestsCompleted = Object.keys(testsProgress).length;
        if (uniqueTestsCompleted >= 5) {
            this.grantAchievement('ANIME_EXPERT');
        }
    },

    grantAchievement(achievementKey) {
        const achievement = this.ACHIEVEMENTS[achievementKey];
        if (!achievement) return;

        const userAchievements = UserManager.getAchievements();
        if (!userAchievements.includes(achievement.id)) {
            userAchievements.push(achievement.id);
            UserManager.setAchievements(userAchievements);
            this.showAchievementNotification(achievement);
        }
    },

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h3>Новое достижение!</h3>
                <p>${achievement.title}</p>
                <p>${achievement.description}</p>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    getAchievementInfo(achievementId) {
        return Object.values(this.ACHIEVEMENTS).find(a => a.id === achievementId);
    },

    renderAchievements(container) {
        const userAchievements = UserManager.getAchievements();
        const allAchievements = Object.values(this.ACHIEVEMENTS);
        
        const achievementsHTML = allAchievements.map(achievement => {
            const isUnlocked = userAchievements.includes(achievement.id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-title">${achievement.title}</div>
                        <div class="achievement-description">${achievement.description}</div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = achievementsHTML;
    }
}; 