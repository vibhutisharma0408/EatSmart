import React, { useState } from 'react'
import { 
  User, 
  Settings, 
  Target, 
  Activity,
  Save,
  Edit,
  Camera,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 'very_active', label: 'Extremely Active', description: 'Very hard exercise, physical job' }
  ]

  const goals = [
    { value: 'weight_loss', label: 'Weight Loss', icon: '⚖️' },
    { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { value: 'maintenance', label: 'Maintenance', icon: '⚖️' },
    { value: 'improve_health', label: 'Improve Health', icon: '❤️' },
    { value: 'increase_energy', label: 'Increase Energy', icon: '⚡' }
  ]

  const dietaryRestrictions = [
    { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { value: 'vegan', label: 'Vegan', icon: '🌱' },
    { value: 'gluten_free', label: 'Gluten-Free', icon: '🌾' },
    { value: 'dairy_free', label: 'Dairy-Free', icon: '🥛' },
    { value: 'keto', label: 'Keto', icon: '🥑' },
    { value: 'paleo', label: 'Paleo', icon: '🥩' }
  ]

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  const calculateBMR = () => {
    // Mifflin-St Jeor Equation
    const bmr = 10 * editedUser.weight + 6.25 * editedUser.height - 5 * editedUser.age + 5
    return Math.round(bmr)
  }

  const calculateTDEE = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return Math.round(bmr * activityMultipliers[editedUser.activityLevel])
  }

  const calculateBMI = () => {
    const heightInMeters = editedUser.height / 100
    const bmi = editedUser.weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(1)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600' }
    return { category: 'Obese', color: 'text-red-600' }
  }

  const bmi = calculateBMI()
  const bmiInfo = getBMICategory(bmi)
  const bmr = calculateBMR()
  const tdee = calculateTDEE()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your personal information and health goals</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                <p className="text-gray-500 dark:text-gray-400">Update your basic details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={editedUser.age}
                  onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={editedUser.weight}
                  onChange={(e) => setEditedUser({ ...editedUser, weight: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={editedUser.height}
                  onChange={(e) => setEditedUser({ ...editedUser, height: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Health Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Goals</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  What are your primary goals?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => {
                        if (isEditing) {
                          const newGoals = editedUser.goals.includes(goal.value)
                            ? editedUser.goals.filter(g => g !== goal.value)
                            : [...editedUser.goals, goal.value]
                          setEditedUser({ ...editedUser, goals: newGoals })
                        }
                      }}
                      disabled={!isEditing}
                      className={`p-3 rounded-lg border-2 text-left transition-colors duration-200 ${
                        editedUser.goals.includes(goal.value)
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="text-lg mb-1">{goal.icon}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Activity Level
                </label>
                <select
                  value={editedUser.activityLevel}
                  onChange={(e) => setEditedUser({ ...editedUser, activityLevel: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label} - {level.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Dietary Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dietary Preferences</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Dietary Restrictions & Preferences
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryRestrictions.map((restriction) => (
                  <button
                    key={restriction.value}
                    onClick={() => {
                      if (isEditing) {
                        const newRestrictions = editedUser.dietaryRestrictions.includes(restriction.value)
                          ? editedUser.dietaryRestrictions.filter(r => r !== restriction.value)
                          : [...editedUser.dietaryRestrictions, restriction.value]
                        setEditedUser({ ...editedUser, dietaryRestrictions: newRestrictions })
                      }
                    }}
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 text-left transition-colors duration-200 ${
                      editedUser.dietaryRestrictions.includes(restriction.value)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="text-lg mb-1">{restriction.icon}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{restriction.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Health Metrics & Settings */}
        <div className="space-y-6">
          {/* Health Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Metrics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{bmi}</div>
                <div className={`text-sm font-medium ${bmiInfo.color}`}>{bmiInfo.category}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">BMI</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{bmr}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">calories/day</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Basal Metabolic Rate</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{tdee}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">calories/day</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Daily Energy Expenditure</div>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Notifications</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">On</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Privacy</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Private</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Help & Support</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">→</span>
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                Export Health Data
              </button>
              <button className="w-full btn-secondary">
                Reset Progress
              </button>
              <button className="w-full btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-700">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile 