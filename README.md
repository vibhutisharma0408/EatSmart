## 🧭 Introduction

**EatSmart** is a smart nutrition and wellness tracking platform designed to help users make healthier food choices.  
It combines **AI assistance**, **personalized analytics**, and **meal tracking** to help users maintain a balanced lifestyle.  

This app solves the problem of inconsistent meal planning and lack of nutritional awareness by offering:
- 🧠 AI-powered meal suggestions  
- 🥗 Nutrition tracking and analysis  
- 📊 Personalized health insights  

---

## 🧩 Project Type

**Fullstack (React + Firebase)**

---

## 🌐 Deployed App

- **Frontend:** [https://eatsmart.web.app](https://eatsmart.web.app)  
- **Backend:** Firebase Authentication + Firestore Database  
- **Database:** Cloud Firestore (NoSQL)

---

## 📁 Directory Structure
 EatSmart/
 
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ Dashboard.jsx
│ │ │ ├─ NutritionTracker.jsx
│ │ │ ├─ MealPlanner.jsx
│ │ │ ├─ HealthInsights.jsx
│ │ │ └── AIAssistant.jsx
│ │ ├─ contexts/AuthContext.jsx
│ │ ├─ firebase/
│ │ │ ├─ auth.js
│ │ │ ├─ nutrition.js
│ │ │ └── config.js
│ │ └─ App.jsx
│ └─ index.html
└─ README.md                                                                                                                                                                                                                ## ✨ Features

- 🔐 **Firebase Authentication (Email/Password)**
- 🥗 **Food & Nutrition Tracking**
- 📅 **AI-Powered Meal Planning**
- 📊 **Health Insights & Analytics Dashboard**
- 🤖 **AI Assistant for Nutrition Advice**
- 👤 **Profile with BMI, BMR & TDEE Calculations**
- 💾 **Data persistence via Firestore + LocalStorage**
- 🌙 **Responsive UI with Dark Mode Support**

---

## 🧠 Design Decisions & Assumptions

- Chose **Firebase** for scalability and built-in authentication.
- Used **Firestore** for real-time data and easy document structure.
- Applied **React Context API** for global state instead of Redux (lightweight and easy to maintain).
- Kept AI features modular — can integrate external AI APIs later (e.g., OpenAI, Spoonacular).
- UI built with **Tailwind CSS** and **Framer Motion** for smooth UX.

---

## ⚙️️ Installation & Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- Firebase Project (Firestore + Authentication enabled)

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd EatSmart

# Install dependencies
npm install

# Configure Firebase
# → update src/firebase/config.js with your Firebase keys

# Run the development server
npm run dev
Build for Production
bash
Copy code
npm run build
npm run preview
🧪 Usage
bash
Copy code
# Example user flow:
1. Sign up or log in using email/password.
2. Add your profile details (age, height, weight, goals).
3. Use “AI Assistant” to generate a meal plan.
4. Track daily nutrition under “Nutrition Tracker”.
5. View insights and progress in the Dashboard.
Include screenshots of key pages for better understanding (Dashboard, Tracker, etc.)

🔐 Demo Credentials
Role	Email	Password
Demo User	demo@eatsmart.com	123456

🌍 APIs Used
Firebase Authentication API

Firestore Database API

(Optional) Nutrition/Meal APIs (e.g., Edamam, Spoonacular) for AI meal suggestions

🧾 API Endpoints (Firestore Structure)
Method	Endpoint	Description
GET	/meals/{userId}	Fetch all meals for a user
POST	/meals	Add a new meal entry
DELETE	/meals/{id}	Delete a meal entry
PATCH	/users/{id}	Update user profile or goals

🧰 Technology Stack
Layer	Technologies
Frontend	React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons
Backend	Firebase Authentication, Firestore Database, Firebase Hosting
State Management	React Context API, Local Storage
Utilities	React Hot Toast (Notifications)

🚀 Deployment
Firebase Hosting
bash
Copy code
npm run build
firebase deploy
Vercel (Alternative)
bash
Copy code
vercel
💬 Acknowledgments
Thanks to Firebase, React, and Tailwind communities for their open-source support and documentation.

👨‍💻 Author
Developed by: Vibhuti sharma
Role: Engineering | Fullstack Developer


⭐ If you like this project, consider giving it a star on GitHub! ⭐

