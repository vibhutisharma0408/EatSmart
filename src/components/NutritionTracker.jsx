import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  X, 
  Flame, 
  Target, 
  Droplets,
  Apple,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { addMeal, getTodayMeals, deleteMeal } from '../firebase/nutrition'

const NutritionTracker = ({ nutritionData, setNutritionData, userId }) => {
  const [isAddingFood, setIsAddingFood] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [todayMeals, setTodayMeals] = useState([])
  const [loading, setLoading] = useState(true)

  // Load meals from Firebase on component mount
  useEffect(() => {
    const loadTodayMeals = async () => {
      if (userId) {
        try {
          const result = await getTodayMeals(userId)
          if (result.success) {
            setTodayMeals(result.meals)
            // Calculate nutrition totals
            const totals = result.meals.reduce((acc, meal) => {
              acc.calories += meal.calories || 0
              acc.protein += meal.protein || 0
              acc.carbs += meal.carbs || 0
              acc.fat += meal.fat || 0
              acc.fiber += meal.fiber || 0
              return acc
            }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })
            
            setNutritionData(prev => ({
              ...prev,
              ...totals
            }))
          }
        } catch (error) {
          console.error('Error loading meals:', error)
          toast.error('Failed to load meals')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadTodayMeals()
  }, [userId])

  const commonFoods = [
    { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3, fiber: 4 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    { name: 'Salmon', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0 },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.2 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    { name: 'Greek Yogurt', calories: 130, protein: 23, carbs: 9, fat: 0.5, fiber: 0 },
    { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
  ]

  // Popular food suggestions for quick selection
  const popularFoods = [
    { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3, fiber: 4, icon: '🥣' },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, icon: '🍗' },
    { name: 'Salmon', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0, icon: '🐟' },
    { name: 'Greek Yogurt', calories: 130, protein: 23, carbs: 9, fat: 0.5, fiber: 0, icon: '🥛' },
  ]

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addFood = async () => {
    if (!selectedFood || !userId) return

    const adjustedFood = {
      ...selectedFood,
      calories: Math.round(selectedFood.calories * quantity),
      protein: Math.round(selectedFood.protein * quantity * 10) / 10,
      carbs: Math.round(selectedFood.carbs * quantity * 10) / 10,
      fat: Math.round(selectedFood.fat * quantity * 10) / 10,
      fiber: Math.round(selectedFood.fiber * quantity * 10) / 10,
    }

    // Create new meal object
    const newMeal = {
      name: selectedFood.name,
      type: 'meal',
      calories: adjustedFood.calories,
      protein: adjustedFood.protein,
      carbs: adjustedFood.carbs,
      fat: adjustedFood.fat,
      fiber: adjustedFood.fiber,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    try {
      // Save to Firebase
      const result = await addMeal(userId, newMeal)
      if (result.success) {
        // Add to local state with the Firebase ID
        const mealWithId = { ...newMeal, id: result.mealId }
        setTodayMeals(prev => [...prev, mealWithId])

        // Update nutrition data
        setNutritionData(prev => ({
          ...prev,
          calories: prev.calories + adjustedFood.calories,
          protein: prev.protein + adjustedFood.protein,
          carbs: prev.carbs + adjustedFood.carbs,
          fat: prev.fat + adjustedFood.fat,
          fiber: prev.fiber + adjustedFood.fiber,
        }))

        toast.success(`Added ${selectedFood.name} to your daily intake!`)
        setIsAddingFood(false)
        setSelectedFood(null)
        setQuantity(1)
        setSearchQuery('')
      } else {
        toast.error('Failed to add meal')
      }
    } catch (error) {
      console.error('Error adding meal:', error)
      toast.error('Failed to add meal')
    }
  }

  const quickAddFood = async (food) => {
    if (!userId) return

    const newMeal = {
      name: food.name,
      type: 'meal',
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    try {
      // Save to Firebase
      const result = await addMeal(userId, newMeal)
      if (result.success) {
        // Add to local state with the Firebase ID
        const mealWithId = { ...newMeal, id: result.mealId }
        setTodayMeals(prev => [...prev, mealWithId])

        // Update nutrition data
        setNutritionData(prev => ({
          ...prev,
          calories: prev.calories + food.calories,
          protein: prev.protein + food.protein,
          carbs: prev.carbs + food.carbs,
          fat: prev.fat + food.fat,
          fiber: prev.fiber + food.fiber,
        }))

        toast.success(`Added ${food.name} to your daily intake!`)
      } else {
        toast.error('Failed to add meal')
      }
    } catch (error) {
      console.error('Error adding meal:', error)
      toast.error('Failed to add meal')
    }
  }

  const removeMeal = async (mealId) => {
    const meal = todayMeals.find(m => m.id === mealId)
    if (meal) {
      try {
        // Delete from Firebase
        const result = await deleteMeal(mealId)
        if (result.success) {
          // Remove from local state
          setTodayMeals(prev => prev.filter(m => m.id !== mealId))
          
          // Update nutrition data
          setNutritionData(prev => ({
            ...prev,
            calories: prev.calories - meal.calories,
            protein: prev.protein - meal.protein,
            carbs: prev.carbs - meal.carbs,
            fat: prev.fat - meal.fat,
            fiber: prev.fiber - (meal.fiber || 0),
          }))
          toast.success(`Removed ${meal.name} from your daily intake`)
        } else {
          toast.error('Failed to remove meal')
        }
      } catch (error) {
        console.error('Error removing meal:', error)
        toast.error('Failed to remove meal')
      }
    }
  }

  const clearAllMeals = async () => {
    try {
      // Delete all meals from Firebase
      for (const meal of todayMeals) {
        await deleteMeal(meal.id)
      }
      
      setTodayMeals([])
      setNutritionData({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        water: 0
      })
      toast.success('Cleared all meals for today')
    } catch (error) {
      console.error('Error clearing meals:', error)
      toast.error('Failed to clear meals')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
            <p className="text-gray-600">Track your daily food intake and nutrition goals</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition Tracker</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your daily food intake and nutrition goals</p>
        </div>
        <div className="flex space-x-2">
          {todayMeals.length > 0 && (
            <button
              onClick={clearAllMeals}
              className="btn-secondary"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsAddingFood(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Food</span>
          </button>
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Flame className="w-6 h-6 text-health-orange" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Calories</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Goal: 2000</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((nutritionData.calories / 2000) * 100)}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{nutritionData.calories}</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-health-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((nutritionData.calories / 2000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-health-blue" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Protein</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Goal: 150g</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((nutritionData.protein / 150) * 100)}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{nutritionData.protein}g</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-health-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((nutritionData.protein / 150) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Apple className="w-6 h-6 text-health-green" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Carbs</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Goal: 250g</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((nutritionData.carbs / 250) * 100)}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{nutritionData.carbs}g</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-health-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((nutritionData.carbs / 250) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Droplets className="w-6 h-6 text-health-purple" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Fat</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Goal: 65g</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((nutritionData.fat / 65) * 100)}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{nutritionData.fat}g</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-health-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((nutritionData.fat / 65) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Meals</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {todayMeals.length > 0 ? (
          <div className="space-y-4">
            {todayMeals.map((meal) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Apple className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{meal.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{meal.calories} cal</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{meal.protein}g protein</p>
                  </div>
                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Apple className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-6">No meals logged today</p>
            
            {/* Quick Add Popular Foods */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick add popular foods:</p>
              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                {popularFoods.slice(0, 4).map((food) => (
                  <button
                    key={food.name}
                    onClick={() => quickAddFood(food)}
                    className="flex items-center space-x-2 p-2 text-sm bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200"
                  >
                    <span className="text-base">{food.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{food.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsAddingFood(true)}
              className="btn-primary"
            >
              Add More Foods
            </button>
          </div>
        )}
      </div>

      {/* Add Food Modal */}
      <AnimatePresence>
        {isAddingFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsAddingFood(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Food</h3>
                <button
                  onClick={() => setIsAddingFood(false)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Search Food
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for food..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Popular Food Suggestions */}
                {!searchQuery && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                      Popular Foods
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {popularFoods.map((food) => (
                        <button
                          key={food.name}
                          onClick={() => setSelectedFood(food)}
                          className={`p-3 text-left rounded-lg border transition-all duration-200 hover:shadow-md ${
                            selectedFood?.name === food.name
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{food.icon}</span>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{food.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {food.calories} cal • {food.protein}g protein
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQuery && (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredFoods.map((food) => (
                      <button
                        key={food.name}
                        onClick={() => setSelectedFood(food)}
                        className={`w-full p-3 text-left rounded-lg border transition-colors duration-200 ${
                          selectedFood?.name === food.name
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">{food.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedFood && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Quantity (servings)
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Nutrition Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div>Calories: {Math.round(selectedFood.calories * quantity)}</div>
                        <div>Protein: {Math.round(selectedFood.protein * quantity * 10) / 10}g</div>
                        <div>Carbs: {Math.round(selectedFood.carbs * quantity * 10) / 10}g</div>
                        <div>Fat: {Math.round(selectedFood.fat * quantity * 10) / 10}g</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsAddingFood(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addFood}
                    disabled={!selectedFood}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NutritionTracker 