import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  Calendar,
  Award,
  Lightbulb,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'

const HealthInsights = ({ healthMetrics, nutritionData, user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock data for charts and insights
  const weightData = [
    { date: 'Dec 12', weight: 72.5 },
    { date: 'Dec 13', weight: 72.3 },
    { date: 'Dec 14', weight: 72.1 },
    { date: 'Dec 15', weight: 71.9 },
    { date: 'Dec 16', weight: 71.8 },
    { date: 'Dec 17', weight: 71.6 },
    { date: 'Dec 18', weight: 71.4 },
  ]

  const sleepData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 8.0 },
    { day: 'Wed', hours: 6.5 },
    { day: 'Thu', hours: 7.8 },
    { day: 'Fri', hours: 8.2 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: 7.0 },
  ]

  const moodData = [
    { day: 'Mon', mood: 4 },
    { day: 'Tue', mood: 5 },
    { day: 'Wed', mood: 3 },
    { day: 'Thu', mood: 4 },
    { day: 'Fri', mood: 5 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: 4 },
  ]

  const insights = [
    {
      type: 'positive',
      title: 'Weight Loss Progress',
      description: 'You\'ve lost 1.1kg this week! Your calorie deficit is working perfectly.',
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      type: 'positive',
      title: 'Protein Intake',
      description: 'You\'re consistently hitting your protein goals. Great for muscle maintenance!',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      type: 'warning',
      title: 'Sleep Quality',
      description: 'Your sleep has been inconsistent. Aim for 7-9 hours consistently.',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      type: 'info',
      title: 'Water Intake',
      description: 'You\'re drinking 8L daily. Excellent hydration habits!',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  const achievements = [
    { title: '7-Day Streak', description: 'Logged meals for 7 consecutive days', icon: Award },
    { title: 'Protein Master', description: 'Hit protein goals 5 days in a row', icon: Target },
    { title: 'Hydration Hero', description: 'Drank 8L water for 3 days straight', icon: TrendingUp },
  ]

  const recommendations = [
    {
      title: 'Increase Fiber Intake',
      description: 'Add more vegetables and whole grains to reach 30g daily fiber',
      impact: 'High',
      effort: 'Low'
    },
    {
      title: 'Optimize Meal Timing',
      description: 'Try eating protein-rich meals within 30 minutes of workouts',
      impact: 'Medium',
      effort: 'Low'
    },
    {
      title: 'Sleep Schedule',
      description: 'Go to bed 30 minutes earlier to improve recovery and weight loss',
      impact: 'High',
      effort: 'Medium'
    }
  ]

  const getMoodEmoji = (mood) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊']
    return emojis[mood - 1] || '😐'
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      case 'Medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
      case 'Low': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Insights</h1>
          <p className="text-gray-600 dark:text-gray-300">Your personalized health analytics and recommendations</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedPeriod === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Weight Loss</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">-1.1kg</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">This week</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Goal Progress</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Calorie target</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
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
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Sleep Quality</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">7.6h</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Average</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '76%' }}></div>
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
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Mood Score</h3>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">4.3/5</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">This week</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: '86%' }}></div>
          </div>
        </motion.div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className={`p-4 rounded-lg ${insight.bgColor}`}>
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Achievements</h2>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Weight Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weight Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{weightData[weightData.length - 1].weight}kg</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Current weight</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-green-600 font-medium">-1.1kg this week</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">On track for goal</div>
            </div>
          </div>
          <div className="flex items-end justify-between h-32">
            {weightData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className="w-8 bg-primary-600 rounded-t"
                  style={{ 
                    height: `${((data.weight - 70) / 5) * 100}%`,
                    minHeight: '8px'
                  }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{data.date}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sleep and Mood Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sleep Quality</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">7.6h</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Average this week</span>
            </div>
            <div className="flex items-end justify-between h-24">
              {sleepData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-6 bg-purple-600 rounded-t"
                    style={{ height: `${(data.hours / 9) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Tracking</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">4.3/5</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Average this week</span>
            </div>
            <div className="flex items-end justify-between h-24">
              {moodData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="text-lg">{getMoodEmoji(data.mood)}</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personalized Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">{rec.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{rec.description}</p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(rec.impact)}`}>
                  {rec.impact} Impact
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {rec.effort} Effort
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default HealthInsights 