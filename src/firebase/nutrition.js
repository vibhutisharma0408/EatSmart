import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

// Add a meal to user's daily intake
export const addMeal = async (userId, mealData) => {
  try {
    const meal = {
      ...mealData,
      userId,
      createdAt: serverTimestamp(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    }
    
    const docRef = await addDoc(collection(db, 'meals'), meal)
    return { success: true, mealId: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get user's meals for a specific date
export const getUserMeals = async (userId, date) => {
  try {
    const q = query(
      collection(db, 'meals'),
      where('userId', '==', userId),
      where('date', '==', date),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const meals = []
    querySnapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, meals }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get user's meals for today
export const getTodayMeals = async (userId) => {
  const today = new Date().toISOString().split('T')[0]
  return getUserMeals(userId, today)
}

// Delete a meal
export const deleteMeal = async (mealId) => {
  try {
    await deleteDoc(doc(db, 'meals', mealId))
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update a meal
export const updateMeal = async (mealId, mealData) => {
  try {
    await updateDoc(doc(db, 'meals', mealId), {
      ...mealData,
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get user's nutrition summary for a date range
export const getNutritionSummary = async (userId, startDate, endDate) => {
  try {
    const q = query(
      collection(db, 'meals'),
      where('userId', '==', userId),
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    )
    
    const querySnapshot = await getDocs(q)
    const meals = []
    querySnapshot.forEach((doc) => {
      meals.push(doc.data())
    })
    
    // Calculate totals
    const summary = meals.reduce((acc, meal) => {
      acc.calories += meal.calories || 0
      acc.protein += meal.protein || 0
      acc.carbs += meal.carbs || 0
      acc.fat += meal.fat || 0
      acc.fiber += meal.fiber || 0
      return acc
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })
    
    return { success: true, summary, meals }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Real-time listener for user's meals
export const subscribeToUserMeals = (userId, date, callback) => {
  const q = query(
    collection(db, 'meals'),
    where('userId', '==', userId),
    where('date', '==', date),
    orderBy('createdAt', 'desc')
  )
  
  return onSnapshot(q, (querySnapshot) => {
    const meals = []
    querySnapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() })
    })
    callback(meals)
  })
}

// Save nutrition goals
export const saveNutritionGoals = async (userId, goals) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      nutritionGoals: goals,
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get nutrition goals
export const getNutritionGoals = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return { success: true, goals: userDoc.data().nutritionGoals }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
} 