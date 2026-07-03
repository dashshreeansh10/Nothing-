// Configuration and Constants
const CONFIG = {
  APP_NAME: 'Countdown Calendar',
  APP_VERSION: '1.0.0',
  START_DATE: new Date(2026, 0, 1), // 01 JAN 2026
  END_DATE: new Date(2027, 4, 1),   // 01 MAY 2027
  NOTIFICATION_HOUR: 9,              // 9:00 AM
  NOTIFICATION_MINUTE: 0,
  STORAGE_KEYS: {
    SETTINGS: 'countdown_settings',
    LAST_NOTIFICATION: 'last_notification_date',
    USER_PREFERENCES: 'user_preferences'
  },
  QUOTES: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Dream bigger. Do bigger.", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "Little things make big days.", author: "Unknown" },
    { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
    { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
    { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
    { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { text: "Dream it. Believe it. Build it.", author: "Unknown" },
    { text: "Everything you want is on the other side of fear.", author: "George Addair" },
    { text: "Success is not how high you have climbed, but how you make people feel when you're down.", author: "Unknown" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Your potential is endless. Your power is now.", author: "Tony Robbins" }
  ]
};

// Months and Days for localization
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, MONTHS, DAYS };
}