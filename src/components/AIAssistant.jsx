import React, { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  Lightbulb,
  Target,
  Apple,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const AIAssistant = ({ user, nutritionData }) => {
  // Add null checks and default values for user properties
  const userName = user?.name || 'User'
  const userGoals = user?.goals || 'maintain weight'
  const userDietaryRestrictions = user?.dietaryRestrictions || ['none']

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi ${userName}! I'm your AI nutrition assistant. I can help you with meal planning, nutrition advice, and health tips. What would you like to know today?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQuestions = [
    "What should I eat for breakfast?",
    "How can I increase my protein intake?",
    "What's a good post-workout meal?",
    "How many calories should I eat?",
    "Give me meal prep ideas"
  ]

  const aiResponses = {
    "what should i eat for breakfast": {
      content: `Based on your goals and current nutrition data, here are some great breakfast options:

🌅 **High-Protein Options:**
• Greek yogurt with berries and nuts (320 cal, 18g protein)
• Scrambled eggs with avocado toast (380 cal, 16g protein)
• Protein smoothie with banana and almond butter (280 cal, 20g protein)

Since you're aiming for weight loss and muscle gain, I recommend the Greek yogurt option - it's high in protein, moderate in calories, and will keep you full until lunch!`,
      suggestions: ["Log this meal", "Show me lunch ideas", "Calculate macros"]
    },
    "how can i increase my protein intake": {
      content: `Great question! Here are effective ways to boost your protein intake:

🥩 **High-Protein Foods:**
• Chicken breast (31g protein per 100g)
• Greek yogurt (23g protein per cup)
• Salmon (25g protein per 100g)
• Eggs (6g protein per egg)
• Tuna (30g protein per 100g)

📊 **Your Current Status:**
You're currently at ${nutritionData.protein}g protein today. Your goal is 150g, so you need ${150 - nutritionData.protein}g more.

💡 **Quick Tips:**
• Add protein powder to smoothies
• Snack on Greek yogurt or cottage cheese
• Include lean meat in every meal
• Try protein-rich snacks like almonds or edamame`,
      suggestions: ["Show me protein-rich recipes", "Calculate my needs", "Log protein foods"]
    },
    "what's a good post-workout meal": {
      content: `Perfect timing! Here's what you should eat after your workout:

⏰ **Timing:** Eat within 30-60 minutes after exercise

🍽️ **Ideal Post-Workout Meals:**
• Grilled chicken with sweet potato (450 cal, 35g protein)
• Protein shake with banana (280 cal, 25g protein)
• Greek yogurt with granola and berries (320 cal, 20g protein)
• Tuna sandwich on whole grain bread (380 cal, 28g protein)

🎯 **Macro Breakdown:**
• Protein: 20-30g (for muscle repair)
• Carbs: 30-60g (to replenish glycogen)
• Fat: 10-15g (for satiety)

Since you're currently at ${nutritionData.calories} calories today, any of these options would fit well into your daily plan!`,
      suggestions: ["Log post-workout meal", "Show me pre-workout options", "Calculate timing"]
    },
    "how many calories should i eat": {
      content: `Based on your profile and goals, here's your personalized calorie breakdown:

📊 **Your Daily Targets:**
• **Total Calories:** 2,000 calories
• **Protein:** 150g (600 calories)
• **Carbs:** 200g (800 calories)
• **Fat:** 65g (585 calories)

🎯 **Goal-Specific Breakdown:**
Since you're aiming for weight loss and muscle gain:
• **Weight Loss:** Create a 300-500 calorie deficit
• **Muscle Gain:** Ensure adequate protein (1.6-2.2g per kg body weight)

💡 **Current Status:**
You've consumed ${nutritionData.calories} calories today (${Math.round((nutritionData.calories / 2000) * 100)}% of your goal)

**Recommendation:** You have ${2000 - nutritionData.calories} calories remaining. Focus on protein-rich foods to support your muscle-building goals!`,
      suggestions: ["Show me meal suggestions", "Calculate my BMR", "Track my progress"]
    },
    "give me meal prep ideas": {
      content: `Excellent! Here are some meal prep ideas perfect for your goals:

🍳 **Sunday Meal Prep Plan:**

**Breakfast Prep:**
• Overnight oats with protein powder (5 servings)
• Egg muffins with vegetables (6 servings)
• Greek yogurt parfaits (5 servings)

**Lunch Prep:**
• Grilled chicken with quinoa and roasted vegetables (5 servings)
• Turkey and avocado wraps (5 servings)
• Lentil soup with whole grain bread (5 servings)

**Dinner Prep:**
• Baked salmon with sweet potato and broccoli (5 servings)
• Lean beef stir-fry with brown rice (5 servings)
• Vegetarian chili with beans (5 servings)

**Snacks:**
• Protein balls (10 servings)
• Hummus with carrot sticks (5 servings)
• Hard-boiled eggs (10 servings)

⏰ **Prep Time:** 2-3 hours on Sunday
💰 **Cost:** ~$80-100 for the week
📦 **Storage:** Refrigerate for 5 days, freeze extras

This plan ensures you hit your protein goals while staying within your calorie budget!`,
      suggestions: ["Show me recipes", "Calculate shopping list", "Set reminders"]
    }
  }

  const sendMessage = async (message) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()
      let aiResponse = null

      // Check for exact matches first
      for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
          aiResponse = response
          break
        }
      }

      // If no exact match, provide a general response
      if (!aiResponse) {
        aiResponse = {
          content: `I understand you're asking about "${message}". Let me help you with that!

Based on your current nutrition data (${nutritionData.calories} calories, ${nutritionData.protein}g protein today), here are some personalized suggestions:

💡 **General Tips:**
• Focus on whole, unprocessed foods
• Include protein with every meal
• Stay hydrated (aim for 8-10 glasses of water)
• Plan your meals ahead of time

Would you like me to help you with meal planning, nutrition calculations, or specific food recommendations?`,
          suggestions: ["Meal planning", "Nutrition advice", "Food suggestions"]
        }
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        suggestions: aiResponse.suggestions,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question) => {
    sendMessage(question)
  }

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Nutrition Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300">Get personalized nutrition advice and meal suggestions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">AI Online</span>
        </div>
      </div>

      {/* AI Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="health-gradient rounded-2xl p-6 text-white"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Your AI Nutrition Coach</h3>
            <p className="text-white text-opacity-90 mb-4">
              I analyze your nutrition data, goals, and preferences to provide personalized advice. 
              Ask me anything about nutrition, meal planning, or health!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Current Calories</p>
                <p className="text-white text-opacity-80">{nutritionData.calories}/2000</p>
              </div>
              <div>
                <p className="font-medium">Protein Intake</p>
                <p className="text-white text-opacity-80">{nutritionData.protein}/150g</p>
              </div>
              <div>
                <p className="font-medium">Water Intake</p>
                <p className="text-white text-opacity-80">{nutritionData.water}/8L</p>
              </div>
              <div>
                <p className="font-medium">Goals</p>
                <p className="text-white text-opacity-80">{Array.isArray(userGoals) ? userGoals.join(', ') : userGoals}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200"
            >
              <p className="text-sm text-gray-700 dark:text-gray-200">{question}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <div className="card h-96 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chat with AI</h3>
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-primary-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Nutrition AI</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestion(suggestion)}
                            className={`block w-full text-left p-2 rounded text-xs transition-colors duration-200 ${
                              message.type === 'user'
                                ? 'bg-white bg-opacity-20 hover:bg-opacity-30'
                                : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                            }`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-white text-opacity-70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
            placeholder="Ask me about nutrition, meal planning, or health tips..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card text-center"
        >
          <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Suggestions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized meal and nutrition recommendations based on your goals and preferences.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card text-center"
        >
          <Target className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Goal Tracking</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your progress and get insights on how to reach your nutrition and health goals.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card text-center"
        >
          <Apple className="w-8 h-8 text-health-green mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Meal Planning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Create personalized meal plans that fit your lifestyle and dietary requirements.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default AIAssistant 