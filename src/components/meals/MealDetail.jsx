import { useEffect, useState } from 'react'
import { FiX, FiHeart, FiClock, FiGlobe, FiPlus } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { getMealById, formatMealIngredients } from '../../api/mealDbApi'
import { useFavorites } from '../../contexts/FavoritesContext'
import LoadingSpinner from '../ui/LoadingSpinner'

function MealDetail({ mealId, isOpen, onClose, showPlannerButton = false, onAddToPlan }) {
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ingredients, setIngredients] = useState([])
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  
  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!mealId) return
      
      setLoading(true)
      
      try {
        const mealData = await getMealById(mealId)
        setMeal(mealData)
        
        if (mealData) {
          const formattedIngredients = formatMealIngredients(mealData)
          setIngredients(formattedIngredients)
        }
      } catch (error) {
        console.error('Error fetching meal details:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMealDetails()
  }, [mealId])
  
  const handleFavoriteClick = () => {
    if (!meal) return
    
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal)
    } else {
      addFavorite(meal)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-dark-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : meal ? (
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-dark-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-dark-900 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
                
                {/* Hero image with gradient overlay */}
                <div className="relative h-72 sm:h-80 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-700 to-transparent"></div>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md mb-2">
                      {meal.strMeal}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-primary-600 bg-opacity-80 rounded-full text-white text-sm font-medium">
                        {meal.strCategory}
                      </span>
                      {meal.strArea && (
                        <span className="flex items-center gap-1 text-gray-300 text-sm">
                          <FiGlobe className="w-4 h-4" />
                          {meal.strArea}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button
                      onClick={handleFavoriteClick}
                      className={`btn ${
                        isFavorite(meal.idMeal) ? 'btn-accent' : 'btn-outline'
                      } flex items-center gap-2`}
                    >
                      <FiHeart className={isFavorite(meal.idMeal) ? 'fill-current' : ''} />
                      {isFavorite(meal.idMeal) ? 'Saved to Favorites' : 'Add to Favorites'}
                    </button>
                    
                    {showPlannerButton && (
                      <button
                        onClick={() => onAddToPlan(meal)}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <FiPlus />
                        Add to Meal Plan
                      </button>
                    )}
                  </div>
                  
                  {/* Ingredients */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-accent-500 rounded-full"></span>
                      Ingredients
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                          <span className="text-gray-300 font-medium">{ingredient.name}</span>
                          <span className="text-gray-400">{ingredient.measure}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Instructions */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-primary-500 rounded-full"></span>
                      Instructions
                    </h3>
                    
                    <div className="space-y-4 text-gray-300">
                      {meal.strInstructions.split('\r\n\r\n')
                        .filter(step => step.trim() !== '')
                        .map((step, index) => (
                          <p key={index}>{step}</p>
                        ))}
                    </div>
                    
                    {meal.strYoutube && (
                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-2">Video Tutorial</h4>
                        <a 
                          href={meal.strYoutube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  Recipe Not Found
                </h3>
                <p className="text-gray-400">
                  Sorry, we couldn't find details for this recipe.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-4 btn btn-primary"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MealDetail