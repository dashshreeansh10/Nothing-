// Notification Management

class NotificationManager {
  constructor() {
    this.notificationBtn = document.getElementById('notificationBtn');
    this.dailyNotificationCheckbox = document.getElementById('dailyNotification');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkNotificationStatus();
    this.scheduleNotifications();
  }

  setupEventListeners() {
    if (this.notificationBtn) {
      this.notificationBtn.addEventListener('click', () => this.toggleNotifications());
    }
    
    if (this.dailyNotificationCheckbox) {
      this.dailyNotificationCheckbox.addEventListener('change', () => this.handleSettingChange());
    }
  }

  async toggleNotifications() {
    const hasPermission = await requestNotificationPermission();
    
    if (hasPermission) {
      this.notificationBtn.classList.add('active');
      showToast('✅ Notifications enabled!');
      this.sendTestNotification();
    } else {
      this.notificationBtn.classList.remove('active');
      showToast('❌ Notification permission denied');
    }
  }

  checkNotificationStatus() {
    if (checkNotificationPermission()) {
      this.notificationBtn.classList.add('active');
    }
  }

  async sendTestNotification() {
    if (!checkNotificationPermission()) return;
    
    const quote = getRandomQuote();
    const daysPassed = calculateDaysPassed(CONFIG.START_DATE);
    const totalDays = calculateDaysBetween(CONFIG.START_DATE, CONFIG.END_DATE);
    const daysRemaining = totalDays - daysPassed;
    
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification('Daily Motivation! 🌟', {
          body: quote.text,
          icon: 'assets/icons/icon-192x192.png',
          badge: 'assets/icons/icon-96x96.png',
          tag: 'countdown-daily',
          requireInteraction: false,
          data: {
            daysPassed,
            daysRemaining,
            totalDays
          }
        });
      } else if ('Notification' in window) {
        new Notification('Daily Motivation! 🌟', {
          body: quote.text,
          icon: 'assets/icons/icon-192x192.png',
          tag: 'countdown-daily'
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  scheduleNotifications() {
    // Check every minute if we need to send a notification
    setInterval(() => this.checkAndSendNotification(), 60000);
    
    // Also check on page load
    this.checkAndSendNotification();
  }

  checkAndSendNotification() {
    const isEnabled = this.dailyNotificationCheckbox?.checked !== false;
    if (!isEnabled || !checkNotificationPermission()) return;
    
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Check if it's time to send notification
    if (hour === CONFIG.NOTIFICATION_HOUR && minute === CONFIG.NOTIFICATION_MINUTE) {
      const lastNotificationDate = getFromStorage(CONFIG.STORAGE_KEYS.LAST_NOTIFICATION);
      const today = new Date().toDateString();
      
      if (lastNotificationDate !== today) {
        this.sendTestNotification();
        saveToStorage(CONFIG.STORAGE_KEYS.LAST_NOTIFICATION, today);
      }
    }
  }

  handleSettingChange() {
    const isEnabled = this.dailyNotificationCheckbox.checked;
    saveToStorage(CONFIG.STORAGE_KEYS.SETTINGS, { dailyNotification: isEnabled });
    
    if (isEnabled && !checkNotificationPermission()) {
      this.toggleNotifications();
    } else {
      showToast(isEnabled ? '🔔 Daily notifications enabled' : '🔕 Daily notifications disabled');
    }
  }
}

// Initialize notification manager
let notificationManager = null;
document.addEventListener('DOMContentLoaded', () => {
  notificationManager = new NotificationManager();
});