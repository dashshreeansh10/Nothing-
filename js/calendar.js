// Calendar Management

class CountdownCalendar {
  constructor() {
    this.currentMonth = new Date(CONFIG.START_DATE);
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousMonth());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextMonth());
  }

  previousMonth() {
    const prevDate = new Date(this.currentMonth);
    prevDate.setMonth(prevDate.getMonth() - 1);
    
    if (prevDate >= CONFIG.START_DATE) {
      this.currentMonth = prevDate;
      this.render();
    }
  }

  nextMonth() {
    const nextDate = new Date(this.currentMonth);
    nextDate.setMonth(nextDate.getMonth() + 1);
    
    if (nextDate <= CONFIG.END_DATE) {
      this.currentMonth = nextDate;
      this.render();
    }
  }

  render() {
    this.updateMonthDisplay();
    this.renderCalendarGrid();
  }

  updateMonthDisplay() {
    const monthElement = document.getElementById('currentMonth');
    if (monthElement) {
      const monthName = MONTHS[this.currentMonth.getMonth()];
      const year = this.currentMonth.getFullYear();
      monthElement.textContent = `${monthName} ${year}`;
    }
  }

  renderCalendarGrid() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Add day headers
    DAYS.forEach(day => {
      const header = document.createElement('div');
      header.className = 'day-header';
      header.textContent = day;
      grid.appendChild(header);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const cell = document.createElement('div');
      cell.className = 'day-cell disabled';
      grid.appendChild(cell);
    }
    
    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.textContent = day;
      
      // Check if date is outside countdown period
      if (!isDateInCountdownPeriod(date)) {
        cell.classList.add('disabled');
      } else if (date.toDateString() === today.toDateString()) {
        cell.classList.add('today');
      } else if (date < today) {
        cell.classList.add('passed');
      }
      
      cell.addEventListener('click', () => this.handleDateClick(date));
      grid.appendChild(cell);
    }
  }

  handleDateClick(date) {
    const daysPassed = calculateDaysPassed(CONFIG.START_DATE, date);
    const totalDays = calculateDaysBetween(CONFIG.START_DATE, CONFIG.END_DATE);
    const daysRemaining = totalDays - daysPassed;
    const quote = getQuoteForDay(daysPassed);
    
    showToast(`Day ${daysPassed + 1}: ${quote.text}`);
  }
}

// Initialize calendar when DOM is ready
let calendar = null;
document.addEventListener('DOMContentLoaded', () => {
  calendar = new CountdownCalendar();
});