import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiCalendar, FiTrash2 } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlanner } from '../../contexts/PlannerContext'
import MealDetail from '../meals/MealDetail'

function PlanCard({ plan }) {
  const [expanded, setExpanded] = useState(false)
  const [selectedMealId, setSelectedMealId] = useState(null)
  const { deletePlan, MEAL_TYPES } = usePlanner()
  
  const toggleExpanded = () => setExpanded(!expanded)
  
  const handleMealClick = (mealId) => {
    setSelectedMealId(mealId)
  }
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this meal plan?')) {
      deletePlan(plan.id)
    }
  }
  
  // Format date string
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  // Get all meal types including custom ones
  const getAllMealTypes = () => {
    const defaultTypes = Object.values(MEAL_TYPES)
    const customTypes = plan.customMealTypes ? Object.entries(plan.customMealTypes).map(([id, name]) => id) : []
    return [...defaultTypes, ...customTypes]
  }
  
  // Get display name for meal type
  const getMealTypeName = (type) => {
    if (MEAL_TYPES[type]) {
      return MEAL_TYPES[type].charAt(0).toUpperCase() + MEAL_TYPES[type].slice(1)
    }
    return plan.customMealTypes?.[type] || type
  }
  
  // Get CSS class for meal type
  const getMealTypeClass = (type) => {
    const typeClasses = {
      [MEAL_TYPES.BREAKFAST]: 'meal-type-breakfast',
      [MEAL_TYPES.LUNCH]: 'meal-type-lunch',
      [MEAL_TYPES.DINNER]: 'meal-type-dinner',
      [MEAL_TYPES.SNACKS]: 'meal-type-snacks'
    }
    
    return typeClasses[type] || 'meal-type-other'
  }
  
  // Check if the meal type has any meals
  const hasMeals = (type) => {
    return plan.meals[type] && plan.meals[type].length > 0
  }
  
  // Filter meal types that have meals
  const mealTypesWithMeals = getAllMealTypes().filter(type => hasMeals(type))
  
  return (
    <>
      <motion.div
        layout
        className="bg-dark-600 rounded-xl overflow-hidden shadow-lg"
      >
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-dark-500 transition-colors" 
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-3">
            <FiCalendar className="text-primary-400" />
            <h3 className="font-medium">{formatDate(plan.date)}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
            
            {expanded ? (
              <FiChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 border-t border-dark-500">
                {mealTypesWithMeals.length > 0 ? (
                  <div className="space-y-4">
                    {mealTypesWithMeals.map(type => (
                      <div key={type} className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-300">
                          {getMealTypeName(type)}
                        </h4>
                        
                        <div className="space-y-2">
                          {plan.meals[type].map(meal => (
                            <div
                              key={meal.idMeal}
                              className={`relative pl-3 pr-3 py-2 bg-dark-500 rounded-md cursor-pointer hover:bg-dark-400 transition-colors ${getMealTypeClass(type)}`}
                              onClick={() => handleMealClick(meal.idMeal)}
                            >
                              <div className="flex items-center">
                                <img
                                  src={meal.strMealThumb}
                                  alt={meal.strMeal}
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <span className="font-medium text-gray-200">
                                  {meal.strMeal}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-2">
                    No meals added to this plan yet.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <MealDetail
        mealId={selectedMealId}
        isOpen={!!selectedMealId}
        onClose={() => setSelectedMealId(null)}
      />
    </>
  )
}

export default PlanCard