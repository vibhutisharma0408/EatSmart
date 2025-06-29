import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { logoutUser } from './firebase/auth'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import NutritionTracker from './components/NutritionTracker'
import MealPlanner from './components/MealPlanner'
import HealthInsights from './components/HealthInsights'
import AIAssistant from './components/AIAssistant'
import Profile from './components/Profile'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import DoctorConsultation from './components/DoctorConsultation'
import PageTransition from './components/PageTransition'
import FloatingAIChat from './components/FloatingAIChat'

function AppContent() {
  const { user, userProfile, loading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [nutritionData, setNutritionData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    water: 0
  })

  const [meals, setMeals] = useState([])
  const [healthMetrics, setHealthMetrics] = useState({
    weight: [],
    sleep: [],
    mood: [],
    energy: []
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (userProfile) {
      // Load user-specific data from Firebase
      const mockNutritionData = {
        calories: 1850,
        protein: 120,
        carbs: 180,
        fat: 65,
        fiber: 25,
        water: 8
      }
      setNutritionData(mockNutritionData)

      const mockMeals = [
        {
          id: 1,
          name: 'Oatmeal with Berries',
          type: 'breakfast',
          calories: 320,
          protein: 12,
          carbs: 45,
          fat: 8,
          time: '08:00'
        },
        {
          id: 2,
          name: 'Grilled Chicken Salad',
          type: 'lunch',
          calories: 450,
          protein: 35,
          carbs: 15,
          fat: 22,
          time: '12:30'
        }
      ]
      setMeals(mockMeals)
    }
  }, [userProfile])

  const handleLogout = async () => {
    await logoutUser()
  }

  // Show loading screen while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show landing page if no user is authenticated
  if (!user) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowLogin(true)} />
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </>
    )
  }

  // Show loading screen while user profile is being loaded
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200">
      <Header user={userProfile} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8 pt-24">
        <PageTransition>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  user={userProfile}
                  nutritionData={nutritionData}
                  meals={meals}
                  healthMetrics={healthMetrics}
                />
              } 
            />
            <Route 
              path="/landing" 
              element={
                <LandingPage onGetStarted={() => navigate('/')} />
              } 
            />
            <Route 
              path="/nutrition" 
              element={
                <NutritionTracker 
                  nutritionData={nutritionData}
                  setNutritionData={setNutritionData}
                  userId={user.uid}
                />
              } 
            />
            <Route 
              path="/meals" 
              element={
                <MealPlanner 
                  meals={meals}
                  setMeals={setMeals}
                  user={userProfile}
                />
              } 
            />
            <Route 
              path="/insights" 
              element={
                <HealthInsights 
                  healthMetrics={healthMetrics}
                  nutritionData={nutritionData}
                  user={userProfile}
                />
              } 
            />
            <Route 
              path="/ai-assistant" 
              element={
                <AIAssistant 
                  user={userProfile}
                  nutritionData={nutritionData}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Profile 
                  user={userProfile}
                  userId={user.uid}
                />
              } 
            />
            <Route 
              path="/consultations" 
              element={
                <DoctorConsultation />
              } 
            />
          </Routes>
        </PageTransition>
      </main>
      <Toaster position="top-right" />
      <FloatingAIChat user={userProfile} nutritionData={nutritionData} />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App 