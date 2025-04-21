import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useFavorites } from '../../contexts/FavoritesContext'

function MealCard({ meal, onClick, showFavoriteButton = true }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const isFav = isFavorite(meal.idMeal)
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    
    if (isFav) {
      removeFavorite(meal.idMeal)
    } else {
      addFavorite(meal)
    }
  }
  
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card group cursor-pointer h-full"
      onClick={() => onClick(meal)}
    >
      <div className="relative overflow-hidden rounded-t-xl aspect-square">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full 
                      ${isFav ? 'bg-accent-500 text-white' : 'bg-dark-800 bg-opacity-70 text-white'} 
                      transition-colors duration-200 hover:bg-accent-600`}
          >
            <FiHeart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium line-clamp-2 group-hover:text-primary-400 transition-colors">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {meal.strCategory || 'Uncategorized'}
        </p>
      </div>
    </motion.div>
  )
}

export default MealCard