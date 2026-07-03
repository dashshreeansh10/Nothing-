// Main App Logic

class CountdownApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateUI();
    this.setupAutoRefresh();
    this.restoreSettings();
    this.handleMissingIcons();
  }

  setupEventListeners() {
    const clearDataBtn = document.getElementById('clearDataBtn');
    const darkModeCheckbox = document.getElementById('darkMode');
    const soundCheckbox = document.getElementById('soundEnabled');
    
    if (clearDataBtn) {
      clearDataBtn.addEventListener('click', () => this.clearAllData());
    }
    
    if (darkModeCheckbox) {
      darkModeCheckbox.addEventListener('change', () => this.toggleDarkMode());
    }
    
    if (soundCheckbox) {
      soundCheckbox.addEventListener('change', () => this.saveSetting('soundEnabled'));
    }
    
    // Handle page visibility
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }

  updateUI() {
    this.updateDate();
    this.updateProgress();
    this.updateStatistics();
    this.updateQuote();
  }

  updateDate() {
    const todayDate = document.getElementById('todayDate');
    const daysPassed = document.getElementById('daysPassed');
    const daysRemaining = document.getElementById('daysRemaining');
    
    if (!isCountdownActive()) {
      if (todayDate) todayDate.textContent = 'Countdown has ended';
      if (daysPassed) daysPassed.textContent = '0';
      if (daysRemaining) daysRemaining.textContent = '0';
      return;
    }
    
    const today = new Date();
    const totalDays = calculateDaysBetween(CONFIG.START_DATE, CONFIG.END_DATE);
    const passed = calculateDaysPassed(CONFIG.START_DATE, today);
    const remaining = totalDays - passed;
    
    if (todayDate) todayDate.textContent = formatDate(today);
    if (daysPassed) daysPassed.textContent = passed;
    if (daysRemaining) daysRemaining.textContent = remaining;
  }

  updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!isCountdownActive()) {
      if (progressFill) progressFill.style.width = '100%';
      if (progressText) progressText.textContent = 'Countdown completed!';
      return;
    }
    
    const percentage = getProgressPercentage();
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${percentage}% Complete`;
  }

  updateStatistics() {
    const totalDays = document.getElementById('totalDays');
    const progressPercent = document.getElementById('progressPercent');
    const currentMonthName = document.getElementById('currentMonthName');
    
    const total = calculateDaysBetween(CONFIG.START_DATE, CONFIG.END_DATE);
    const percentage = getProgressPercentage();
    const monthName = getCurrentMonthName();
    
    if (totalDays) totalDays.textContent = total;
    if (progressPercent) progressPercent.textContent = `${percentage}%`;
    if (currentMonthName) currentMonthName.textContent = monthName;
  }

  updateQuote() {
    const quoteElement = document.getElementById('dailyQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    const daysPassed = calculateDaysPassed(CONFIG.START_DATE);
    const quote = getQuoteForDay(daysPassed);
    
    if (quoteElement) quoteElement.textContent = `"${quote.text}"`;
    if (authorElement) authorElement.textContent = `- ${quote.author}`;
  }

  setupAutoRefresh() {
    // Update UI every hour or when day changes
    setInterval(() => {
      this.updateUI();
    }, 3600000); // 1 hour
    
    // Also refresh at midnight
    const now = new Date();
    const tonight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let msUntilMidnight = tonight - now;
    
    setTimeout(() => {
      this.updateUI();
      // Then refresh every 24 hours
      setInterval(() => this.updateUI(), 86400000);
    }, msUntilMidnight);
  }

  clearAllData() {
    if (confirm('Are you sure you want to clear all app data? This cannot be undone.')) {
      localStorage.clear();
      sessionStorage.clear();
      showToast('✅ All data cleared');
      location.reload();
    }
  }

  toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    saveToStorage('darkMode', isDarkMode);
    showToast(isDarkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
  }

  restoreSettings() {
    // Restore dark mode setting
    const darkModeEnabled = getFromStorage('darkMode', false);
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
      if (darkModeCheckbox) darkModeCheckbox.checked = true;
    }
    
    // Restore other settings
    const settings = getFromStorage(CONFIG.STORAGE_KEYS.SETTINGS, {});
    const dailyNotificationCheckbox = document.getElementById('dailyNotification');
    const soundCheckbox = document.getElementById('soundEnabled');
    
    if (dailyNotificationCheckbox && settings.dailyNotification !== undefined) {
      dailyNotificationCheckbox.checked = settings.dailyNotification;
    }
    
    if (soundCheckbox && settings.soundEnabled !== undefined) {
      soundCheckbox.checked = settings.soundEnabled;
    }
  }

  saveSetting(settingName) {
    const checkbox = document.getElementById(settingName);
    if (checkbox) {
      const settings = getFromStorage(CONFIG.STORAGE_KEYS.SETTINGS, {});
      settings[settingName] = checkbox.checked;
      saveToStorage(CONFIG.STORAGE_KEYS.SETTINGS, settings);
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      console.log('App hidden');
    } else {
      console.log('App visible - refreshing UI');
      this.updateUI();
    }
  }

  handleMissingIcons() {
    // Create placeholder for missing icons
    const icons = document.querySelectorAll('img[src*="assets/icons"]');
    icons.forEach(icon => {
      icon.addEventListener('error', () => {
        console.warn('Icon not found:', icon.src);
      });
    });
  }
}

// Initialize app when DOM is ready
let app = null;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new CountdownApp();
  });
} else {
  app = new CountdownApp();
}