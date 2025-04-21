import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'
import SearchBar from '../components/search/SearchBar'
import MealCard from '../components/meals/MealCard'
import CategoryCard from '../components/categories/CategoryCard'
import MealDetail from '../components/meals/MealDetail'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { searchMealsByName, getMealCategories, getMealsByCategory } from '../api/mealDbApi'

function Home() {
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [meals, setMeals] = useState([])
  const [loadingMeals, setLoadingMeals] = useState(false)
  const [selectedMealId, setSelectedMealId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const data = await getMealCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }
    
    fetchCategories()
  }, [])
  
  const handleSearch = async (query) => {
    setSearchQuery(query)
    setSelectedCategory(null)
    setLoadingMeals(true)
    
    try {
      const results = await searchMealsByName(query)
      setMeals(results)
    } catch (error) {
      console.error('Error searching meals:', error)
    } finally {
      setLoadingMeals(false)
    }
  }
  
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category)
    setSearchQuery('')
    setLoadingMeals(true)
    
    try {
      const results = await getMealsByCategory(category)
      setMeals(results)
    } catch (error) {
      console.error('Error fetching meals by category:', error)
    } finally {
      setLoadingMeals(false)
    }
  }
  
  const handleReset = () => {
    setMeals([])
    setSearchQuery('')
    setSelectedCategory(null)
  }
  
  const handleMealSelect = (meal) => {
    setSelectedMealId(meal.idMeal)
  }
  
  const renderContent = () => {
    if (searchQuery || selectedCategory) {
      return (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Recipes`}
            </h2>
            <button
              onClick={handleReset}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              Go Back
            </button>
          </div>
          
          {loadingMeals ? (
            <LoadingSpinner />
          ) : meals.length > 0 ? (
            <div className="masonry-grid">
              {meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  onClick={handleMealSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No recipes found. Try a different search term.</p>
            </div>
          )}
        </div>
      )
    }
    
    return (
      <>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          
          {loadingCategories ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.idCategory}
                  category={category}
                  onClick={handleCategorySelect}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
          
          <div className="flex flex-wrap gap-2">
            {['Chicken', 'Pasta', 'Vegetarian', 'Dessert', 'Breakfast'].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-4 py-2 bg-dark-600 hover:bg-dark-500 rounded-full text-sm transition-colors shadow-glow-sm hover:shadow-glow"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </>
    )
  }
  
  return (
    <div>
      <div className="relative h-[60vh] mb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-800/50 to-dark-700/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2077&q=80"
          alt="Dark kitchen with modern appliances"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative container-custom h-full flex flex-col justify-center items-center text-center z-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Welcome to <span className="text-primary-400 animate-glow">MyMealMate</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-200 mb-8 max-w-2xl"
          >
            Your personal assistant for discovering recipes, planning meals, and organizing your culinary journey.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-xl"
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </div>
      
      <div className="container-custom pb-12">
        {renderContent()}
      </div>
      
      <MealDetail
        mealId={selectedMealId}
        isOpen={!!selectedMealId}
        onClose={() => setSelectedMealId(null)}
      />
    </div>
  )
}

export default Home