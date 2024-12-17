const ProfileManager = {
    init() {
        this.updateProfile();
        this.updateStatistics();
        AchievementsManager.renderAchievements(document.querySelector('.achievements-container'));
    },

    updateProfile() {
        const username = document.querySelector('.username');
        const status = document.querySelector('.user-status');
        const avatarImg = document.querySelector('.avatar img');
        
        if (username) {
            username.textContent = UserManager.getUsername();
        }
        if (status) {
            const userStatus = UserManager.getStatus();
            status.textContent = userStatus || 'Статус не установлен';
        }
        if (avatarImg) {
            const defaultAvatar = '../media/default-avatar.png';
            const currentAvatar = UserManager.getAvatar();
            avatarImg.src = currentAvatar || defaultAvatar;
            avatarImg.onerror = function() {
                this.src = defaultAvatar; // Если основное изображение не загрузилось
            };
        }
        UserManager.updatePointsDisplay();
    },

    updateStatistics() {
        const stats = UserManager.getStatistics();
        const achievements = UserManager.getAchievements();
        
        const completedTests = document.querySelector('.completed-tests');
        const achievementsCount = document.querySelector('.achievements-count');
        
        if (completedTests) {
            completedTests.textContent = stats.testsCompleted;
        }
        if (achievementsCount) {
            achievementsCount.textContent = achievements.length;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ProfileManager.init();
}); 