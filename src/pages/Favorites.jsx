import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SearchBar from '../components/search/SearchBar'
import MealCard from '../components/meals/MealCard'
import MealDetail from '../components/meals/MealDetail'
import EmptyState from '../components/ui/EmptyState'
import { useFavorites } from '../contexts/FavoritesContext'
import { useAuth } from '../contexts/AuthContext'

function Favorites() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMealId, setSelectedMealId] = useState(null)
  const { favorites } = useFavorites()
  const { currentUser, openLoginModal } = useAuth()
  const navigate = useNavigate()
  
  // Filter favorites by search query
  const filteredFavorites = searchQuery
    ? favorites.filter(meal => 
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (meal.strCategory && meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : favorites
  
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  // Open meal detail
  const handleMealSelect = (meal) => {
    setSelectedMealId(meal.idMeal)
  }
  
  // Navigate to home page
  const handleExploreMore = () => {
    navigate('/')
  }
  
  // Render content based on auth state and favorites
  const renderContent = () => {
    if (!currentUser) {
      return (
        <EmptyState
          title="Sign in to view your favorites"
          message="Create an account to save and organize your favorite recipes"
          icon={FiHeart}
          action={{
            label: "Sign In",
            onClick: openLoginModal
          }}
        />
      )
    }
    
    if (favorites.length === 0) {
      return (
        <EmptyState
          title="No favorites yet"
          message="Explore recipes and add them to your favorites"
          icon={FiHeart}
          action={{
            label: "Explore Recipes",
            onClick: handleExploreMore
          }}
        />
      )
    }
    
    return (
      <>
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search your favorites..."
          />
        </div>
        
        {filteredFavorites.length > 0 ? (
          <div className="masonry-grid">
            {filteredFavorites.map(meal => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onClick={handleMealSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">
              No matching favorites found. Try a different search term.
            </p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <button
            onClick={handleExploreMore}
            className="btn btn-primary"
          >
            Explore More Recipes
          </button>
        </div>
      </>
    )
  }
  
  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-gray-400">
            All your favorite recipes in one place
          </p>
        </div>
        
        {renderContent()}
      </motion.div>
      
      <MealDetail
        mealId={selectedMealId}
        isOpen={!!selectedMealId}
        onClose={() => setSelectedMealId(null)}
      />
    </div>
  )
}

export default Favorites