import { useState } from 'react'
import { FiCalendar, FiPlus, FiCheck, FiX } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { usePlanner, MEAL_TYPES } from '../../contexts/PlannerContext'
import SearchBar from '../search/SearchBar'
import { searchMealsByName } from '../../api/mealDbApi'
import MealCard from '../meals/MealCard'
import MealDetail from '../meals/MealDetail'

function PlannerForm({ onComplete }) {
  const [date, setDate] = useState(new Date())
  const [step, setStep] = useState(0)
  const [activeMealType, setActiveMealType] = useState(null)
  const [customMealName, setCustomMealName] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMealId, setSelectedMealId] = useState(null)
  const [completedMealTypes, setCompletedMealTypes] = useState({})
  
  const { startPlan, currentPlan, addCustomMealType, addMealToPlan, savePlan, MEAL_TYPES } = usePlanner()
  
  // Move to meal selection step
  const handleStartPlanning = () => {
    const newPlan = startPlan(date.toISOString())
    setStep(1)
  }
  
  // Handle meal type selection
  const handleMealTypeSelect = (type) => {
    setActiveMealType(type)
    setStep(2)
    setSearchResults([])
  }
  
  // Handle custom meal type creation
  const handleCustomMealType = () => {
    if (!customMealName.trim()) return
    
    const newTypeId = addCustomMealType(currentPlan.id, customMealName)
    setActiveMealType(newTypeId)
    setCustomMealName('')
    setStep(2)
  }
  
  // Search for meals
  const handleSearch = async (query) => {
    const results = await searchMealsByName(query)
    setSearchResults(results)
  }
  
  // Handle meal selection
  const handleMealSelect = (meal) => {
    setSelectedMealId(meal.idMeal)
  }
  
  // Add meal to plan
  const handleAddMealToPlan = (meal) => {
    addMealToPlan(currentPlan.id, activeMealType, meal)
    setCompletedMealTypes(prev => ({
      ...prev,
      [activeMealType]: true
    }))
    setSelectedMealId(null)
    setStep(1)
  }
  
  // Complete plan creation
  const handleCreatePlan = () => {
    savePlan()
    onComplete()
  }
  
  // Go back to previous step
  const handleBack = () => {
    if (step === 2) {
      setActiveMealType(null)
      setStep(1)
    } else if (step === 1) {
      setStep(0)
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 0: Date Selection */}
      {step === 0 && (
        <div className="bg-dark-600 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Meal Plan</h2>
          
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Date for Your Meal Plan
            </label>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-500" />
              </div>
              
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                className="input-field pl-10 w-full"
              />
            </div>
            
            <button
              onClick={handleStartPlanning}
              className="btn btn-primary w-full py-3"
            >
              Start Planning
            </button>
          </div>
        </div>
      )}
      
      {/* Step 1: Meal Type Selection */}
      {step === 1 && (
        <div className="bg-dark-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="text-gray-400 hover:text-white">
              <FiX className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">Select Meal Type</h2>
            <div className="w-5"></div> {/* For alignment */}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {Object.values(MEAL_TYPES).map((type) => (
              <button
                key={type}
                onClick={() => handleMealTypeSelect(type)}
                className={`flex items-center justify-between p-4 rounded-lg border 
                          ${completedMealTypes[type] 
                            ? 'border-green-500 bg-green-900 bg-opacity-20' 
                            : 'border-dark-400 bg-dark-500 hover:bg-dark-400'} 
                          transition-colors`}
              >
                <span className="capitalize font-medium">{type}</span>
                {completedMealTypes[type] && <FiCheck className="text-green-500" />}
              </button>
            ))}
            
            {/* Custom meal type */}
            <div className="sm:col-span-2 p-4 rounded-lg border border-dark-400 bg-dark-500">
              <div className="flex items-center">
                <input
                  type="text"
                  value={customMealName}
                  onChange={(e) => setCustomMealName(e.target.value)}
                  placeholder="Add custom meal type..."
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-white"
                />
                <button
                  onClick={handleCustomMealType}
                  disabled={!customMealName.trim()}
                  className={`ml-2 p-2 rounded-full 
                           ${customMealName.trim() 
                             ? 'bg-primary-600 hover:bg-primary-700' 
                             : 'bg-dark-400 cursor-not-allowed'} 
                           text-white transition-colors`}
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Show custom meal types from the current plan */}
          {currentPlan?.customMealTypes && Object.entries(currentPlan.customMealTypes).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Custom Meal Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(currentPlan.customMealTypes).map(([id, name]) => (
                  <button
                    key={id}
                    onClick={() => handleMealTypeSelect(id)}
                    className={`flex items-center justify-between p-4 rounded-lg border 
                              ${completedMealTypes[id] 
                                ? 'border-green-500 bg-green-900 bg-opacity-20' 
                                : 'border-dark-400 bg-dark-500 hover:bg-dark-400'} 
                              transition-colors`}
                  >
                    <span className="font-medium">{name}</span>
                    {completedMealTypes[id] && <FiCheck className="text-green-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleCreatePlan}
              className="btn btn-accent"
            >
              Create Plan
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Meal Search and Selection */}
      {step === 2 && (
        <div className="bg-dark-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="text-gray-400 hover:text-white">
              <FiX className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">
              Add Meals to{' '}
              <span className="capitalize">
                {MEAL_TYPES[activeMealType] || currentPlan?.customMealTypes?.[activeMealType] || activeMealType}
              </span>
            </h2>
            <div className="w-5"></div> {/* For alignment */}
          </div>
          
          <SearchBar onSearch={handleSearch} placeholder="Search for meals to add..." />
          
          {searchResults.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map(meal => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  onClick={handleMealSelect}
                  showFavoriteButton={false}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Search for meals to add to your plan
              </p>
            </div>
          )}
          
          <MealDetail
            mealId={selectedMealId}
            isOpen={!!selectedMealId}
            onClose={() => setSelectedMealId(null)}
            showPlannerButton={true}
            onAddToPlan={handleAddMealToPlan}
          />
        </div>
      )}
    </div>
  )
}

export default PlannerForm