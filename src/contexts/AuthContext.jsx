import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, getUserProfile } from '../firebase/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setProfileLoading(true)
        
        try {
          // Get user profile from Firestore
          const profileResult = await getUserProfile(firebaseUser.uid)
          if (profileResult.success) {
            setUserProfile(profileResult.data)
          } else {
            // If profile doesn't exist, create a default one
            console.log('User profile not found, creating default profile')
            setUserProfile({
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              age: 25,
              weight: 70,
              height: 175,
              activityLevel: 'moderate',
              goals: 'maintain',
              dietaryRestrictions: []
            })
          }
        } catch (error) {
          console.error('Error loading user profile:', error)
          // Set default profile on error
          setUserProfile({
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email,
            age: 25,
            weight: 70,
            height: 175,
            activityLevel: 'moderate',
            goals: 'maintain',
            dietaryRestrictions: []
          })
        } finally {
          setProfileLoading(false)
        }
      } else {
        setUser(null)
        setUserProfile(null)
        setProfileLoading(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    userProfile,
    loading: loading || profileLoading,
    setUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 