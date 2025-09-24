# 📱 Smart Rental Tracking System – Mobile App (Expo + React Native)

> Companion mobile application for the **Caterpillar Digital Hackathon-winning solution** 🏆. This app empowers clients to interact seamlessly with the Smart Rental Tracking System by scanning machines, tracking utilization, and receiving alerts.

---

## 📌 Overview

The mobile app acts as the **client-facing interface**, complementing the [Dealer Web Dashboard (Frontend)](https://github.com/Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-WebPage-Nextjs) and [Backend Services](https://github.com/Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-Backend-Node).

It delivers **on-site functionality** for operators and clients to:

* Scan equipment via QR codes.
* Monitor real-time usage.
* Log operational history.
* Receive maintenance & overdue alerts.

---

## 🛠️ Tech Stack

* [React Native](https://reactnative.dev/) – Core framework
* [Expo](https://expo.dev/) – Development & deployment
* [TypeScript](https://www.typescriptlang.org/) – Static typing
* [Zustand](https://github.com/pmndrs/zustand) – Lightweight state management
* [React Query](https://tanstack.com/query/v3/) – Server-state synchronization
* [React Navigation](https://reactnavigation.org/) – Navigation & routing
* [NativeWind](https://www.nativewind.dev/) – Utility-first styling
* [Async Storage](https://react-native-async-storage.github.io/async-storage/) – Local data persistence
* [React Native Web](https://necolas.github.io/react-native-web/) – Web compatibility

---

## 🚀 Features

* 🔍 **QR Scanner** – Scan machine QR codes for instant access to details & maintenance history.
* ⏱️ **Utilization Tracking** – Monitor operational vs idle hours.
* 📑 **Usage Logging** – Track and view equipment usage history.
* ⏰ **Overdue Alerts** – Notifications for overdue returns or maintenance.

---

## 📂 Folder Structure

```
expo-app/
├── app/                 # Main app code (screens, navigation, expo-router)
├── assets/
│   └── images/          # Image and media assets
├── hooks/               # Custom React hooks
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
├── app.json             # Expo configuration
├── bun.lock             # Bun package manager lock file
├── package-lock.json    # npm lock file
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

---

## ⚡ Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-org/equitrack-cat-hackathon-mobile-expo.git
cd equitrack-cat-hackathon-mobile-expo
```

### 2. Install Dependencies

```bash
npm install
```

*or if using Bun:*

```bash
bun install
```

### 3. Run App

```bash
npx expo start
```

Scan the QR code with the **Expo Go app** (iOS/Android) to test on your device.

---

## 🔗 Related Repositories

* 🌐 [Frontend Web Dashboard (Next.js)](https://github.com/Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-WebPage-Nextjs)
* ⚙️ [Backend Services (Node.js + FastAPI)](https://github.com/Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-Backend-Node)

---

## 🙌 Acknowledgements

* Built during the **Caterpillar Digital Hackathon** 🏆
* Mobile app developed for **operators & clients** to enable real-time equipment insights
* Thanks to the hackathon team, mentors, and judges for their guidance.

---

## Contributors

<a href="https://github.com/Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-Mobile-Expo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Krishnanshu-Khanna/EquiTrack-CAT-Hackathon-Mobile-Expo" />
</a>
