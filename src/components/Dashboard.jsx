import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Target, 
  Droplets, 
  Flame, 
  Plus,
  Calendar,
  Bot,
  BarChart3,
  Users,
  Award,
  Clock,
  Heart,
  Stethoscope,
  Apple,
  Activity,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = ({ user, nutritionData, meals, healthMetrics }) => {
  // Add null checks and default values
  const userName = user?.name || 'User'
  const userAge = user?.age || 25
  const userWeight = user?.weight || 70
  const userHeight = user?.height || 175

  // Calculate BMR using Mifflin-St Jeor Equation
  const bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge + 5
  const calorieGoal = Math.round(bmr * 1.2) // Sedentary activity level
  const calorieProgress = (nutritionData.calories / calorieGoal) * 100

  // Water goal (8 glasses = 2L)
  const waterGoal = 2
  const waterProgress = (nutritionData.water / waterGoal) * 100

  // Mock stats for demonstration
  const userStats = {
    streakDays: 7,
    totalMeals: 45,
    weightLost: 2.5,
    goalsAchieved: 3
  }

  const quickActions = [
    {
      title: 'Log Meal',
      description: 'Add your food intake',
      icon: Plus,
      href: '/nutrition',
      color: 'bg-primary-500'
    },
    {
      title: 'Plan Meals',
      description: 'Create weekly meal plan',
      icon: Calendar,
      href: '/meals',
      color: 'bg-health-blue'
    },
    {
      title: 'AI Assistant',
      description: 'Get nutrition advice',
      icon: Bot,
      href: '/ai-assistant',
      color: 'bg-health-purple'
    },
    {
      title: 'Doctor Consultations',
      description: 'Book expert consultation',
      icon: Stethoscope,
      href: '/consultations',
      color: 'bg-red-500'
    },
    {
      title: 'View Insights',
      description: 'Check your progress',
      icon: BarChart3,
      href: '/insights',
      color: 'bg-health-orange'
    }
  ]

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="health-gradient rounded-2xl p-6 text-white hover-lift"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-primary-100">
          Let's make today a healthy day. You're doing great!
        </p>
      </motion.div>

      {/* Stats Section - Inspired by TaskFlow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg hover-lift"
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Your Health Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center scale-on-hover">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-300 hover:scale-110">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{userStats.streakDays}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
          </div>
          <div className="text-center scale-on-hover">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-health-blue-100 dark:bg-health-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-300 hover:scale-110">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-health-blue-600 dark:text-health-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{userStats.totalMeals}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Meals Tracked</div>
          </div>
          <div className="text-center scale-on-hover">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-300 hover:scale-110">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{userStats.weightLost}kg</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Weight Lost</div>
          </div>
          <div className="text-center scale-on-hover">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-300 hover:scale-110">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{userStats.goalsAchieved}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Goals Achieved</div>
          </div>
        </div>
      </motion.section>

      {/* Nutrition Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-health-orange" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Calories</h3>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{calorieProgress.toFixed(0)}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Consumed</span>
              <span className="font-medium text-gray-900 dark:text-white">{nutritionData.calories}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Goal</span>
              <span className="font-medium text-gray-900 dark:text-white">{calorieGoal}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-health-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-health-blue" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Protein</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Consumed</span>
              <span className="font-medium text-gray-900 dark:text-white">{nutritionData.protein}g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Goal</span>
              <span className="font-medium text-gray-900 dark:text-white">150g</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-health-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((nutritionData.protein / 150) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-health-blue" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Water</h3>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{waterProgress.toFixed(0)}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Consumed</span>
              <span className="font-medium text-gray-900 dark:text-white">{nutritionData.water}L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Goal</span>
              <span className="font-medium text-gray-900 dark:text-white">{waterGoal}L</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-health-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(waterProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Today's Meals</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Logged</span>
              <span className="font-medium text-gray-900 dark:text-white">{meals.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Target</span>
              <span className="font-medium text-gray-900 dark:text-white">5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((meals.length / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Link to="/nutrition" className="group">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-primary-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Apple className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-primary-600 text-sm sm:text-base">Nutrition Tracker</h3>
              <p className="text-xs sm:text-sm text-gray-600">Track your daily nutrition intake</p>
            </div>
          </Link>

          <Link to="/meals" className="group">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-green-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-green-600 text-sm sm:text-base">Meal Planner</h3>
              <p className="text-xs sm:text-sm text-gray-600">Plan your weekly meals</p>
            </div>
          </Link>

          <Link to="/insights" className="group">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-blue-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-blue-600 text-sm sm:text-base">Health Insights</h3>
              <p className="text-xs sm:text-sm text-gray-600">View your health analytics</p>
            </div>
          </Link>

          <Link to="/ai-assistant" className="group">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-purple-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-purple-600 text-sm sm:text-base">AI Assistant</h3>
              <p className="text-xs sm:text-sm text-gray-600">Get personalized advice</p>
            </div>
          </Link>

          <Link to="/consultations" className="group">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 bg-red-100 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <Zap className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-all duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-red-600 text-sm sm:text-base">Doctor Consultation</h3>
              <p className="text-xs sm:text-sm text-gray-600">Book virtual consultations</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Recent Meals</h2>
          <Link to="/meals" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-xs sm:text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="card">
          {meals.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {meals.slice(0, 3).map((meal) => (
                <div key={meal.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{meal.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 capitalize">{meal.type} • {meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{meal.calories} cal</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{meal.protein}g protein</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No meals logged today</p>
              <Link to="/nutrition" className="btn-primary inline-block mt-2 text-sm sm:text-base">
                Log Your First Meal
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard 