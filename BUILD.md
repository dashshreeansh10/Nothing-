# Countdown Calendar PWA - Build Instructions

## Prerequisites
- Node.js and npm installed
- HTTPS certificate (for local testing)
- PWABuilder CLI or similar tool

## Local Development

### 1. Start Local HTTPS Server

```bash
# Using http-server with HTTPS
npm install -g http-server
http-server . -p 5000 -S -C cert.pem -K key.pem
```

### 2. Test in Browser
- Open https://localhost:5000
- Check install button appears
- Test notifications
- Verify offline functionality

## Building APK

### Option 1: Using PWABuilder (Easiest)

1. Go to https://www.pwabuilder.com/
2. Enter app URL: https://yourdomain.com
3. Click "Build My PWA"
4. Select "Android"
5. Download APK
6. Install on device or emulator

### Option 2: Using BubbleWrap

```bash
# Install BubbleWrap
npm install -g @bubblewrap/cli

# Create signing key (first time only)
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Initialize
bubblewrap init --manifest https://yourdomain.com/manifest.json

# Build
bubblewrap build --release
```

### Option 3: Using Paw

1. Visit https://paw.cloud/
2. Sign in with GitHub
3. Enter manifest URL
4. Select signing options
5. Download APK

## Deployment

### Hosting Requirements
- HTTPS enabled (required for PWA)
- Valid SSL certificate
- MIME type: application/manifest+json for manifest.json
- CORS properly configured

### Popular Hosts

#### Netlify
```bash
npm run build
netlify deploy
```

#### Vercel
```bash
vercel deploy
```

#### GitHub Pages
```bash
git add .
git commit -m "Update"
git push
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## Validation

### Check PWA Compliance

1. **PWABuilder Validation**
   - https://www.pwabuilder.com/validate
   - Paste your manifest.json or app URL
   - Fix any warnings

2. **Chrome DevTools Audit**
   - Press F12 → Lighthouse
   - Click "Generate Report"
   - Check PWA score

3. **Manifest Validator**
   - https://manifest-validator.appspot.com/

### Required Checklist
- ✅ HTTPS enabled
- ✅ manifest.json valid and complete
- ✅ Service Worker registered
- ✅ Icons present (all sizes)
- ✅ Start URL accessible
- ✅ Display mode set to "standalone"
- ✅ Theme color defined
- ✅ Background color defined

## Troubleshooting Build Issues

### APK won't install
- Check Android version compatibility
- Verify signing certificate
- Try on different device/emulator
- Check device storage space

### App crashes on launch
- Check console errors (adb logcat)
- Verify manifest.json syntax
- Ensure all assets load correctly
- Check service worker registration

### Installation fails in PWABuilder
- Validate manifest.json
- Check HTTPS is working
- Verify domain certificate
- Try different browser

## Testing on Android

### Using Emulator
```bash
# Install Android Studio
# Create virtual device
# Run app in emulator
adb install app-release.apk
```

### Using Real Device
```bash
# Enable USB debugging
# Connect device via USB
adb install app-release.apk

# View logs
adb logcat
```

## Performance Optimization

### Minify Assets
```bash
# Install minifiers
npm install -g csso-cli terser

# Minify CSS
csso css/styles.css > css/styles.min.css

# Minify JS
terser js/app.js > js/app.min.js
```

### Reduce Icon Size
```bash
# Install imagemin
npm install -g imagemin-cli

# Compress images
imagemin assets/icons/* --out-dir=assets/icons/optimized
```

## Versioning

Update version in:
- `manifest.json` (increment version number in metadata comments)
- `js/config.js` (APP_VERSION)
- `package.json` (if using Node)

## Distribution

### Google Play Store
1. Create Google Play Developer account
2. Build APK with BubbleWrap
3. Upload to Play Store
4. Set pricing and distribution
5. Submit for review

### Microsoft Store
1. Create Microsoft developer account
2. Submit PWA via PWABuilder
3. Microsoft handles APK wrapping
4. Submit for review

### Direct Distribution
- Host APK on your website
- Share download link
- Users install via file manager

## Continuous Integration

### GitHub Actions Example
```yaml
name: Build PWA
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/build@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Support Files

- ✅ `index.html` - Main app
- ✅ `manifest.json` - PWA configuration
- ✅ `sw.js` - Service Worker
- ✅ `css/styles.css` - Styling
- ✅ `js/*.js` - App logic
- ✅ `browserconfig.xml` - Windows config
- ✅ `sitemap.xml` - SEO
- ✅ `robots.txt` - Bot config
- ✅ `README.md` - Documentation
- ✅ `assets/icons/` - App icons

---

For detailed PWA documentation, visit: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps