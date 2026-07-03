// PWA Installation and Service Worker Management

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.installBtn = document.getElementById('installBtn');
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.checkAppRunningMode();
  }

  /**
   * Register Service Worker
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  /**
   * Setup Install Prompt
   */
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      
      // Show install button
      if (this.installBtn) {
        this.installBtn.style.display = 'block';
        this.installBtn.addEventListener('click', () => this.promptInstall());
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      if (this.installBtn) {
        this.installBtn.style.display = 'none';
      }
      showToast('✅ App installed successfully!');
    });
  }

  /**
   * Prompt Installation
   */
  async promptInstall() {
    if (!this.deferredPrompt) {
      showToast('App is already installed or not available');
      return;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    this.deferredPrompt = null;
  }

  /**
   * Check if app is running as PWA
   */
  checkAppRunningMode() {
    let isRunningAsPWA = false;

    // Check for different PWA running modes
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isRunningAsPWA = true;
      console.log('App is running in standalone mode');
    }

    if (navigator.standalone === true) {
      isRunningAsPWA = true;
      console.log('App is running as iOS PWA');
    }

    // Hide install button if already installed
    if (isRunningAsPWA && this.installBtn) {
      this.installBtn.style.display = 'none';
    }

    return isRunningAsPWA;
  }
}

// Initialize PWA Manager
let pwaManager = null;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    pwaManager = new PWAManager();
  });
} else {
  pwaManager = new PWAManager();
}