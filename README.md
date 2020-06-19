# Ionic 4 Notepad

Notepad based on Ionic 4 + Capacitor.

## Installation
```bash
npm install
npx cap init

```
If the iOS/Android platforms have not been created, run the following command:

```bash
npx cap add android
npx cap add ios
```

## Android
```bash
ionic build
npx cap copy android
npx cap open android //opening in Android Studio
```

## iOS
```bash
ionic build
npx cap copy ios
npx cap open ios//opening in XCode
```
