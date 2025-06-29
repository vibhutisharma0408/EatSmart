import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

// User registration
export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, {
      displayName: userData.name
    })

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: userData.name,
      email: user.email,
      age: userData.age,
      weight: userData.weight,
      height: userData.height,
      activityLevel: userData.activityLevel,
      goals: userData.goals,
      dietaryRestrictions: userData.dietaryRestrictions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// User login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// User logout
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: new Date().toISOString()
    }, { merge: true })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
} 