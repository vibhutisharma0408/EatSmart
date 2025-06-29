import React, { useState } from 'react'
import { Calendar, Clock, Video, MessageCircle, Stethoscope, Heart, Activity, Users, Star, CheckCircle, Phone, Mail } from 'lucide-react'

const DoctorConsultation = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [consultationType, setConsultationType] = useState('video')

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Nutritionist & Dietitian',
      rating: 4.9,
      patients: 1200,
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      available: ['09:00', '10:00', '14:00', '15:00'],
      price: 75
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Endocrinologist',
      rating: 4.8,
      patients: 950,
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      available: ['11:00', '13:00', '16:00', '17:00'],
      price: 120
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Cardiologist',
      rating: 4.9,
      patients: 800,
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
      available: ['08:00', '12:00', '15:00', '18:00'],
      price: 150
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Gastroenterologist',
      rating: 4.7,
      patients: 1100,
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      available: ['10:00', '14:00', '16:00', '19:00'],
      price: 130
    }
  ]

  const consultationTypes = [
    { id: 'video', name: 'Video Consultation', icon: Video, description: 'Face-to-face video call with your doctor' },
    { id: 'audio', name: 'Audio Call', icon: Phone, description: 'Voice-only consultation' },
    { id: 'chat', name: 'Chat Consultation', icon: MessageCircle, description: 'Text-based consultation' }
  ]

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      alert(`Booking confirmed with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`)
    } else {
      alert('Please select a doctor, date, and time')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Doctor Consultations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with licensed healthcare professionals for personalized medical advice, nutrition guidance, and health assessments.
          </p>
        </div>

        {/* Consultation Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Consultation Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {consultationTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setConsultationType(type.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  consultationType === type.id
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    consultationType === type.id ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <type.icon className={`w-6 h-6 ${
                      consultationType === type.id ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Doctors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Doctors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-red-300'
                }`}
              >
                <div className="text-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">({doctor.patients} patients)</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {doctor.experience} experience
                  </div>
                  
                  <div className="text-lg font-bold text-red-600 mb-3">
                    ${doctor.price}/consultation
                  </div>
                  
                  {selectedDoctor?.id === doctor.id && (
                    <div className="flex items-center justify-center text-green-600 mb-3">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        {selectedDoctor && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Book Consultation with {selectedDoctor.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Date
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20'].map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate === date
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                      }`}
                    >
                      <div className="text-sm font-medium">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDoctor.available.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedTime === time
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Doctor:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Specialty:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {consultationTypes.find(t => t.id === consultationType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-red-600">${selectedDoctor.price}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleBooking}
                  className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-2xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Consultation
                </button>
              </div>
            )}
          </div>
        )}

        {/* Health Assessment */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Health Assessment</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Take our comprehensive health assessment to get personalized recommendations and better understand your health needs.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Health Assessment
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Video Calls</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HIPAA-compliant video consultations with crystal clear audio and video quality.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Health Monitoring</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track vital signs and health metrics with integrated monitoring tools.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Network</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access to a network of licensed healthcare professionals and specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorConsultation 