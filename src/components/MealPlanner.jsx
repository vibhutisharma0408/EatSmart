import React, { useState } from 'react'
import { 
  Calendar, 
  Plus, 
  Clock, 
  Utensils, 
  Star,
  Bot,
  RefreshCw
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const MealPlanner = ({ meals, setMeals, user }) => {
  const [selectedDay, setSelectedDay] = useState('monday')
  const [isGeneratingMeals, setIsGeneratingMeals] = useState(false)
  const [showMealSuggestions, setShowMealSuggestions] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState(null)

  // Add null checks and default values for user properties
  const userGoals = user?.goals || 'maintain weight'
  const userDietaryRestrictions = user?.dietaryRestrictions || ['none']
  const userName = user?.name || 'User'

  const daysOfWeek = [
    { key: 'monday', name: 'Monday', date: 'Dec 18' },
    { key: 'tuesday', name: 'Tuesday', date: 'Dec 19' },
    { key: 'wednesday', name: 'Wednesday', date: 'Dec 20' },
    { key: 'thursday', name: 'Thursday', date: 'Dec 21' },
    { key: 'friday', name: 'Friday', date: 'Dec 22' },
    { key: 'saturday', name: 'Saturday', date: 'Dec 23' },
    { key: 'sunday', name: 'Sunday', date: 'Dec 24' },
  ]

  const mealTypes = [
    { key: 'breakfast', name: 'Breakfast', icon: '🌅', time: '08:00' },
    { key: 'lunch', name: 'Lunch', icon: '☀️', time: '12:30' },
    { key: 'dinner', name: 'Dinner', icon: '🌙', time: '19:00' },
    { key: 'snacks', name: 'Snacks', icon: '🍎', time: '15:00' },
  ]

  const aiMealSuggestions = {
    breakfast: [
      { name: 'Oatmeal with Berries & Nuts', calories: 320, protein: 12, carbs: 45, fat: 8, rating: 4.8 },
      { name: 'Greek Yogurt Parfait', calories: 280, protein: 18, carbs: 35, fat: 6, rating: 4.6 },
      { name: 'Avocado Toast with Eggs', calories: 380, protein: 16, carbs: 28, fat: 22, rating: 4.7 },
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 15, fat: 22, rating: 4.9 },
      { name: 'Quinoa Buddha Bowl', calories: 420, protein: 18, carbs: 55, fat: 12, rating: 4.5 },
      { name: 'Turkey & Avocado Wrap', calories: 380, protein: 22, carbs: 32, fat: 18, rating: 4.4 },
    ],
    dinner: [
      { name: 'Salmon with Roasted Vegetables', calories: 520, protein: 38, carbs: 25, fat: 28, rating: 4.8 },
      { name: 'Lean Beef Stir-Fry', calories: 480, protein: 32, carbs: 35, fat: 20, rating: 4.6 },
      { name: 'Vegetarian Pasta Primavera', calories: 420, protein: 14, carbs: 65, fat: 12, rating: 4.3 },
    ],
    snacks: [
      { name: 'Apple with Almond Butter', calories: 180, protein: 4, carbs: 25, fat: 8, rating: 4.7 },
      { name: 'Protein Smoothie', calories: 220, protein: 20, carbs: 18, fat: 6, rating: 4.8 },
      { name: 'Hummus with Carrots', calories: 150, protein: 6, carbs: 18, fat: 6, rating: 4.5 },
    ]
  }

  const generateMealPlan = () => {
    setIsGeneratingMeals(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const newMeals = []
      daysOfWeek.forEach(day => {
        mealTypes.forEach(mealType => {
          const suggestions = aiMealSuggestions[mealType.key]
          const randomMeal = suggestions[Math.floor(Math.random() * suggestions.length)]
          newMeals.push({
            id: `${day.key}-${mealType.key}`,
            name: randomMeal.name,
            type: mealType.key,
            day: day.key,
            calories: randomMeal.calories,
            protein: randomMeal.protein,
            carbs: randomMeal.carbs,
            fat: randomMeal.fat,
            rating: randomMeal.rating,
            time: mealType.time
          })
        })
      })
      
      setMeals(newMeals)
      setIsGeneratingMeals(false)
      toast.success('AI has generated your personalized meal plan! 🎉')
    }, 2000)
  }

  const getMealsForDay = (day) => {
    return meals.filter(meal => meal.day === day)
  }

  const getMealTypeIcon = (type) => {
    const mealType = mealTypes.find(mt => mt.key === type)
    return mealType ? mealType.icon : '🍽️'
  }

  const openMealSuggestions = (mealType) => {
    setSelectedMealType(mealType)
    setShowMealSuggestions(true)
  }

  const addMealToPlan = (mealSuggestion) => {
    const newMeal = {
      id: `${selectedDay}-${selectedMealType.key}`,
      name: mealSuggestion.name,
      type: selectedMealType.key,
      day: selectedDay,
      calories: mealSuggestion.calories,
      protein: mealSuggestion.protein,
      carbs: mealSuggestion.carbs,
      fat: mealSuggestion.fat,
      rating: mealSuggestion.rating,
      time: selectedMealType.time
    }

    // Remove existing meal for this day and type if it exists
    const updatedMeals = meals.filter(meal => !(meal.day === selectedDay && meal.type === selectedMealType.key))
    
    // Add the new meal
    setMeals([...updatedMeals, newMeal])
    setShowMealSuggestions(false)
    setSelectedMealType(null)
    toast.success(`Added ${mealSuggestion.name} to your ${selectedMealType.name} plan!`)
  }

  const clearAllMeals = () => {
    setMeals([])
    toast.success('All meals cleared! You can now generate a new meal plan.')
  }

  const clearDayMeals = (day) => {
    const updatedMeals = meals.filter(meal => meal.day !== day)
    setMeals(updatedMeals)
    toast.success(`All meals for ${daysOfWeek.find(d => d.key === day)?.name} cleared!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Planner</h1>
          <p className="text-gray-600 dark:text-gray-300">Plan your weekly meals with AI-powered suggestions</p>
        </div>
        <div className="flex items-center space-x-3">
          {meals.length > 0 && (
            <button
              onClick={clearAllMeals}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear All Meals</span>
            </button>
          )}
          <button
            onClick={generateMealPlan}
            disabled={isGeneratingMeals}
            className="btn-primary flex items-center space-x-2"
          >
            {isGeneratingMeals ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
            <span>{isGeneratingMeals ? 'Generating...' : 'Generate Meal Plan'}</span>
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="nutrition-gradient rounded-2xl p-6 text-white"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Meal Planning</h3>
            <p className="text-white text-opacity-90 mb-4">
              Based on your goals ({Array.isArray(userGoals) ? userGoals.join(', ') : userGoals}) and dietary preferences ({Array.isArray(userDietaryRestrictions) ? userDietaryRestrictions.join(', ') : userDietaryRestrictions}), 
              our AI creates personalized meal suggestions that align with your nutrition targets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Daily Calories</p>
                <p className="text-white text-opacity-80">~2000 cal</p>
              </div>
              <div>
                <p className="font-medium">Protein Focus</p>
                <p className="text-white text-opacity-80">150g daily</p>
              </div>
              <div>
                <p className="font-medium">Meal Variety</p>
                <p className="text-white text-opacity-80">21 meals/week</p>
              </div>
              <div>
                <p className="font-medium">Dietary Compliance</p>
                <p className="text-white text-opacity-80">100% {Array.isArray(userDietaryRestrictions) ? userDietaryRestrictions.join(', ') : userDietaryRestrictions}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Day Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {daysOfWeek.map((day) => {
          const dayMeals = getMealsForDay(day.key)
          const hasMeals = dayMeals.length > 0
          
          return (
            <div key={day.key} className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedDay(day.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedDay === day.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div>{day.name}</div>
                <div className="text-xs opacity-75">{day.date}</div>
              </button>
              {hasMeals && (
                <button
                  onClick={() => clearDayMeals(day.key)}
                  className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                  title={`Clear all meals for ${day.name}`}
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Meal Plan for Selected Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mealTypes.map((mealType) => {
          const dayMeals = getMealsForDay(selectedDay)
          const meal = dayMeals.find(m => m.type === mealType.key)
          
          return (
            <motion.div
              key={mealType.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{mealType.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{mealType.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{mealType.time}</p>
                  </div>
                </div>
                <button 
                  onClick={() => openMealSuggestions(mealType)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {meal ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{meal.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{meal.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>{meal.calories} cal</div>
                      <div>{meal.protein}g protein</div>
                      <div>{meal.carbs}g carbs</div>
                    </div>
                  </div>
                  
                  {/* AI Suggestions */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Alternative Options</h5>
                    <div className="space-y-2">
                      {aiMealSuggestions[mealType.key].slice(0, 2).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => addMealToPlan(suggestion)}
                          className="w-full p-3 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{suggestion.name}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{suggestion.rating}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {suggestion.calories} cal • {suggestion.protein}g protein
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Utensils className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No meal planned</p>
                  <button 
                    onClick={() => openMealSuggestions(mealType)}
                    className="btn-primary text-sm"
                  >
                    Add Meal
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Nutrition Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {meals.length > 0 ? Math.round(meals.reduce((sum, meal) => sum + meal.calories, 0) / 7) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Calories/Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-health-blue">
              {meals.length > 0 ? Math.round(meals.reduce((sum, meal) => sum + meal.protein, 0) / 7) : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Protein/Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-health-green">
              {meals.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Meals Planned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-health-purple">
              {meals.length > 0 ? Math.round(meals.reduce((sum, meal) => sum + meal.rating, 0) / meals.length * 10) / 10 : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
          </div>
        </div>
      </motion.div>

      {/* Meal Suggestions Modal */}
      {showMealSuggestions && selectedMealType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowMealSuggestions(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedMealType.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedMealType.name} Suggestions
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose from our AI-recommended meals for {selectedDay}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMealSuggestions(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiMealSuggestions[selectedMealType.key].map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => addMealToPlan(suggestion)}
                  className="p-4 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{suggestion.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{suggestion.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div>🔥 {suggestion.calories} cal</div>
                    <div>🥩 {suggestion.protein}g protein</div>
                    <div>🍞 {suggestion.carbs}g carbs</div>
                    <div>🥑 {suggestion.fat}g fat</div>
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                    Click to add to your plan
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 AI Recommendation</h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                These meals are tailored to your {userGoals} goals and {Array.isArray(userDietaryRestrictions) ? userDietaryRestrictions.join(', ') : userDietaryRestrictions} dietary preferences. 
                Each suggestion is nutritionally balanced and fits your daily calorie targets.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MealPlanner 