# Firebase Setup Guide for EatSmart

## 🚀 Quick Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "EatSmart" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### 3. Create Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 4. Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Register app with name "EatSmart Web"
5. Copy the config object

### 5. Update Configuration

Replace the placeholder config in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
}
```

## 📁 Database Structure

### Collections

#### `users`
- Document ID: User UID
- Fields:
  - `name` (string)
  - `email` (string)
  - `age` (number)
  - `weight` (number)
  - `height` (number)
  - `activityLevel` (string)
  - `goals` (string)
  - `dietaryRestrictions` (array)
  - `nutritionGoals` (object)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

#### `meals`
- Document ID: Auto-generated
- Fields:
  - `userId` (string)
  - `name` (string)
  - `type` (string)
  - `calories` (number)
  - `protein` (number)
  - `carbs` (number)
  - `fat` (number)
  - `fiber` (number)
  - `date` (string - YYYY-MM-DD)
  - `time` (string)
  - `createdAt` (timestamp)

## 🔒 Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own meals
    match /meals/{mealId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🚀 Deployment

### For Competition Demo

1. **Firebase Hosting** (Optional):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   npm run build
   firebase deploy
   ```

2. **Environment Variables**:
   - For production, use environment variables
   - Create `.env.local` file:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```

## 🎯 Features Enabled

✅ **User Authentication** - Email/password login & registration
✅ **Real-time Data** - Live meal tracking and updates
✅ **User Profiles** - Personalized nutrition goals
✅ **Data Persistence** - All data saved to Firebase
✅ **Security** - User-specific data access
✅ **Scalability** - Can handle thousands of users

## 🔧 Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check your config in `src/firebase/config.js`
   - Ensure all required fields are present

2. **"Permission denied"**
   - Check Firestore security rules
   - Ensure user is authenticated

3. **"Network error"**
   - Check internet connection
   - Verify Firebase project is active

### Development Tips

- Use Firebase Emulator for local development
- Enable debug mode: `localStorage.setItem('debug', 'firebase:*')`
- Check Firebase Console for real-time logs

## 📊 Analytics (Optional)

Enable Firebase Analytics for user insights:

1. Go to "Analytics" in Firebase Console
2. Click "Get started"
3. Follow setup instructions
4. Track user engagement and feature usage

## 🏆 Competition Ready

Your EatSmart app now has:
- ✅ Professional backend infrastructure
- ✅ User authentication system
- ✅ Real-time data synchronization
- ✅ Scalable architecture
- ✅ Production-ready security
- ✅ Modern tech stack (React + Firebase)

Perfect for Hack4Health competition! 🎉 