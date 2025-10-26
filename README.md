
# 🍎 EatSmart – AI-Powered Nutrition & Wellness Platform

An AI-driven nutrition and wellness web app that helps users plan meals, track nutrition, and gain personalized health insights using Firebase and React.

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React
**Backend:** Firebase Authentication, Firestore Database, Firebase Security Rules
**State Management:** React Context, Local Storage
**Utilities:** React Hot Toast (Notifications)

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js 16+
* npm or yarn
* Firebase project (Authentication + Firestore enabled)

### Steps

```bash
# Clone repo
git clone <repository-url>
cd EatSmart

# Install dependencies
npm install

# Configure Firebase
# → update src/firebase/config.js with your Firebase keys

# Run development server
npm run dev
```

**Build for Production**

```bash
npm run build
npm run preview
```

---

## 🔑 Core Features

* 🔐 Firebase Authentication (Email/Password)
* 🥗 Food & Nutrition Tracking
* 📅 AI-Powered Meal Planning
* 📊 Health Insights & Analytics
* 🤖 AI Assistant for Nutrition Advice
* 👤 Profile with BMI, BMR & TDEE calculations

---

## 🧠 Data Structure

### `users`

```json
{
  "name": "string",
  "email": "string",
  "goals": "string",
  "age": "number",
  "weight": "number",
  "height": "number",
  "activityLevel": "string"
}
```

### `meals`

```json
{
  "userId": "string",
  "name": "string",
  "type": "string",
  "calories": "number",
  "protein": "number",
  "carbs": "number",
  "fat": "number",
  "date": "string"
}
```

---

## 🚀 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Vercel

```bash
vercel
```

---

## 📂 Folder Structure

```
src/
 ├── components/
 │   ├── Dashboard.jsx
 │   ├── NutritionTracker.jsx
 │   ├── MealPlanner.jsx
 │   ├── HealthInsights.jsx
 │   └── AIAssistant.jsx
 ├── contexts/AuthContext.jsx
 ├── firebase/
 │   ├── auth.js
 │   ├── nutrition.js
 │   └── config.js
 └── App.jsx
```
