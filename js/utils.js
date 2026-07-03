// Utility Functions

/**
 * Calculate days between two dates
 */
function calculateDaysBetween(startDate, endDate) {
  const milliseconds = Math.abs(endDate - startDate);
  return Math.floor(milliseconds / (1000 * 60 * 60 * 24));
}

/**
 * Calculate days passed since start date
 */
function calculateDaysPassed(startDate, currentDate = new Date()) {
  const adjustedStart = new Date(startDate);
  adjustedStart.setHours(0, 0, 0, 0);
  const adjustedCurrent = new Date(currentDate);
  adjustedCurrent.setHours(0, 0, 0, 0);
  return Math.floor((adjustedCurrent - adjustedStart) / (1000 * 60 * 60 * 24));
}

/**
 * Format date to readable string
 */
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Get random quote from CONFIG.QUOTES
 */
function getRandomQuote() {
  return CONFIG.QUOTES[Math.floor(Math.random() * CONFIG.QUOTES.length)];
}

/**
 * Get quote based on day number
 */
function getQuoteForDay(dayNumber) {
  return CONFIG.QUOTES[dayNumber % CONFIG.QUOTES.length];
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

/**
 * Save to local storage
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
}

/**
 * Get from local storage
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error getting from storage:', error);
    return defaultValue;
  }
}

/**
 * Check if date is within countdown period
 */
function isDateInCountdownPeriod(date) {
  return date >= CONFIG.START_DATE && date <= CONFIG.END_DATE;
}

/**
 * Check if today is within countdown period
 */
function isCountdownActive() {
  const today = new Date();
  return isDateInCountdownPeriod(today);
}

/**
 * Get progress percentage
 */
function getProgressPercentage() {
  if (!isCountdownActive()) return 0;
  
  const totalDays = calculateDaysBetween(CONFIG.START_DATE, CONFIG.END_DATE);
  const daysPassed = calculateDaysPassed(CONFIG.START_DATE);
  return Math.round((daysPassed / totalDays) * 100);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if notification permission is granted
 */
function checkNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notifications');
    return false;
  }
  return Notification.permission === 'granted';
}

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('Your browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

/**
 * Format large numbers with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get current month name
 */
function getCurrentMonthName() {
  return MONTHS[new Date().getMonth()];
}

/**
 * Validate email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}