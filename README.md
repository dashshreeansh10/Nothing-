# Countdown Calendar PWA

## Overview
A Progressive Web App (PWA) that displays a daily countdown calendar from **01 JAN 2026** to **01 MAY 2027** with:
- ✅ Daily motivational quotes
- 🔔 Push notifications at 9:00 AM daily
- 📱 Install as native app on any device
- 🌙 Dark mode support
- 📊 Progress tracking
- 📅 Interactive calendar
- ⚙️ Customizable settings
- 💾 Offline support

## Features

### 1. Daily Countdown
- Track days passed and remaining
- Real-time progress bar
- Interactive calendar navigation
- Click any date to see its motivational quote

### 2. Notifications
- Daily motivation at 9:00 AM
- Desktop and mobile notifications
- Sound and vibration support
- Customizable notification settings

### 3. PWA Installation
- Works offline
- Install button for easy app installation
- Standalone fullscreen mode
- App shortcuts for quick access

### 4. Personalization
- Dark/Light mode toggle
- Sound preferences
- Notification preferences
- Local data persistence

### 5. Statistics
- Total days in countdown
- Progress percentage
- Current month tracking
- Journey statistics

## Installation

### Web Browser
1. Visit the app URL in your browser
2. Look for the "Install App" button in the header
3. Click to install as PWA
4. App will appear on your home screen

### Android (APK)
1. Use PWA builders like:
   - **PWABuilder** (https://www.pwabuilder.com/)
   - **BubbleWrap** (https://github.com/GoogleChromeLabs/bubblewrap)
   - **Paw** (https://paw.cloud/)

2. Steps:
   ```bash
   npm install -g @pwabuilder/cli
   pwabuilder path/to/your/app
   ```

### iOS
1. Open Safari and navigate to the PWA URL
2. Tap Share → Add to Home Screen
3. App installs to home screen

## File Structure

```
.
├── index.html                 # Main HTML file
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── browserconfig.xml          # Windows tiles config
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Bot instructions
├── README.md                 # This file
├── BUILD.md                  # Build instructions
├── css/
│   └── styles.css            # All styling
├── js/
│   ├── config.js             # Configuration & quotes
│   ├── utils.js              # Utility functions
│   ├── calendar.js           # Calendar logic
│   ├── notifications.js      # Notification management
│   ├── pwa.js                # PWA installation
│   └── app.js                # Main app logic
└── assets/
    └── icons/                # App icons (required)
```

## Required Icons

Create the following icons in `assets/icons/` directory:

### Standard Icons (any purpose)
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Maskable Icons (for adaptive icons)
- `icon-maskable-192x192.png`
- `icon-maskable-512x512.png`

### Screenshots (for app store)
- `screenshot-540x720.png` (narrow form factor)
- `screenshot-1280x720.png` (wide form factor)

### Shortcuts
- `shortcut-calendar-192x192.png`
- `shortcut-quote-192x192.png`

### Windows
- `icon-70x70.png`
- `icon-150x150.png`
- `icon-310x310.png`

### Apple
- `apple-touch-icon.png` (180x180)

## Creating Icons

Use online tools:
1. **RealFaviconGenerator** (https://realfavicongenerator.net/)
2. **PWA Image Generator** (https://www.pwabuilder.com/imageGenerator)
3. **App Icon Generator** (https://www.appicon.co/)

## Configuration

Edit `js/config.js` to customize:

```javascript
const CONFIG = {
  START_DATE: new Date(2026, 0, 1),  // Start date
  END_DATE: new Date(2027, 4, 1),    // End date
  NOTIFICATION_HOUR: 9,               // Notification time
  NOTIFICATION_MINUTE: 0,
  QUOTES: [...]                        // Add your quotes
};
```

## Building APK for Android

### Using PWABuilder

1. Go to https://www.pwabuilder.com/
2. Enter your PWA URL
3. Click "Build My PWA"
4. Download APK file
5. Install on Android device

### Using BubbleWrap

```bash
# Install BubbleWrap
npm install -g @bubblewrap/cli

# Initialize project
bubblewrap init --manifest https://yourdomain.com/manifest.json

# Build APK
bubblewrap build
```

### Using Paw

1. Visit https://paw.cloud/
2. Enter manifest URL
3. Download and install APK

## Service Worker

The app includes a Service Worker (`sw.js`) that enables:
- Offline functionality
- Background sync
- Push notifications
- Asset caching

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| PWA Installation | ✅ | ⚠️ | ❌ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ⚠️ | ✅ |
| Offline | ✅ | ✅ | ✅ | ✅ |
| Dark Mode | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Install button not showing
- Check HTTPS is enabled
- Verify manifest.json is valid
- Check browser console for errors
- Ensure valid icons exist

### Notifications not working
- Request notification permission
- Check browser notification settings
- Verify Service Worker is registered
- Check time is set to 9:00 AM

### Icons not loading
- Verify icon paths in manifest.json
- Check icons exist in assets/icons/
- Ensure correct file formats (PNG)
- Check file permissions

### APK build fails
- Validate manifest.json (https://www.pwabuilder.com/validate)
- Ensure all required fields present
- Check HTTPS is enabled
- Verify icons meet requirements

## Performance Tips

1. **Optimize Images**: Use WebP format for smaller file sizes
2. **Minify CSS/JS**: Use build tools like Webpack
3. **Lazy Loading**: Load non-critical assets on demand
4. **Caching Strategy**: Configure SW cache policy in sw.js
5. **Code Splitting**: Separate modules for faster loading

## Security

- ✅ HTTPS required for PWA
- ✅ Content Security Policy configured
- ✅ No external dependencies needed
- ✅ Local storage for user preferences
- ✅ No API keys stored locally

## Updates

Service Worker automatically checks for updates:
- Checks every 60 seconds
- Updates in background
- Shows notification on app launch

## Support

For issues:
1. Check browser console (F12)
2. Verify all files are deployed
3. Clear cache and reload
4. Check manifest.json validity
5. Review PWABuilder validation

## License

MIT License - Feel free to use and modify

## Credits

Built with ❤️ for daily motivation and accountability

---

**Last Updated**: July 3, 2026
**Version**: 1.0.0