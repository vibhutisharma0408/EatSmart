import React, { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, MessageCircle, Sparkles } from 'lucide-react'

const FloatingAIChat = ({ user, nutritionData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: `Hi ${user?.name || 'there'}! 👋 I'm your AI nutrition assistant. I can help you with:\n\n• Meal planning suggestions\n• Nutrition advice\n• Calorie tracking tips\n• Healthy recipe ideas\n• Dietary recommendations\n\nWhat would you like to know today?`,
          timestamp: new Date()
        }
      ])
    }
  }, [isOpen, user?.name])

  const quickSuggestions = [
    "Suggest a healthy breakfast",
    "How many calories should I eat?",
    "Give me a meal plan for today",
    "What's a good post-workout snack?",
    "Help me track my water intake"
  ]

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay for realistic feel
  }

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('breakfast') || lowerMessage.includes('morning')) {
      return `Here's a healthy breakfast suggestion for you:\n\n🥣 **Oatmeal Power Bowl**\n• 1/2 cup rolled oats\n• 1/2 cup almond milk\n• 1 tbsp chia seeds\n• 1/4 cup mixed berries\n• 1 tbsp honey\n\n**Nutrition:** ~250 calories, 8g protein, 45g carbs, 6g fat\n\nThis will give you sustained energy throughout the morning! 💪`
    }
    
    if (lowerMessage.includes('calorie') || lowerMessage.includes('calories')) {
      const bmr = 10 * (user?.weight || 70) + 6.25 * (user?.height || 175) - 5 * (user?.age || 25) + 5
      const dailyCalories = Math.round(bmr * 1.2)
      return `Based on your profile, here's your calorie guidance:\n\n📊 **Daily Calorie Target:** ${dailyCalories} calories\n\n**Breakdown:**\n• Breakfast: ${Math.round(dailyCalories * 0.25)} calories\n• Lunch: ${Math.round(dailyCalories * 0.3)} calories\n• Dinner: ${Math.round(dailyCalories * 0.35)} calories\n• Snacks: ${Math.round(dailyCalories * 0.1)} calories\n\nRemember: This is a starting point - adjust based on your activity level and goals! 🎯`
    }
    
    if (lowerMessage.includes('meal plan') || lowerMessage.includes('plan')) {
      return `Here's a balanced meal plan for today:\n\n🌅 **Breakfast (8:00 AM)**\nGreek yogurt with granola and berries\n\n🌞 **Lunch (12:30 PM)**\nGrilled chicken salad with mixed greens\n\n🌆 **Dinner (7:00 PM)**\nSalmon with quinoa and roasted vegetables\n\n🍎 **Snacks**\n• Apple with almond butter\n• Carrot sticks with hummus\n\nWould you like me to add these to your meal planner? 📅`
    }
    
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return `Great question! Here are some excellent post-workout snack options:\n\n💪 **High Protein Options:**\n• Greek yogurt with banana\n• Protein shake with berries\n• Tuna on whole grain toast\n\n🍌 **Quick & Easy:**\n• Banana with peanut butter\n• Cottage cheese with fruit\n• Hard-boiled eggs\n\n**Timing:** Eat within 30 minutes of your workout for best results! ⏰`
    }
    
    if (lowerMessage.includes('water') || lowerMessage.includes('hydration')) {
      const waterGoal = 2 // liters
      const currentWater = nutritionData?.water || 0
      const remaining = waterGoal - currentWater
      
      return `Let's talk hydration! 💧\n\n**Your Daily Goal:** ${waterGoal}L (8 glasses)\n**Currently Consumed:** ${currentWater}L\n**Remaining:** ${remaining}L\n\n**Tips to stay hydrated:**\n• Start your day with a glass of water\n• Keep a water bottle with you\n• Set reminders on your phone\n• Add lemon or cucumber for flavor\n\nYou're doing great! Keep it up! 🌊`
    }
    
    // Default response
    return `Thanks for your question! I'm here to help with your nutrition journey. 🤖\n\nI can assist with:\n• Personalized meal suggestions\n• Nutrition calculations\n• Health tips and advice\n• Recipe recommendations\n\nFeel free to ask me anything about nutrition, meal planning, or healthy eating habits! 💚`
  }

  const handleQuickSuggestion = (suggestion) => {
    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full h-full sm:h-96 sm:max-w-md flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">AI Nutrition Assistant</h3>
                  <p className="text-xs text-primary-100">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-100 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs sm:text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-3 sm:px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="text-xs bg-primary-50 text-primary-700 px-2 sm:px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about nutrition..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingAIChat 